// Everything deterministic about the report: the numbers, the tier, the
// template fill, the checks on drafted text, and the delivery emails.
import fs from 'node:fs';
import { formatAUD } from '../../check/model.js';

export const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function longDate(d = new Date()) {
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Melbourne' });
}

// The figures the report is allowed to contain, formatted once, here.
export function numbersFor(scored) {
  return {
    LOW: formatAUD(scored.recoverableLow),
    HIGH: formatAUD(scored.recoverableHigh),
    HOURS_LOW: String(scored.hoursLow),
    HOURS_HIGH: String(scored.hoursHigh),
    HOURS_WEEK: String(Number(scored.hoursWeekUsed.toFixed(1))),
    HOURLY: formatAUD(scored.inputs.hourlyCost),
    TOTAL: formatAUD(scored.total),
    GAP_COST: formatAUD(scored.gap.costRounded),
    DUP_COST: formatAUD(scored.duplicatedRounded),
  };
}

// Said out loud, never buried (workbook Model row 18).
export function crossCheckLine(scored) {
  if (scored.inputsAgree) return '';
  return `One thing to flag. Your answers on the documents alone come to about ${Number(scored.hoursWeekUsed.toFixed(1))} hours a week, more than the ${scored.inputs.adminHours} you gave for all the repeat work, so I have used the document figure. That means the hours in section 2 are understated rather than the documents overstated, and the real number is probably higher again.`;
}

export function tierFor(record) {
  const q = record.qualification;
  const showPrice = q.tier === 'full_land' && !q.override;
  let emailKind = 'full';
  if (q.tier === 'short') emailKind = 'short';
  else if (q.points.loadSize === 0) emailKind = 'small';
  return { tier: q.tier, override: q.override, showPrice, emailKind };
}

export const TOKEN_KEYS = ['FIRM', 'NAME', 'ROLE', 'DATE', 'RECAP', 'LOW', 'HIGH', 'HOURS_LOW', 'HOURS_HIGH', 'HOURS_WEEK', 'HOURLY', 'TOTAL', 'CROSS_CHECK', 'GAP_LINE', 'DUP_LINE', 'HONESTY', 'THEIR_WORDS', 'CLOSE'];
export const AI_KEYS = ['RECAP', 'GAP_LINE', 'DUP_LINE', 'HONESTY', 'CLOSE'];

export function fillTemplate(html, tokens, { showPrice }) {
  let out = html;
  if (!showPrice) out = out.replace(/<!--PRICE-->[\s\S]*?<!--\/PRICE-->/g, '');
  for (const k of TOKEN_KEYS) {
    if (!(k in tokens)) throw new Error(`Missing token ${k}`);
    out = out.split(`{{${k}}}`).join(esc(tokens[k]));
  }
  // An empty cross check or duplication line leaves no stray paragraph behind.
  out = out.replace(/<p class="flag"><\/p>\s*/g, '').replace(/<p><\/p>\s*/g, '');
  const left = out.match(/{{[A-Z_]+}}/g);
  if (left) throw new Error(`Unfilled tokens: ${[...new Set(left)].join(', ')}`);
  return out;
}

export function loadTemplate(file) { return fs.readFileSync(file, 'utf8'); }

// ---------- checks on what the model wrote ----------
const FIX_WORDS = /\b(automat\w*|software|tool|tools|vendor|platform|implement\w*|integrat\w*|app|apps|bot|chatbot|AI|Zapier|n8n|HubSpot|ChatGPT|Claude|Copilot|recommend\w*|should|you could|you need to|the fix|to fix|solution|set up|setting up|build\w*|dashboard|workflow tool)\b/i;
const INVENTED = /\b(typically|on average|most firms|firms like yours|firms your size|industry|benchmark\w*|research|studies|in my experience|usually|tend to)\b/i;

export function fixDashes(s) { return String(s).replace(/\s*[\u2013\u2014]\s*/g, ', '); }

