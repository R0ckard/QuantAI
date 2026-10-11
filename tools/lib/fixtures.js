// Made-up submissions, one for each way the check routes somebody, for
// trying the pipeline board (`npm run board -- fixtures`). Every address
// ends in .example, which cannot receive mail, so each is filed as a test
// deal and can be cleared from the board. The scoring is the real model's.
import { score, qualify } from '../../check/model.js';

const base = {
  '1.1': 'Test: Sam Whitfield', '1.2': 'Fictional Partners', '1.3': 'Managing partner', '1.4': 'land@check-fixture.example', '1.5': '',
  '1.6': 'ACC', '1.7': 'S4', '2.1': ['CHASE', 'REKEY', 'DOCS', 'STATUS'], '2.2': 'H30', '2.3': 'W_MIX', '2.4': 'D_MED', '2.5': ['SYS_PM', 'SYS_XL'],
  '3.1': ['DOC_NOTE', 'DOC_REP', 'DOC_BILL'], '3.2': 'T45', '3.3': 'N35', '3.4': ['CHK_SNR', 'CHK_PTR'],
  '4.1': 'C75', '4.2': 'B325', '4.3': 'A25', '4.4': 'SL_WK', '4.5': 'U_CLIENT',
  '5.1': 'A made-up answer for a test submission.',
  '5.2': 'Q_WARM', '5.3': 'DM_2', '5.4': 'P_SW',
  '6.1': 'A made-up answer for a test submission.',
};

// expect: the tier and override the model should give, checked by a test so
// a change to the scoring cannot quietly move a fixture into another band.
export const FIXTURES = [
  { id: '00000000-0000-4000-8000-00000000f001', expect: { tier: 'full_land', override: false }, answers: base },
  { id: '00000000-0000-4000-8000-00000000f002', expect: { tier: 'full_hold', override: false },
    answers: { ...base, '1.1': 'Test: Priya Raman', '1.2': 'Made-up Engineering', '1.4': 'hold@check-fixture.example', '1.6': 'ENG', '1.7': 'S3', '5.2': 'Q_COOL', '5.4': 'P_NONE', '4.4': 'SL_OCC' } },
  { id: '00000000-0000-4000-8000-00000000f003', expect: { tier: 'short', override: false },
    answers: { ...base, '1.1': 'Test: Helen Zubiri', '1.2': 'Placeholder Community Services', '1.4': 'short@check-fixture.example', '1.6': 'NFP', '1.7': 'S6', '2.2': 'H7', '3.2': 'T10', '3.3': 'N3', '4.1': 'C50', '4.4': 'SL_NONE', '5.2': 'Q_COLD', '5.3': 'DM_4', '5.4': 'P_NONE' } },
  { id: '00000000-0000-4000-8000-00000000f004', expect: { tier: 'full_land', override: true },
    answers: { ...base, '1.1': 'Test: Marcus Lindqvist', '1.2': 'Invented Insurance Brokers', '1.4': 'small@check-fixture.example', '1.6': 'INS', '1.7': 'S2' } },
];

export function fixtureRecord(f, now = new Date()) {
  const scored = score(f.answers);
  return {
    id: f.id, receivedAt: now.toISOString(), src: 'fixture', ref: '',
    answers: f.answers, probes: {}, scored, qualification: qualify(f.answers, scored),
    consent: { notes: false }, isTest: true,
  };
}
