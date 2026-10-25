// The sector pages (brief Phase 2, addendum v3 row 8). Each mock-up audit's
// money is run through the check's own model, so the site tells one story;
// the shared half has not drifted; and each page carries what it must.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { score, CONSTANTS, formatAUD } from '../../check/model.js';
import { QUESTIONS } from '../../check/questions.js';
import { build, sectorPages } from '../shared.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');

// Each page's stated assumptions, as check answers: hours a week (2.2) and
// what an hour costs (4.1), with the document questions kept small so the
// section 2 figure is the one used, exactly as the page's arithmetic shows.
const MOCKUPS = {
  'insurance-brokers': { sector: 'INS', hours: 'H30', cost: 'C50', words: ['30 hours a week', '$50 an hour'] },
  'accounting-firms': { sector: 'ACC', hours: 'H30', cost: 'C75', words: ['30 hours a week', '$75 an hour'] },
};

test('there is a page for each mock-up, and nothing else', () => {
  const found = sectorPages().map(f => path.basename(path.dirname(f))).sort();
  assert.deepEqual(found, Object.keys(MOCKUPS).sort());
});

for (const [slug, m] of Object.entries(MOCKUPS)) {
  const html = read(`ai-consulting/${slug}/index.html`);

  test(`${slug}: the mock-up's money is the check's own arithmetic`, () => {
    const s = score({ '2.1': ['REKEY'], '2.2': m.hours, '2.4': 'D_NONE', '3.1': ['DOC_NONE'], '3.2': 'T10', '3.3': 'N3', '4.1': m.cost, '4.2': 'B_NA' });
    assert.equal(s.inputsAgree, true);
    for (const w of m.words) assert.ok(html.includes(w), w);
    assert.ok(html.includes(`× ${CONSTANTS.WEEKS} working weeks`));
    assert.ok(html.includes(`= ${formatAUD(s.total)} a year spent on it`), formatAUD(s.total));
    assert.ok(html.includes(`${CONSTANTS.RECOVERABLE_LOW * 100}% to ${CONSTANTS.RECOVERABLE_HIGH * 100}%`));
    assert.ok(html.includes(`${formatAUD(s.recoverableLow)} to ${formatAUD(s.recoverableHigh)} a year`), `${s.recoverableLow} to ${s.recoverableHigh}`);
    assert.ok(html.includes(`${s.hoursLow} to ${s.hoursHigh} hours`));
  });

  test(`${slug}: labelled, linked to the check with its sector, and readable by search`, () => {
    assert.ok(html.includes('Illustrative audit · fictional business · figures modelled from stated assumptions'));
    const codes = QUESTIONS.find(q => q.id === '1.6').options.map(o => o[0]);
    assert.ok(codes.includes(m.sector));
    assert.ok(html.includes(`/check/?sector=${m.sector}`));
    // No utm tags on a link inside the site: they would hide where the person really came from.
    assert.ok(!/href="\/check\/[^"]*utm_/.test(html));
    assert.ok(html.includes(`<link rel="canonical" href="https://quantai.com.au/ai-consulting/${slug}/">`));
    assert.ok(html.includes('G-VQC3NV1XM8'));
    assert.ok(html.includes('data-founding="line"'));
    const questions = (html.match(/<details><summary>/g) || []).length;
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema['@type'], 'FAQPage');
    assert.equal(schema.mainEntity.length, questions);
  });

  test(`${slug}: the shared half is up to date`, () => {
    assert.equal(build(html), html, 'run npm run shared');
  });
}

test('no long dashes anywhere a prospect reads, and every sector page is in the sitemap', () => {
  const files = [...sectorPages(), ...fs.readdirSync(path.join(root, 'shared')).map(f => path.join(root, 'shared', f))];
  for (const f of files) assert.ok(!/[–—]/.test(fs.readFileSync(f, 'utf8')), f);
  const sitemap = read('sitemap.xml');
  for (const slug of Object.keys(MOCKUPS)) assert.ok(sitemap.includes(`https://quantai.com.au/ai-consulting/${slug}/`));
});
