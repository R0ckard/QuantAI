// npm run draft <id> [--yes] [--split CHASE=20,DOCS=40,...] [--force] [--no-ai]
// Prints the numbers, lets Dave adjust the family split, drafts the prose,
// checks it, and writes tools/out/<id>.json and tools/out/<id>.html.
import fs from 'node:fs';
import readline from 'node:readline/promises';
import Anthropic from '@anthropic-ai/sdk';
import { ENV, need } from './lib/env.js';
import { loadRecord, resolveId, outJson, outHtml, TEMPLATE } from './lib/paths.js';
import { score, publicEstimate, FAMILIES, splitTotalsToOne, formatAUD } from '../check/model.js';
import { MODELS } from '../worker/src/ai.js';
import { numbersFor, crossCheckLine, tierFor, fillTemplate, loadTemplate, lint, fixDashes, longDate, oneLineFinding, deliveryEmail, firstNameOf, AI_KEYS } from './lib/report.js';
import { DRAFT_SYSTEM, buildDraftMessages, parseDraft } from './lib/draft-prompt.js';

const args = process.argv.slice(2);
const flag = f => args.includes(f);
const opt = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const id = resolveId(args.find(a => !a.startsWith('--') && a !== opt('--split')));
const record = loadRecord(id);
const a = record.answers;
const pct = n => `${Math.round(n * 100)}%`;

console.log(`\n${a['1.2']} · ${a['1.1']}, ${a['1.3']} · received ${record.receivedAt.slice(0, 10)}`);
const q = record.qualification;
console.log(`Qualification ${q.total}/25 · ${q.tier} · ${q.routing}`);
if (q.override) console.log(`OVERRIDE: ${q.overrideLine}`);

// ---------- the numbers, recomputed from the answers ----------
let scored = score(a);
const instant = publicEstimate(record.scored);
const now = publicEstimate(scored);
if (instant.recoverableLow !== now.recoverableLow || instant.recoverableHigh !== now.recoverableHigh) {
  console.error(`\nSTOP. The range on their screen was ${formatAUD(instant.recoverableLow)} to ${formatAUD(instant.recoverableHigh)} but the model now gives ${formatAUD(now.recoverableLow)} to ${formatAUD(now.recoverableHigh)}. The model changed since they submitted. Do not send this without checking.`);
  process.exit(1);
}
console.log(`\nRepeat work a year   ${formatAUD(scored.total)}   (${scored.inputs.adminHours} h/wk x ${formatAUD(scored.inputs.hourlyCost)} x 46)`);
console.log(`Recoverable          ${formatAUD(scored.recoverableLow)} to ${formatAUD(scored.recoverableHigh)}   (${scored.hoursLow} to ${scored.hoursHigh} hours)`);
console.log(`Duplicated           ${formatAUD(scored.duplicatedRounded)}`);
console.log(`Inputs agree         ${scored.inputsAgree ? 'yes' : 'NO, document maths exceeds section 2, report says so'}`);
if (scored.billedUpperBound) console.log(`Billed upper bound   ${formatAUD(scored.billedUpperBound)}   (context only, never in the report)`);

// ---------- the family split ----------
function showSplit(s) {
  console.log('\nFamily split (share of hours -> cost -> score):');
  for (const f of s.families) console.log(`  ${f.key.padEnd(7)} ${pct(f.share).padStart(4)}  ${formatAUD(f.cost).padStart(9)}  ${Math.round(f.score).toString().padStart(6)}  ${f.label}${f.key === s.gap.key ? '   <- named in the report' : ''}`);
  console.log(`  Ticked on 2.1: ${(a['2.1'] || []).join(', ')}   On 3.1: ${(a['3.1'] || []).join(', ')}`);
}
showSplit(scored);

function parseSplit(text) {
  const split = Object.fromEntries(FAMILIES.map(f => [f.key, 0]));
  for (const part of text.split(/[,\s]+/).filter(Boolean)) {
    const m = part.match(/^([A-Z]+)=(\d+(?:\.\d+)?)%?$/i);
    if (!m || !(m[1].toUpperCase() in split)) throw new Error(`Can't read "${part}". Use KEY=percent, keys are ${FAMILIES.map(f => f.key).join(' ')}.`);
    split[m[1].toUpperCase()] = Number(m[2]) / 100;
  }
  if (!splitTotalsToOne(split)) throw new Error(`That totals ${Math.round(Object.values(split).reduce((x, y) => x + y, 0) * 100)}%, it has to be 100%.`);
  return split;
}