// `theirWords` is the text of the bands they picked, so "20 to 40 hours" or
// "$60 to $90" quoted back from their own answer is not treated as invented.
export function lint(tokens, numbers, theirWords = '') {
  const allowed = new Set(Object.values(numbers));
  const said = String(theirWords);
  const warnings = [];
  for (const k of AI_KEYS) {
    const text = String(tokens[k] || '');
    if (/[\u2013\u2014]/.test(text)) warnings.push(`${k}: contains a dash`);
    const fix = text.match(FIX_WORDS);
    if (fix) warnings.push(`${k}: reads like a fix or a tool ("${fix[0]}")`);
    const inv = text.match(INVENTED);
    if (inv) warnings.push(`${k}: claims something the respondent did not say ("${inv[0]}")`);
    for (const m of text.match(/\$[\d,]+(?:\.\d+)?[kKmM]?/g) || []) if (!allowed.has(m) && !said.includes(m)) warnings.push(`${k}: figure ${m} is not one the model produced`);
    for (const m of text.match(/\b\d+(?:\.\d+)?\s?%/g) || []) if (!said.includes(m.replace(/\s/g, ''))) warnings.push(`${k}: percentage ${m} is not something the model produced`);
    for (const m of text.match(/\b(\d{2,4})\s+hours?\b/g) || []) { const n = m.match(/\d+/)[0]; if (n !== numbers.HOURS_LOW && n !== numbers.HOURS_HIGH && n !== numbers.HOURS_WEEK && !new RegExp(`\\b${n}\\b`).test(said)) warnings.push(`${k}: "${m}" is not a figure the model produced`); }
    if (k !== 'DUP_LINE' && text.trim().length < 20) warnings.push(`${k}: too short to be useful`);
  }
  return warnings;
}

// ---------- delivery emails, from emails.md ----------
export function deliveryEmail(kind, { firm, first, low, high, gap, finding, calendly }) {
  const subject = `${firm} · your Admin Load Check`;
  if (kind === 'small') return { subject, text: `Hi ${first},

Report's attached, and I'll save you reading it first: the number's small.

On what you told me the repeat work is costing somewhere around ${low} a year, and at that size the cost of fixing it is close enough to the cost of living with it that I wouldn't bother yet. The one thing I'd keep an eye on is ${gap}, because that's the part that grows fastest as you take on more work.

Worth doing again if you add people. Thanks for the six minutes.

Dave` };
  if (kind === 'short') return { subject, text: `Hi ${first},

Thanks for filling that in.

Straight answer: at your size the full written version wouldn't tell you much you don't already know, so I'm not going to send you three pages pretending otherwise. What your answers do show is ${finding}.

If you want to talk that through, half an hour is free and there's no pitch at the end of it. Here's my calendar: ${calendly}

Dave` };
  return { subject, text: `Hi ${first},

Report's attached.

The short version: on the numbers you gave me the repeat work is costing somewhere between ${low} and ${high} a year, and the heaviest slice of it is ${gap}. That's not where most firms point first, which is the interesting part.

It's an estimate, not an audit, and I've said so in the report rather than dressing it up. Read it, argue with it if you think the numbers are off, and tell me where.

If it's worth half an hour I'm around most days. If it isn't, no hard feelings and you're welcome to keep the report.

Dave` };
}

// The one line finding for the short email, from the numbers only.
export function oneLineFinding(scored) {
  return `the repeat work sits around ${formatAUD(scored.total)} a year at the moment, with ${scored.gap.label.toLowerCase()} the heaviest slice of it`;
}

export function firstNameOf(name) { return String(name || '').trim().split(/\s+/)[0] || 'there'; }

// The words of every band they picked, for lint.
export function theirBandWords(answers, questions, optionLabel) {
  const parts = [];
  for (const q of questions) {
    if (!q.options) continue;
    const v = answers[q.id];
    for (const c of Array.isArray(v) ? v : [v]) parts.push(optionLabel(q.id, c));
  }
  return parts.join(' | ');
}
