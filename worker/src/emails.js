// Email copy and the branded HTML wrapper. Used by the worker (confirmation
// and the alert to Dave) and by tools/send.js (the report delivery emails),
// so every email from the check looks like it came from the same person.
import { QUESTIONS, SECTIONS, optionLabel } from '../../check/questions.js';
import { formatAUD } from '../../check/model.js';

export const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function firstNameOf(fullName) {
  return String(fullName || '').trim().split(/\s+/)[0] || 'there';
}

// Dave's signature block, as supplied on 4 Sep 2026.
export const SIGNATURE_HTML = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial, Helvetica, sans-serif; border-collapse:collapse">
<tbody><tr>
<td style="padding-right:16px; vertical-align:middle"><a href="https://quantai.com.au" style="text-decoration: none;" target="_blank"><img src="https://quantai.com.au/apple-touch-icon.png" width="48" height="48" alt="QuantAI" style="display: block; border-radius: 3px; border: 0px;"></a></td>
<td style="border-left:1px solid rgb(231, 235, 239); padding-left:16px; vertical-align:middle">
<div style="font-family: Georgia, &quot;Times New Roman&quot;, serif; font-size: 16px; line-height: 20px; font-weight: bold; color: rgb(15, 27, 42);">Dave Richardson<br></div>
<div style="font-size: 12.5px; line-height: 17px; padding-top: 1px; color: rgb(64, 83, 107);">Founder · QuantAI<br></div>
<div style="font-size: 12px; line-height: 17px; padding-top: 8px; color: rgb(64, 83, 107);"><a href="tel:+61407242251" style="text-decoration: none; color: rgb(64, 83, 107);" target="_blank">+61 407 242 251</a><span class="colour" style="color: rgb(122, 136, 153);">&nbsp;·&nbsp;</span><a href="mailto:dave@quantai.com.au" style="text-decoration: none; color: rgb(64, 83, 107);" target="_blank">dave@quantai.com.au</a><br></div>
<div style="font-size:12px; line-height:17px; padding-top:3px"><a href="https://quantai.com.au" style="text-decoration: none; font-weight: bold; color: rgb(20, 101, 92);" target="_blank">quantai.com.au</a><span class="colour" style="color: rgb(122, 136, 153);">&nbsp;·&nbsp;</span><a href="https://calendly.com/dave-quantai/zoom-meeting" style="text-decoration: none; font-weight: bold; color: rgb(20, 101, 92);" target="_blank">Book a call</a><span class="colour" style="color: rgb(122, 136, 153);">&nbsp;·&nbsp;</span><a href="https://www.linkedin.com/in/dave-richardson-3b4a697/" style="text-decoration: none; font-weight: bold; color: rgb(20, 101, 92);" target="_blank">LinkedIn</a><br></div>
</td></tr></tbody></table>`;

export const SIGNATURE_TEXT = `Dave Richardson · Founder · QuantAI
+61 407 242 251 · dave@quantai.com.au
quantai.com.au · calendly.com/dave-quantai/zoom-meeting`;

const FONT = 'Inter, Arial, Helvetica, sans-serif';
const P = `margin:0 0 16px;font-family:${FONT};font-size:16px;line-height:1.6;color:#1B2C42`;

// Plain text paragraphs (blank line between) to email safe HTML paragraphs.
export function paragraphsToHtml(text) {
  return String(text).trim().split(/\n\s*\n/).map(p => `<p style="${P}">${esc(p).replace(/\n/g, '<br>')}</p>`).join('\n');
}

// The branded shell: paper background, white card, ink header, optional signature.
export function wrapHtml({ preheader = '', bodyHtml, signature = true, footer = '' }) {
  return `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>QuantAI</title></head>
<body style="margin:0;padding:0;background:#F6F5F1;">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:#F6F5F1;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F6F5F1;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid #E7EBEF;border-radius:4px;">
<tr><td style="background:#0F1B2A;padding:14px 28px;border-radius:4px 4px 0 0;"><a href="https://quantai.com.au" style="text-decoration:none;"><img src="https://quantai.com.au/apple-touch-icon.png" width="28" height="28" alt="" style="display:inline-block;vertical-align:middle;border-radius:3px;border:0;"><span style="font-family:Georgia,'Times New Roman',serif;color:#FFFFFF;font-size:17px;font-weight:bold;vertical-align:middle;padding-left:10px;">QuantAI</span></a></td></tr>
<tr><td style="padding:28px 28px 8px;">${bodyHtml}</td></tr>
${signature ? `<tr><td style="padding:8px 28px 28px;">${SIGNATURE_HTML}</td></tr>` : ''}
</table>
${footer ? `<p style="font-family:${FONT};font-size:12px;line-height:1.5;color:#7A8899;max-width:600px;margin:14px auto 0;text-align:left;">${esc(footer)}</p>` : ''}
</td></tr></table>
</body></html>`;
}

