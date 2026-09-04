// npm run send <id> -- --reviewed [--short] [--dry-run]
// Refuses unless the PDF exists and --reviewed is passed. The gate is deliberate.
import fs from 'node:fs';
import { ENV, need } from './lib/env.js';
import { loadRecord, resolveId, outJson, outPdf, SENT_LOG } from './lib/paths.js';
import { score } from '../check/model.js';
import { deliveryEmail, oneLineFinding, firstNameOf, tierFor } from './lib/report.js';
import { wrapHtml, paragraphsToHtml, SIGNATURE_TEXT } from '../worker/src/emails.js';

const args = process.argv.slice(2);
const flag = f => args.includes(f);
const id = resolveId(args.find(a => !a.startsWith('--')));
const record = loadRecord(id);
const a = record.answers;
const short = flag('--short');
const dry = flag('--dry-run');

if (!flag('--reviewed')) {
  console.error(`Not sent. Read the ${short ? 'email' : 'PDF'} first, then run again with --reviewed. That flag is the whole point.`);
  process.exit(2);
}

let kind, draft = null, pdfPath = null;
if (short) {
  kind = 'short';
} else {
  pdfPath = outPdf(id);
  if (!fs.existsSync(pdfPath)) { console.error(`Not sent. No PDF at ${pdfPath}. Run npm run render ${id.slice(0, 8)} first.`); process.exit(2); }
  if (!fs.existsSync(outJson(id))) { console.error(`Not sent. No draft record at ${outJson(id)}.`); process.exit(2); }
  draft = JSON.parse(fs.readFileSync(outJson(id), 'utf8'));
  if (fs.statSync(pdfPath).mtimeMs < new Date(draft.draftedAt).getTime() - 1000) { console.error('Not sent. The PDF is older than the draft. Run npm run render again.'); process.exit(2); }
  kind = draft.tier.emailKind === 'small' ? 'small' : 'full';
}

const scored = draft ? draft.scored : score(a);
const email = deliveryEmail(kind, {
  firm: a['1.2'], first: firstNameOf(a['1.1']),
  low: draft ? draft.tokens.LOW : '', high: draft ? draft.tokens.HIGH : '',
  gap: scored.gap.label.toLowerCase(), finding: oneLineFinding(scored), calendly: ENV.CALENDLY_URL,
});

console.log(`To: ${a['1.4']}\nFrom: ${ENV.RESEND_FROM}\nSubject: ${email.subject}\n${pdfPath ? `Attachment: ${pdfPath}\n` : ''}\n${email.text}\n`);
if (dry) { console.log('Dry run, nothing sent.'); process.exit(0); }

need('RESEND_API_KEY');
const html = wrapHtml({ preheader: email.text.split('\n').filter(Boolean)[1] || '', bodyHtml: paragraphsToHtml(email.text) });
const body = { from: ENV.RESEND_FROM, to: [a['1.4']], reply_to: ENV.REPLY_TO, subject: email.subject, text: `${email.text}\n\n${SIGNATURE_TEXT}`, html };
if (pdfPath) body.attachments = [{ filename: `QuantAI-Admin-Load-Check-${a['1.2'].replace(/[^\w]+/g, '-')}.pdf`, content: fs.readFileSync(pdfPath).toString('base64') }];
const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { authorization: `Bearer ${ENV.RESEND_API_KEY}`, 'content-type': 'application/json' }, body: JSON.stringify(body) });
if (!r.ok) { console.error(`Resend said ${r.status}: ${await r.text()}`); process.exit(1); }
const { id: emailId } = await r.json();

const line = `${new Date().toISOString()}\t${id}\t${a['1.2']}\t${record.qualification.total}/25\t${kind}\t${emailId}\n`;
fs.appendFileSync(SENT_LOG, line);
console.log(`Sent (${emailId}). Logged to ${SENT_LOG}.`);

if (ENV.WORKER_URL && ENV.PULL_TOKEN) {
  const m = await fetch(`${ENV.WORKER_URL}/api/mark`, { method: 'POST', headers: { authorization: `Bearer ${ENV.PULL_TOKEN}`, 'content-type': 'application/json' }, body: JSON.stringify({ id }) });
  console.log(m.ok ? 'Marked processed on the worker.' : `Sent, but the worker would not mark it processed (${m.status}). It will show up in the next pull.`);
} else {
  console.log('WORKER_URL or PULL_TOKEN not set, so not marked processed on the worker.');
}
