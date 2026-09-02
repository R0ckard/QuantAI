// The Admin Load Check · scoring model v1.0
// SINGLE SOURCE OF TRUTH. Pure functions, no I/O. Used by the interview page
// for the instant estimate, by the worker for scoring, and by the CLI for the
// report. Restated from admin-load-scoring.xlsx and BRIEF-for-Code.md.

// The only numbers anyone should ever need to argue with.
export const CONSTANTS = Object.freeze({
  WEEKS: 46,
  RECOVERABLE_LOW: 0.20,
  RECOVERABLE_HIGH: 0.40,
});

// Band midpoints, keyed by the answer code from questions.js.
export const BANDS = Object.freeze({
  adminHours:  { H3: 3, H7: 7.5, H15: 15, H30: 30, H60: 60, H100: 100 },
  hourlyCost:  { C35: 35, C50: 50, C75: 75, C110: 110, C165: 165, C230: 230 },
  billedRate:  { B_NA: 0, B120: 120, B200: 200, B325: 325, B500: 500, B700: 700 },
  docMinutes:  { T10: 10, T22: 22, T45: 45, T90: 90, T150: 150 },
  docsPerWeek: { N3: 3, N12: 12, N35: 35, N75: 75, N130: 130 },
  duplication: { D_HIGH: 0.25, D_MED: 0.15, D_LOW: 0.05, D_NONE: 0 },
  staff:       { S1: 1, S2: 3.5, S3: 10, S4: 33, S5: 75, S6: 130 },
});

// Eight work families with fixed automatability weights. Order matters: on a
// tied score the first one wins, matching the workbook's MATCH.
export const FAMILIES = Object.freeze([
  { key: 'CHASE',  label: 'Chasing people for information',          weight: 0.70 },
  { key: 'REKEY',  label: 'Typing the same thing into two systems',   weight: 0.90 },
  { key: 'DOCS',   label: 'Documents that follow the same shape',     weight: 0.80 },
  { key: 'STATUS', label: 'Internal status updates and reporting',    weight: 0.80 },
  { key: 'SCHED',  label: 'Scheduling and coordination',              weight: 0.60 },
  { key: 'BILL',   label: 'Invoicing and billing write ups',          weight: 0.70 },
  { key: 'TRIAGE', label: 'Sorting and triaging what comes in',       weight: 0.70 },
  { key: 'COMPL',  label: 'Compliance records and file notes',        weight: 0.50 },
]);

// Excel MROUND for positive numbers: nearest multiple, halves round up.
export function roundTo(value, multiple) {
  return Math.round(value / multiple) * multiple;
}

function band(table, code, name) {
  if (!(code in table)) throw new Error(`Unknown ${name} code: ${code}`);
  return table[code];
}

// First pass split of the hours across the eight families, from the ticks on
// 2.1 and 3.1. Every tick on 2.1 that maps to a family is one unit. Every tick
// on 3.1 (other than "None of these") folds into the documents family as one
// unit. "Something else" carries nothing. If nothing maps, equal across all
// eight. Dave overrides this in the CLI before the report is drafted.
export function deriveSplit(answers) {
  const units = Object.fromEntries(FAMILIES.map(f => [f.key, 0]));
  const keys = new Set(FAMILIES.map(f => f.key));
  for (const code of answers['2.1'] || []) if (keys.has(code)) units[code] += 1;
  for (const code of answers['3.1'] || []) if (code !== 'DOC_NONE') units.DOCS += 1;
  const total = Object.values(units).reduce((a, b) => a + b, 0);
  if (total === 0) return Object.fromEntries(FAMILIES.map(f => [f.key, 1 / FAMILIES.length]));
  return Object.fromEntries(FAMILIES.map(f => [f.key, units[f.key] / total]));
}

export function splitTotalsToOne(split) {
  const sum = FAMILIES.reduce((a, f) => a + (split[f.key] || 0), 0);
  return Math.abs(sum - 1) < 1e-6;
}

