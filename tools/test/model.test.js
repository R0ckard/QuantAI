import { test } from 'node:test';
import assert from 'node:assert/strict';
import { score, qualify, deriveSplit, publicEstimate, CONSTANTS } from '../../check/model.js';
import { QUESTIONS, isValidAnswer } from '../../check/questions.js';

// The workbook sample: Whitfield Partners.
const golden = {
  '1.7': 'S4', '2.1': ['CHASE', 'REKEY', 'DOCS', 'STATUS'], '2.2': 'H30', '2.4': 'D_MED',
  '3.1': ['DOC_NOTE', 'DOC_REP', 'DOC_BILL'], '3.2': 'T45', '3.3': 'N35',
  '4.1': 'C75', '4.2': 'B325', '4.4': 'SL_WK',
  '5.2': 'Q_WARM', '5.3': 'DM_2', '5.4': 'P_SW',
};
const goldenSplit = { CHASE: 0.20, REKEY: 0.15, DOCS: 0.30, STATUS: 0.15, SCHED: 0.05, BILL: 0.05, TRIAGE: 0.05, COMPL: 0.05 };

test('constants are the workbook assumptions', () => {
  assert.equal(CONSTANTS.WEEKS, 46);
  assert.equal(CONSTANTS.RECOVERABLE_LOW, 0.2);
  assert.equal(CONSTANTS.RECOVERABLE_HIGH, 0.4);
});

test('golden case matches the workbook', () => {
  const s = score(golden, goldenSplit);
  assert.equal(s.total, 103500);
  assert.equal(s.inputsAgree, true);
  assert.equal(s.recoverableLow, 21000);
  assert.equal(s.recoverableHigh, 41000);
  assert.equal(s.hoursLow, 280);
  assert.equal(s.hoursHigh, 550);
  assert.equal(s.gap.key, 'DOCS');
  assert.equal(s.gap.costRounded, 31000);
  assert.equal(s.duplicatedRounded, 16000);
  assert.equal(s.billedUpperBound, 449000);
  const q = qualify(golden, s);
  assert.equal(q.total, 20);
  assert.equal(q.tier, 'full_land');
  assert.equal(q.override, false);
});

test('golden case with the derived split still names documents', () => {
  const s = score(golden);
  assert.equal(s.splitDerived, true);
  assert.equal(s.gap.key, 'DOCS');
  assert.equal(s.recoverableLow, 21000);
});

test('document maths exceeding the section 2 total fires the flag', () => {
  const a = { ...golden, '2.2': 'H7', '3.2': 'T90', '3.3': 'N35' };
  const s = score(a);
  assert.equal(s.inputsAgree, false);
  assert.equal(s.adminCost, 7.5 * 75 * 46);
  assert.equal(s.docCost, 35 * 1.5 * 75 * 46);
  assert.equal(s.total, s.docCost);
});

test('minimum case routes away from the $995', () => {
  const a = { ...golden, '1.7': 'S1', '2.2': 'H3', '4.1': 'C35', '5.2': 'Q_COLD', '5.3': 'DM_1', '5.4': 'P_NONE', '4.4': 'SL_NONE', '3.3': 'N3', '3.2': 'T10' };
  const s = score(a);
  const q = qualify(a, s);
  assert.equal(q.tier, 'short');
  assert.equal(q.override, true);
  assert.ok(q.total < 9);
});

test('derived split folds 3.1 into documents and ignores something else', () => {
  const split = deriveSplit({ '2.1': ['CHASE', 'OTH'], '3.1': ['DOC_NOTE', 'DOC_REP'] });
  assert.equal(split.CHASE, 1 / 3);
  assert.equal(split.DOCS, 2 / 3);
  const none = deriveSplit({ '2.1': ['OTH'], '3.1': ['DOC_NONE'] });
  assert.equal(none.CHASE, 1 / 8);
});

test('public estimate carries no qualification or billed figure', () => {
  const p = publicEstimate(score(golden));
  assert.deepEqual(Object.keys(p).sort(), ['gapKey', 'gapLabel', 'hoursHigh', 'hoursLow', 'recoverableHigh', 'recoverableLow']);
});

test('schema has 26 questions in six sections and rejects bad codes', () => {
  assert.equal(QUESTIONS.length, 26);
  assert.equal(new Set(QUESTIONS.map(q => q.section)).size, 6);
  const q22 = QUESTIONS.find(q => q.id === '2.2');
  assert.equal(isValidAnswer(q22, 'H30'), true);
  assert.equal(isValidAnswer(q22, 'H31'), false);
  const q15 = QUESTIONS.find(q => q.id === '1.5');
  assert.equal(isValidAnswer(q15, ''), true);
});

test('no em or en dashes in the schema or model', async () => {
  const fs = await import('node:fs');
  for (const f of ['../../check/questions.js', '../../check/model.js']) {
    const text = fs.readFileSync(new URL(f, import.meta.url), 'utf8');
    assert.equal(/[\u2013\u2014]/.test(text), false, f);
  }
});
