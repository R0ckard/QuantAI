// Passing a submission on to the pipeline board (Phase 1, slice 2).
//
// The worker keeps its own copy in KV and sends its own emails exactly as
// before. This is one more job on top: post the same submission to the GTM
// engine, which files it as a contact and a deal. If the engine is down or
// slow the check still works and nothing is lost: the record is marked
// `engine: 'failed'` and can be passed on again (POST /api/forward).
//
// The engine never recomputes anything. It stores the scoring this worker
// did with check/model.js, so the two can never disagree.

import { optionLabel } from '../../check/questions.js';
import { publicEstimate } from '../../check/model.js';

// Addresses that cannot receive mail (RFC 2606). A submission from one is a
// test: it is filed as a test deal, which can be cleared from the board, and
// no confirmation email is sent to it.
const RESERVED = /\.(example|test|invalid)$/i;
export const isReservedAddress = email => RESERVED.test(String(email || '').trim());

// Dave trying the check with his own address is a test too, so his own runs
// never sit on the board as real deals he cannot delete.
export function isTestSubmission(answers, env = {}) {
  const email = String(answers['1.4'] || '').trim().toLowerCase();
  if (isReservedAddress(email)) return true;
  return !!env.ALERT_TO && email === String(env.ALERT_TO).trim().toLowerCase();
}

export function enginePayload(record) {
  const a = record.answers;
  const q = record.qualification;
  const consent = record.consent && record.consent.notes
    ? { notes: true, wording: record.consent.wording }
    : { notes: false };
  return {
    id: record.id,
    receivedAt: record.receivedAt,
    isTest: !!record.isTest,
    contact: {
      name: a['1.1'], email: a['1.4'], company: a['1.2'], role: a['1.3'], phone: a['1.5'] || '',
      sector: optionLabel('1.6', a['1.6']), staffBand: optionLabel('1.7', a['1.7']),
    },
    answers: a,
    probes: record.probes || {},
    scored: record.scored,
    qualification: { ...q, total: q.total, tier: q.tier, routing: q.routing, override: q.override, overrideLine: q.overrideLine },
    estimate: publicEstimate(record.scored),
    consent,
    src: record.src || '',
    ref: record.ref || '',
  };
}

// 'sent', 'failed' or 'skipped' (not configured). Never throws: a submission
// must not fail because the board could not be reached.
export async function forwardToEngine(env, record) {
  if (!env.ENGINE_URL || !env.ENGINE_TOKEN) return 'skipped';
  try {
    const r = await fetch(env.ENGINE_URL, {
      method: 'POST',
      headers: { authorization: `Bearer ${env.ENGINE_TOKEN}`, 'content-type': 'application/json' },
      body: JSON.stringify(enginePayload(record)),
      signal: AbortSignal.timeout(9000),
    });
    if (!r.ok) { console.warn(`engine forward refused: ${r.status}`); return 'failed'; }
    return 'sent';
  } catch (e) {
    console.warn(`engine forward failed: ${e && e.name}`);
    return 'failed';
  }
}