let split = null;
if (opt('--split')) split = parseSplit(opt('--split'));
else if (!flag('--yes')) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  while (true) {
    const ans = (await rl.question('\nKeep this split? Enter to keep, or type a new one like CHASE=20 DOCS=40 REKEY=40: ')).trim();
    if (!ans) break;
    try { split = parseSplit(ans); scored = score(a, split); showSplit(scored); } catch (e) { console.log(e.message); }
  }
  rl.close();
}
if (split) scored = score(a, split);
if (scored.gap.key !== instant.gapKey) {
  console.log(`\nWARNING: their screen said "${instant.gapLabel}" was heaviest. The report will now say "${scored.gap.label}". The range is unchanged. Make sure that's what you want.`);
}

// ---------- tier ----------
const tier = tierFor(record);
if (tier.emailKind === 'short' && !flag('--force')) {
  const em = deliveryEmail('short', { firm: a['1.2'], first: firstNameOf(a['1.1']), finding: oneLineFinding(scored), calendly: ENV.CALENDLY_URL });
  console.log(`\nQualify says: do not spend an hour on this one. No report. Send the short email instead:\n\n  npm run send ${id.slice(0, 8)} -- --short --reviewed\n\nIt will read:\n\n${em.text}\n\nTo draft a full report anyway, add --force.`);
  process.exit(0);
}
console.log(`\nReport tier: ${tier.tier}${tier.override ? ' with override' : ''}. Price ${tier.showPrice ? 'shown on page 3' : 'held for the call, not on the page'}. Delivery email: ${tier.emailKind}.`);

// ---------- the prose ----------
const numbers = numbersFor(scored);
let tokens, warnings = [], model = null;
if (flag('--no-ai')) {
  tokens = Object.fromEntries(AI_KEYS.map(k => [k, `[${k} goes here]`]));
  tokens.DUP_LINE = scored.duplicated > 0 ? '[DUP_LINE goes here]' : '';
} else {
  need('ANTHROPIC_API_KEY');
  model = MODELS.draft;
  const client = new Anthropic({ apiKey: ENV.ANTHROPIC_API_KEY });
  const messages = buildDraftMessages({ record, scored, numbers, tier });
  process.stdout.write(`\nDrafting with ${model} `);
  const ask = async (extra) => {
    const res = await client.beta.messages.create({
      model, max_tokens: 4000, system: DRAFT_SYSTEM,
      betas: ['server-side-fallback-2026-06-01'], fallbacks: [{ model: 'claude-opus-5' }],
      messages: extra ? [...messages, ...extra] : messages,
    });
    if (res.stop_reason === 'refusal') throw new Error('The model declined to draft this one. Write it by hand.');
    return res.content.filter(c => c.type === 'text').map(c => c.text).join('');
  };
  let raw = await ask();
  tokens = parseDraft(raw);
  for (const k of AI_KEYS) tokens[k] = fixDashes(tokens[k]);
  if (scored.duplicated === 0) tokens.DUP_LINE = '';
  warnings = lint(tokens, numbers);
  if (warnings.length) {
    process.stdout.write('redrafting ');
    raw = await ask([{ role: 'assistant', content: raw }, { role: 'user', content: `Problems with that draft, fix every one and return the full JSON again:\n- ${warnings.join('\n- ')}` }]);
    tokens = parseDraft(raw);
    for (const k of AI_KEYS) tokens[k] = fixDashes(tokens[k]);
    if (scored.duplicated === 0) tokens.DUP_LINE = '';
    warnings = lint(tokens, numbers);
  }
  console.log('done.');
}

const all = {
  FIRM: a['1.2'], NAME: a['1.1'], ROLE: a['1.3'], DATE: longDate(),
  ...numbers, CROSS_CHECK: crossCheckLine(scored), THEIR_WORDS: a['6.1'], ...tokens,
};
const html = fillTemplate(loadTemplate(TEMPLATE), all, { showPrice: tier.showPrice });
fs.writeFileSync(outHtml(id), html);
fs.writeFileSync(outJson(id), JSON.stringify({ id, firm: a['1.2'], name: a['1.1'], email: a['1.4'], draftedAt: new Date().toISOString(), model, tier, split: scored.split, splitDerived: scored.splitDerived, scored, qualification: q, tokens: all, warnings }, null, 2));

console.log('\n---- draft ----');
for (const k of AI_KEYS) if (all[k]) console.log(`\n${k}\n${all[k]}`);
if (all.CROSS_CHECK) console.log(`\nCROSS_CHECK (fixed wording)\n${all.CROSS_CHECK}`);
if (warnings.length) console.log(`\nSTILL FLAGGED, fix by hand in ${outHtml(id)}:\n- ${warnings.join('\n- ')}`);
console.log(`\nWritten: ${outJson(id)} and ${outHtml(id)}\nNext: npm run render ${id.slice(0, 8)}`);