// ---------- to the respondent ----------
export function confirmationEmail({ name }) {
  const first = firstNameOf(name);
  const body = `Hi ${first},

Thanks for completing the form, your answers have come through.

I'll go through them all and write your report myself, so give me two business days rather than two minutes, and look out for it coming from this address with a PDF attached.

If anything's changed since you filled it in, or you want to add something you didn't have room for, just reply to this and it'll reach me.

Cheers
Dave`;
  return {
    subject: 'Got it, your Admin Load Check is with me',
    text: `${body}\n\n${SIGNATURE_TEXT}`,
    html: wrapHtml({ preheader: 'Your answers have come through. Report inside two business days.', bodyHtml: paragraphsToHtml(body) }),
  };
}

// ---------- to Dave: the review sheet ----------
const TIER_WORD = { full_land: 'land the $995', full_hold: 'hold the price', short: 'short email' };
const POINT_MAX = { size: 4, hourlyCost: 3, intent: 4, deciders: 3, prior: 3, slippage: 4, loadSize: 4 };
const POINT_NAME = { size: 'Size', hourlyCost: 'Value of an hour', intent: 'Intent (90 days)', deciders: 'Ease of decision', prior: 'Tried before', slippage: 'Pain now', loadSize: 'Size of the load' };

function answerText(id, v) {
  if (Array.isArray(v)) return v.map(c => optionLabel(id, c)).join('; ');
  const q = QUESTIONS.find(x => x.id === id);
  return q && q.options ? optionLabel(id, v) : String(v || '');
}