// The calculation. `split` is optional; when absent it is derived.
export function score(answers, split) {
  const { WEEKS, RECOVERABLE_LOW, RECOVERABLE_HIGH } = CONSTANTS;
  const adminHours = band(BANDS.adminHours, answers['2.2'], 'admin hours');
  const hourlyCost = band(BANDS.hourlyCost, answers['4.1'], 'hourly cost');
  const billedRate = band(BANDS.billedRate, answers['4.2'], 'billed rate');
  const docMinutes = band(BANDS.docMinutes, answers['3.2'], 'document minutes');
  const docsPerWeek = band(BANDS.docsPerWeek, answers['3.3'], 'documents a week');
  const duplicationFactor = band(BANDS.duplication, answers['2.4'], 'duplication');

  const adminCost = adminHours * hourlyCost * WEEKS;
  const docCost = docsPerWeek * (docMinutes / 60) * hourlyCost * WEEKS;
  const inputsAgree = docCost <= adminCost;
  const total = Math.max(adminCost, docCost);
  const duplicated = total * duplicationFactor;

  const recoverableLow = roundTo(total * RECOVERABLE_LOW, 1000);
  const recoverableHigh = roundTo(total * RECOVERABLE_HIGH, 1000);
  const hoursLow = roundTo(adminHours * WEEKS * RECOVERABLE_LOW, 10);
  const hoursHigh = roundTo(adminHours * WEEKS * RECOVERABLE_HIGH, 10);
  const billedUpperBound = billedRate === 0 ? null : roundTo(adminHours * WEEKS * billedRate, 1000);

  const useSplit = split || deriveSplit(answers);
  if (!splitTotalsToOne(useSplit)) throw new Error('Family split does not total 100%');
  const families = FAMILIES.map(f => {
    const share = useSplit[f.key] || 0;
    const cost = total * share;
    return { key: f.key, label: f.label, weight: f.weight, share, cost, score: cost * f.weight };
  });
  let gap = families[0];
  for (const f of families) if (f.score > gap.score) gap = f;

  return {
    inputs: { adminHours, hourlyCost, billedRate, docMinutes, docsPerWeek, duplicationFactor },
    adminCost, docCost, inputsAgree, total, duplicated,
    recoverableLow, recoverableHigh, hoursLow, hoursHigh,
    billedUpperBound,
    split: useSplit, splitDerived: !split,
    families,
    gap: { key: gap.key, label: gap.label, cost: gap.cost, costRounded: roundTo(gap.cost, 1000) },
    duplicatedRounded: roundTo(duplicated, 1000),
  };
}

// Qualification, out of 25. Server side and CLI only. Never sent to the
// browser and never printed in the report.
export const QUALIFY_POINTS = Object.freeze({
  size:     { S1: 0, S2: 1, S3: 3, S4: 4, S5: 3, S6: 2 },
  hourlyCost: { C35: 0, C50: 1, C75: 2, C110: 3, C165: 3, C230: 3 },
  intent:   { Q_HOT: 4, Q_WARM: 3, Q_COOL: 1, Q_COLD: 0 },
  deciders: { DM_1: 3, DM_2: 2, DM_3: 1, DM_4: 0 },
  prior:    { P_NONE: 1, P_SW: 2, P_HIRE: 2, P_CONS: 2, P_MULTI: 3 },
  slippage: { SL_NONE: 0, SL_OCC: 1, SL_MON: 2, SL_WK: 3, SL_CON: 4 },
});

export function loadSizePoints(total) {
  if (total >= 100000) return 4;
  if (total >= 50000) return 3;
  if (total >= 25000) return 2;
  if (total >= 10000) return 1;
  return 0;
}

export function qualify(answers, scored) {
  const s = scored || score(answers);
  const points = {
    size: band(QUALIFY_POINTS.size, answers['1.7'], 'staff'),
    hourlyCost: band(QUALIFY_POINTS.hourlyCost, answers['4.1'], 'hourly cost'),
    intent: band(QUALIFY_POINTS.intent, answers['5.2'], 'intent'),
    deciders: band(QUALIFY_POINTS.deciders, answers['5.3'], 'deciders'),
    prior: band(QUALIFY_POINTS.prior, answers['5.4'], 'prior'),
    slippage: band(QUALIFY_POINTS.slippage, answers['4.4'], 'slippage'),
    loadSize: loadSizePoints(s.total),
  };
  const total = Object.values(points).reduce((a, b) => a + b, 0);
  let tier, routing;
  if (total >= 15) { tier = 'full_land'; routing = 'Write the full report. Land the $995 assessment in it.'; }
  else if (total >= 9) { tier = 'full_hold'; routing = 'Write the full report. Offer the 30 minutes, hold the price for the call.'; }
  else { tier = 'short'; routing = 'Send the short version and offer the call. Do not spend an hour on this one.'; }
  const override = answers['1.7'] === 'S1' || answers['1.7'] === 'S2';
  const overrideLine = override
    ? 'Sole trader or very small. The $995 does not fit. Offer the call, and the $295 first automation only if they have already named the problem.'
    : 'No override.';
  return { points, total, tier, routing, override, overrideLine };
}

// The part of the estimate the browser is allowed to show. Nothing else
// leaves the model for the instant results screen.
export function publicEstimate(scored) {
  return {
    recoverableLow: scored.recoverableLow,
    recoverableHigh: scored.recoverableHigh,
    hoursLow: scored.hoursLow,
    hoursHigh: scored.hoursHigh,
    gapKey: scored.gap.key,
    gapLabel: scored.gap.label,
  };
}

export function formatAUD(n) {
  return '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
