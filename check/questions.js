// The Admin Load Check · question schema v1.0
// Built from questionnaire.md, plus Dave's edits from the 3 Sep 2026 phone test
// (company name, business development, specialist software, repeat emails,
// multiple checkers, building the business). Do not reword without him.
// Each option is [code, label]. The code is what the scoring model reads.

export const SECTIONS = [
  { n: 1, name: 'About your firm', count: 7 },
  { n: 2, name: 'Where the week goes', count: 5 },
  { n: 3, name: 'The documents you write twice', count: 4 },
  { n: 4, name: 'The numbers', count: 5,
    note: 'Section 4 is the one that matters. The figures in your report are only as good as what goes into them. If you\'re not sure, pick the band that feels closest. A rough answer in the right band gives you a useful report. A skipped one leaves a hole in it.' },
  { n: 5, name: 'Your situation', count: 4 },
  { n: 6, name: 'One last thing', count: 1 },
];

export const QUESTIONS = [
  // Section 1 · About your firm
  { id: '1.1', section: 1, type: 'text', label: 'Your name', autocomplete: 'name' },
  { id: '1.2', section: 1, type: 'text', label: 'Company name', autocomplete: 'organization' },
  { id: '1.3', section: 1, type: 'text', label: 'Your role', autocomplete: 'organization-title' },
  { id: '1.4', section: 1, type: 'email', label: 'Your email', autocomplete: 'email' },
  { id: '1.5', section: 1, type: 'phone', label: 'Your phone', optional: true, autocomplete: 'tel',
    helper: 'Only used if you ask me to ring you.' },
  { id: '1.6', section: 1, type: 'single', label: 'What does the firm do?', options: [
    ['ACC', 'Accounting or bookkeeping'], ['ADV', 'Financial advice'], ['LEG', 'Legal'],
    ['REC', 'Recruitment or staffing'], ['ENG', 'Engineering or technical consulting'],
    ['CERT', 'Building certification or surveying'], ['ARCH', 'Architecture or planning'],
    ['PROP', 'Property or development'], ['AGY', 'Marketing or creative agency'],
    ['OTH', 'Something else'],
  ] },
  { id: '1.7', section: 1, type: 'single', label: 'How many people, including you?', options: [
    ['S1', '1'], ['S2', '2 to 5'], ['S3', '6 to 15'], ['S4', '16 to 50'], ['S5', '51 to 100'], ['S6', 'Over 100'],
  ] },

  // Section 2 · Where the week goes
  { id: '2.1', section: 2, type: 'multi', label: 'Which of these eat the most time?', options: [
    ['CHASE', 'Chasing clients or candidates for information'],
    ['REKEY', 'Typing the same information into two systems'],
    ['DOCS', 'Writing documents that follow the same shape every time'],
    ['STATUS', 'Internal status updates and reporting'],
    ['SCHED', 'Scheduling and coordination'],
    ['BILL', 'Invoicing and billing write ups'],
    ['TRIAGE', 'Sorting and triaging what comes in'],
    ['COMPL', 'Compliance records and file notes'],
    ['BIZDEV', 'Business development or lead generation'],
    ['OTH', 'Something else'],
  ] },
  { id: '2.2', section: 2, type: 'single', label: 'Across everybody, roughly how many hours a week go into that?',
    helper: 'Add up the whole firm, not just your own week.', options: [
    ['H3', 'Under 5'], ['H7', '5 to 10'], ['H15', '10 to 20'], ['H30', '20 to 40'], ['H60', '40 to 80'], ['H100', 'Over 80'],
  ] },
  { id: '2.3', section: 2, type: 'single', label: 'Who does most of it?', options: [
    ['W_OWNER', 'Me'], ['W_ADMIN', 'Admin or support staff'], ['W_FEE', 'The fee earners themselves'],
    ['W_MIX', 'A mix of everyone'], ['W_OUT', 'Offshore or outsourced'],
  ] },
  { id: '2.4', section: 2, type: 'single', label: 'Is any of it done twice? Same information, two places.', options: [
    ['D_HIGH', 'Yes, routinely'], ['D_MED', 'Yes, sometimes'], ['D_LOW', 'Rarely'], ['D_NONE', 'No'],
  ] },
  { id: '2.5', section: 2, type: 'multi', label: 'Where does the work already live?', options: [
    ['SYS_PM', 'Practice or job management system'], ['SYS_CRM', 'CRM'], ['SYS_ACC', 'Xero, MYOB or similar'],
    ['SYS_SPEC', 'Specialist software for your industry'], ['SYS_MS', 'Microsoft 365 or SharePoint'], ['SYS_G', 'Google Workspace'], ['SYS_XL', 'Spreadsheets'],
    ['SYS_MAIL', 'Email and nothing else'], ['SYS_PAPER', 'Paper'], ['OTH', 'Something else'],
  ] },

  // Section 3 · The documents you write twice
  { id: '3.1', section: 3, type: 'multi', label: 'Which documents get written over and over?', options: [
    ['DOC_NOTE', 'File notes or meeting notes'], ['DOC_REP', 'Client reports'], ['DOC_QUOTE', 'Quotes or proposals'],
    ['DOC_BILL', 'Billing narrations or time write ups'], ['DOC_CAND', 'Candidate or applicant summaries'],
    ['DOC_COMP', 'Compliance or audit records'], ['DOC_STAT', 'Status updates to clients'],
    ['DOC_EMAIL', 'Emails that say the same thing every time'], ['DOC_NONE', 'None of these'],
  ], exclusive: 'DOC_NONE' },
  { id: '3.2', section: 3, type: 'single', label: 'How long does one of them take, start to finish?', options: [
    ['T10', 'Under 15 minutes'], ['T22', '15 to 30 minutes'], ['T45', '30 to 60 minutes'], ['T90', '1 to 2 hours'], ['T150', 'Over 2 hours'],
  ] },
  { id: '3.3', section: 3, type: 'single', label: 'How many go out a week across the firm?', options: [
    ['N3', 'Under 5'], ['N12', '5 to 20'], ['N35', '20 to 50'], ['N75', '50 to 100'], ['N130', 'Over 100'],
  ] },
  { id: '3.4', section: 3, type: 'multi', label: 'Who checks one before it leaves?', options: [
    ['CHK_NONE', 'Nobody'], ['CHK_SELF', 'Whoever wrote it'], ['CHK_SNR', 'A senior'],
    ['CHK_PTR', 'Partner or director sign off'], ['CHK_VAR', 'Depends on the document'],
  ], exclusive: 'CHK_NONE' },

  // Section 4 · The numbers
  { id: '4.1', section: 4, type: 'single', label: 'What does an hour of the person doing that work cost the firm?',
    helper: 'Salary plus on costs, not what you bill for it.', options: [
    ['C35', 'Under $40'], ['C50', '$40 to $60'], ['C75', '$60 to $90'], ['C110', '$90 to $130'], ['C165', '$130 to $200'], ['C230', 'Over $200'],
  ] },
  { id: '4.2', section: 4, type: 'single', label: 'What do you bill an hour of fee earner time at?', options: [
    ['B_NA', 'We don\'t bill by the hour'], ['B120', 'Under $150'], ['B200', '$150 to $250'],
    ['B325', '$250 to $400'], ['B500', '$400 to $600'], ['B700', 'Over $600'],
  ] },
  { id: '4.3', section: 4, type: 'single', label: 'How much of the average week never reaches a client?', options: [
    ['A5', 'Under 10%'], ['A15', '10 to 20%'], ['A25', '20 to 30%'], ['A40', '30 to 50%'], ['A60', 'Over 50%'],
  ] },
  { id: '4.4', section: 4, type: 'single', label: 'Does work slip because of the admin backlog?', options: [
    ['SL_NONE', 'Never'], ['SL_OCC', 'Occasionally'], ['SL_MON', 'Most months'], ['SL_WK', 'Most weeks'], ['SL_CON', 'Constantly'],
  ] },
  { id: '4.5', section: 4, type: 'single', label: 'If you got those hours back, what would they go on?', options: [
    ['U_CLIENT', 'More client work'], ['U_OT', 'Less overtime'], ['U_HIRE', 'Not making the next hire'],
    ['U_GROW', 'Taking on more clients'], ['U_BUILD', 'Building the business'], ['U_UNSURE', 'Honestly not sure'],
    ['U_OTH', 'Something else'],
  ] },

  // Section 5 · Your situation
  { id: '5.1', section: 5, type: 'long', label: 'What made you look at this now?', probe: true },
  { id: '5.2', section: 5, type: 'single', label: 'Are you looking to do something about it in the next 90 days?', options: [
    ['Q_HOT', 'Yes, it\'s a priority'], ['Q_WARM', 'Yes, but it depends what it costs'],
    ['Q_COOL', 'Maybe, I\'m still looking'], ['Q_COLD', 'No, just curious'],
  ] },
  { id: '5.3', section: 5, type: 'single', label: 'Who else would be in that decision?', options: [
    ['DM_1', 'Just me'], ['DM_2', 'Me and one other person'], ['DM_3', 'A small leadership team'], ['DM_4', 'Partners or a board'],
  ] },
  { id: '5.4', section: 5, type: 'single', label: 'Have you had a go at this before?', options: [
    ['P_NONE', 'No, first time'], ['P_SW', 'Yes, with software'], ['P_HIRE', 'Yes, with a hire'],
    ['P_CONS', 'Yes, with a consultant or agency'], ['P_MULTI', 'Yes, more than once'],
  ] },

  // Section 6 · One last thing
  { id: '6.1', section: 6, type: 'long', probe: true,
    label: 'In your own words: if one part of the week could run itself without anyone chasing it, which part, and what would change for you?' },
];

export const QUESTION_COUNT = QUESTIONS.length; // 26

export const byId = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));

export function optionLabel(id, code) {
  const q = byId[id];
  if (!q || !q.options) return code;
  const hit = q.options.find(o => o[0] === code);
  return hit ? hit[1] : code;
}

// True when a value is an allowed answer for the question. Used by the page
// and, later, by the worker, so both sides reject the same things.
export function isValidAnswer(q, value) {
  if (value == null || value === '') return !!q.optional;
  switch (q.type) {
    case 'single': return q.options.some(o => o[0] === value);
    case 'multi': return Array.isArray(value) && value.length > 0 && value.every(v => q.options.some(o => o[0] === v));
    case 'email': return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) && value.length <= 200;
    case 'phone': return typeof value === 'string' && value.length <= 40;
    case 'text': return typeof value === 'string' && value.trim().length > 0 && value.length <= 200;
    case 'long': return typeof value === 'string' && value.trim().length > 0 && value.length <= 2000;
    default: return false;
  }
}