export function alertEmail({ id, answers, probes, scored, qualification, estimate, src, ref, receivedAt }) {
  const a = answers; const q = qualification; const p = probes || {};
  const firm = a['1.2'] || '(no company name)';
  const first = firstNameOf(a['1.1']);
  const small = q.points.loadSize === 0;
  const todo = [
    q.override ? q.overrideLine : q.routing,
    q.override ? '' : (q.tier === 'full_land' ? 'Price stays in the PDF.' : q.tier === 'full_hold' ? 'The PDF goes out without the price block.' : 'No PDF. Send email 4 with the one line finding and the calendar link.'),
    small ? 'The load is under $10,000 a year, so the small number email goes with it.' : '',
  ].filter(Boolean);
  const numbers = [
    ['Recoverable, a year', `${formatAUD(estimate.recoverableLow)} to ${formatAUD(estimate.recoverableHigh)}`],
    ['In hours', `${estimate.hoursLow} to ${estimate.hoursHigh} a year`],
    ['The repeat work, a year', formatAUD(scored.total)],
    ['Hours a week used', scored.inputsAgree ? `${scored.inputs.adminHours} (band midpoint)` : `${Number(scored.hoursWeekUsed.toFixed(1))} from the documents, against ${scored.inputs.adminHours} from the band`],
    ['Cost of an hour (band midpoint)', formatAUD(scored.inputs.hourlyCost)],
    ['Heaviest family', `${scored.gap.label}, about ${formatAUD(scored.gap.costRounded)} a year`],
    ['Same work done twice', scored.duplicatedRounded ? `about ${formatAUD(scored.duplicatedRounded)}` : 'none, they said no'],
    ['Do the inputs agree?', scored.inputsAgree ? 'Yes. The document work sits inside the section 2 hours.' : `NO. Section 3 alone comes to ${formatAUD(scored.docCost)} against ${formatAUD(scored.adminCost)} from section 2, so the hours are understated and the higher figure is used. The report says so.`],
    ['At the billed rate (context only)', scored.billedUpperBound ? formatAUD(scored.billedUpperBound) : 'they do not bill by the hour'],
  ];
  const points = Object.keys(POINT_MAX).map(k => [POINT_NAME[k], `${q.points[k]} of ${POINT_MAX[k]}`]);
  const split = scored.families.map(f => [f.label, `${Math.round(f.share * 100)}%`, formatAUD(Math.round(f.cost))]);
  const words = [['5.1', 'What made you look at this now?'], ['6.1', 'If one part of the week could run itself']].map(([qid, label]) => ({
    label, answer: a[qid], follow: p[qid] && p[qid].question ? p[qid] : null,
  }));
  const who = [`${a['1.3']}`, a['1.4'], a['1.5'] || 'no phone', answerText('1.6', a['1.6']), `${answerText('1.7', a['1.7'])} people`].join(' · ');
  const meta = `Received ${(receivedAt || '').slice(0, 16).replace('T', ' ')} UTC · ${src ? `via ${src}${ref ? ' (' + ref + ')' : ''}` : 'source not tagged'}`;

  // ---- text ----
  const t = [];
  t.push(`${a['1.1']} at ${firm}`, who, meta, '');
  t.push(`WHAT TO DO · ${q.total} of 25 · ${TIER_WORD[q.tier]}${q.override ? ' · OVERRIDE' : ''}`, ...todo, '');
  t.push('THE NUMBERS', ...numbers.map(([k, v]) => `${k}: ${v}`), '');
  t.push('QUALIFICATION', ...points.map(([k, v]) => `${k}: ${v}`), '');
  t.push('WHERE THE HOURS SIT (first pass from their ticks, change it in draft)', ...split.map(([f, s, c]) => `${f}: ${s}, ${c}`), '');
  t.push('THEIR WORDS');
  for (const w of words) { t.push(w.label, `  "${w.answer}"`); if (w.follow) t.push(`  Follow up: ${w.follow.question}`, `  "${w.follow.answer || '(skipped)'}"`); }
  t.push('', 'EVERY ANSWER');
  for (const s of SECTIONS) { t.push(`${s.n}. ${s.name}`); for (const qq of QUESTIONS.filter(x => x.section === s.n)) t.push(`  ${qq.id} ${qq.label}: ${answerText(qq.id, a[qq.id]) || '(blank)'}`); }
  t.push('', `Submission ${id}`, 'npm run pull, then npm run draft ' + id.slice(0, 8));

  // ---- html ----
  const H = `font-family:${FONT};`;
  const h2 = s => `<p style="margin:26px 0 8px;${H}font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#14655C;font-weight:bold;">${esc(s)}</p>`;
  const rows = (pairs, cols = 2) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;${H}font-size:14px;line-height:1.5;color:#1B2C42;">${pairs.map(r => `<tr>${r.map((c, i) => `<td style="padding:7px 8px 7px 0;border-top:1px solid #E7EBEF;vertical-align:top;${i === 0 ? 'color:#40536B;width:44%;' : ''}${i > 0 && cols > 2 ? 'text-align:right;white-space:nowrap;' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('')}</table>`;
  const box = (inner, wash, border) => `<div style="background:${wash};border:1px solid ${border};border-radius:4px;padding:14px 16px;margin:0 0 10px;${H}font-size:15px;line-height:1.5;color:#1B2C42;">${inner}</div>`;
  let body = `<p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.25;color:#0F1B2A;font-weight:bold;">${esc(a['1.1'])} at ${esc(firm)}</p>
<p style="margin:0 0 4px;${H}font-size:13.5px;color:#40536B;">${esc(who)}</p>
<p style="margin:0 0 18px;${H}font-size:12.5px;color:#7A8899;">${esc(meta)}</p>`;
  body += box(`<b>${q.total} of 25 · ${esc(TIER_WORD[q.tier])}${q.override ? ' · OVERRIDE' : ''}</b><br>${todo.map(esc).join('<br>')}`, q.override ? '#F5EDE0' : '#E5F8F5', q.override ? '#E4D3B6' : '#A6D8D1');
  if (!scored.inputsAgree) body += box(`<b>Inputs disagree.</b> ${esc(numbers[7][1])}`, '#F5EDE0', '#E4D3B6');
  body += h2('The numbers') + rows(numbers);
  body += h2('Qualification') + rows(points);
  body += h2('Where the hours sit') + `<p style="margin:0 0 6px;${H}font-size:12.5px;color:#7A8899;">First pass from their ticks. You set the real split in draft.</p>` + rows(split, 3);
  body += h2('Their words');
  for (const w of words) {
    body += `<p style="margin:0 0 4px;${H}font-size:13px;color:#40536B;">${esc(w.label)}</p><blockquote style="margin:0 0 12px;padding:2px 0 2px 14px;border-left:3px solid #A9803E;font-family:Georgia,'Times New Roman',serif;font-size:15.5px;line-height:1.5;color:#0F1B2A;font-style:italic;">${esc(w.answer)}</blockquote>`;
    if (w.follow) body += `<p style="margin:0 0 4px;${H}font-size:13px;color:#40536B;">Follow up: ${esc(w.follow.question)}</p><blockquote style="margin:0 0 16px;padding:2px 0 2px 14px;border-left:3px solid #E7EBEF;font-family:Georgia,'Times New Roman',serif;font-size:15.5px;line-height:1.5;color:#0F1B2A;font-style:italic;">${esc(w.follow.answer || '(skipped)')}</blockquote>`;
  }
  body += h2('Every answer');
  for (const s of SECTIONS) {
    body += `<p style="margin:14px 0 2px;${H}font-size:13.5px;font-weight:bold;color:#0F1B2A;">${s.n}. ${esc(s.name)}</p>` + rows(QUESTIONS.filter(x => x.section === s.n).map(qq => [`${qq.id} ${qq.label}`, answerText(qq.id, a[qq.id]) || '(blank)']));
  }
  body += `<p style="margin:26px 0 0;${H}font-size:12.5px;color:#7A8899;">Submission ${esc(id)}. Then: npm run pull, npm run draft ${esc(id.slice(0, 8))}.</p>`;

  return {
    subject: `Admin Load Check · ${firm} · ${q.total}/25 · ${TIER_WORD[q.tier]}${q.override ? ' · OVERRIDE' : ''}`,
    text: t.join('\n'),
    html: wrapHtml({ preheader: `${first} at ${firm}, ${q.total} of 25, ${formatAUD(estimate.recoverableLow)} to ${formatAUD(estimate.recoverableHigh)}`, bodyHtml: body, signature: false }),
  };
}
