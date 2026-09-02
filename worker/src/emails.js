// Email copy for the worker. From emails.md v1.0, plain text, no markdown.
// The delivery emails (the report itself) live in the local CLI, not here.

export function firstNameOf(fullName) {
  return String(fullName || '').trim().split(/\s+/)[0] || 'there';
}

export function confirmationEmail({ name }) {
  const first = firstNameOf(name);
  return {
    subject: 'Got it, your Admin Load Check is with me',
    text: `Hi ${first},

Thanks, that's come through.

I'll go through your answers and write your report myself, so give me two business days rather than two minutes. It'll come from this address with a PDF attached.

If anything's changed since you filled it in, or you want to add something you didn't have room for, just reply to this and it'll reach me.

Dave

Dave Richardson · QuantAI · quantai.com.au`,
  };
}

export function alertEmail({ id, answers, probes, scored, qualification, estimate, src, ref, fmt }) {
  const q = qualification;
  const firm = answers['1.2'] || '(no company name)';
  const lines = [
    `New Admin Load Check from ${answers['1.1']} at ${firm} (${answers['1.3']}).`,
    '',
    `Qualification ${q.total} of 25 · ${q.tier}`,
    q.routing,
    q.override ? `OVERRIDE: ${q.overrideLine}` : '',
    '',
    `Recoverable ${fmt(estimate.recoverableLow)} to ${fmt(estimate.recoverableHigh)} a year, ${estimate.hoursLow} to ${estimate.hoursHigh} hours.`,
    `Total load ${fmt(scored.total)}. Gap: ${scored.gap.label}. Inputs agree: ${scored.inputsAgree ? 'yes' : 'NO, section 3 exceeds section 2'}.`,
    `Points: size ${q.points.size}, cost ${q.points.hourlyCost}, intent ${q.points.intent}, deciders ${q.points.deciders}, prior ${q.points.prior}, slippage ${q.points.slippage}, load ${q.points.loadSize}.`,
    '',
    '5.1 What made you look at this now?',
    answers['5.1'],
    probes['5.1'] ? `   Follow up: ${probes['5.1'].question}\n   ${probes['5.1'].answer || '(skipped)'}` : '',
    '',
    '6.1 If one part of the week could run itself:',
    answers['6.1'],
    probes['6.1'] ? `   Follow up: ${probes['6.1'].question}\n   ${probes['6.1'].answer || '(skipped)'}` : '',
    '',
    src ? `Source: ${src}${ref ? ' via ' + ref : ''}` : 'Source: not tagged',
    `Submission ${id}. Run \`npm run pull\` in tools/ to fetch it.`,
  ];
  return {
    subject: `Admin Load Check · ${firm} · ${q.total}/25`,
    text: lines.filter(l => l !== '').join('\n'),
  };
}
