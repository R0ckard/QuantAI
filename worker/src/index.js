// The Admin Load Check · Cloudflare Worker
//
// POST /api/followup   one adaptive follow up on 5.1 or 6.1, fails soft to null
// POST /api/submit     validate, verify Turnstile, score, store in KV, email
// GET  /api/pull       bearer token, returns submissions not yet processed
// POST /api/mark       bearer token, marks one processed
// GET  /api/health
//
// Rules this file keeps: no secret leaves the worker, no answer or email
// address goes into a URL or a log line, the model is imported from the
// page's copy so the two numbers can never disagree.

import Anthropic from '@anthropic-ai/sdk';
import { QUESTIONS, byId, isValidAnswer, optionLabel } from '../../check/questions.js';
import { score, qualify, publicEstimate, formatAUD } from '../../check/model.js';
import { MODELS, PROBE_SYSTEM, probeMessages, cleanProbe } from './ai.js';
import { confirmationEmail, alertEmail } from './emails.js';

const PROBE_IDS = QUESTIONS.filter(q => q.probe).map(q => q.id);
const LIMITS = Object.freeze({
  probesPerSession: 4,
  probesPerIpPerHour: 30,
  bodyBytes: 60000,
  sessionMemoryDays: 30,
});

export default {
  async fetch(request, env, ctx) { return handle(request, env, ctx); },
};

class HttpError extends Error {
  constructor(status, code) { super(code); this.status = status; }
}

export async function handle(request, env, ctx) {
  const url = new URL(request.url);
  const cors = corsHeaders(request.headers.get('Origin') || '', env);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  const route = `${request.method} ${url.pathname}`;
  try {
    let body;
    switch (route) {
      case 'GET /api/health': body = { ok: true }; break;
      case 'POST /api/followup': body = await followup(request, env); break;
      case 'POST /api/submit': body = await submit(request, env, ctx); break;
      case 'GET /api/pull': requireToken(request, env); body = await pull(env, url); break;
      case 'POST /api/mark': requireToken(request, env); body = await mark(request, env); break;
      default: throw new HttpError(404, 'not_found');
    }
    return json(body, 200, cors);
  } catch (e) {
    if (e instanceof HttpError) return json({ ok: false, error: e.message }, e.status, cors);
    console.error(`${route} failed: ${e && e.name}`);
    return json({ ok: false, error: 'server_error' }, 500, cors);
  }
}

// ---------- plumbing ----------
function corsHeaders(origin, env) {
  const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const h = {
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type, authorization',
    'access-control-max-age': '86400',
    'vary': 'Origin',
  };
  if (origin && allowed.includes(origin)) h['access-control-allow-origin'] = origin;
  return h;
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } });
}

async function readJson(request) {
  const text = await request.text();
  if (text.length > LIMITS.bodyBytes) throw new HttpError(413, 'too_large');
  try { return JSON.parse(text); } catch (e) { throw new HttpError(400, 'bad_json'); }
}

function requireToken(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!env.PULL_TOKEN || !token || !timingSafeEqual(token, env.PULL_TOKEN)) throw new HttpError(401, 'unauthorised');
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const isSessionId = s => typeof s === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
const cleanTag = v => String(v || '').slice(0, 60).replace(/[^\w .-]/g, '');

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Approximate counter in KV. Returns false once the limit is reached.
async function underLimit(env, key, limit, ttl) {
  const cur = Number(await env.SUBMISSIONS.get(key)) || 0;
  if (cur >= limit) return false;
  await env.SUBMISSIONS.put(key, String(cur + 1), { expirationTtl: ttl });
  return true;
}

// ---------- /api/followup ----------
async function followup(request, env) {
  const b = await readJson(request);
  if (!isSessionId(b.sessionId)) throw new HttpError(400, 'bad_session');
  if (!PROBE_IDS.includes(b.questionId)) throw new HttpError(400, 'bad_question');
  const answer = typeof b.answer === 'string' ? b.answer.trim().slice(0, 2000) : '';
  if (!answer) return { followup: null };

  if (!env.ANTHROPIC_API_KEY) return { followup: null };
  const ip = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const okSession = await underLimit(env, `rl:s:${b.sessionId}`, LIMITS.probesPerSession, 6 * 3600);
  if (!okSession) return { followup: null };
  const okIp = await underLimit(env, `rl:ip:${await sha256(ip)}`, LIMITS.probesPerIpPerHour, 3600);
  if (!okIp) return { followup: null };

  // Prior answers arrive as codes; turn them into the words they picked.
  const prior = {};
  for (const [id, v] of Object.entries(b.priorAnswers || {})) {
    const q = byId[id];
    if (!q || !q.options || !isValidAnswer(q, v)) continue;
    prior[q.label] = Array.isArray(v) ? v.map(c => optionLabel(id, c)) : optionLabel(id, v);
  }

  try {
    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 0, timeout: 8000, fetch: (...a) => globalThis.fetch(...a) });
    const res = await client.messages.create({
      model: MODELS.probe,
      max_tokens: 200,
      system: PROBE_SYSTEM,
      messages: probeMessages({ questionLabel: byId[b.questionId].label, answer, priorAnswers: prior }),
    });
    if (res.stop_reason === 'refusal') return { followup: null };
    const text = res.content.filter(c => c.type === 'text').map(c => c.text).join(' ');
    return { followup: cleanProbe(text) };
  } catch (e) {
    console.warn(`followup soft fail: ${e && e.name}`);
    return { followup: null };
  }
}

// ---------- /api/submit ----------
async function submit(request, env, ctx) {
  const b = await readJson(request);
  if (!isSessionId(b.sessionId)) throw new HttpError(400, 'bad_session');

  // Same session twice (a retry after a slow network) returns the first result.
  const seen = await env.SUBMISSIONS.get(`sess:${b.sessionId}`, 'json');
  if (seen) return { ok: true, id: seen.id, estimate: seen.estimate, duplicate: true };

  await verifyTurnstile(env, b.turnstileToken, request.headers.get('CF-Connecting-IP'));

  const answers = {};
  for (const q of QUESTIONS) {
    let v = (b.answers || {})[q.id];
    if (typeof v === 'string') v = v.trim();
    if (Array.isArray(v)) v = v.filter(x => typeof x === 'string');
    if (!isValidAnswer(q, v)) throw new HttpError(400, `invalid_answer:${q.id}`);
    answers[q.id] = v == null ? '' : v;
  }
  const probes = {};
  for (const id of PROBE_IDS) {
    const p = (b.probes || {})[id];
    if (p && typeof p.question === 'string' && p.question.trim()) {
      probes[id] = { question: p.question.trim().slice(0, 300), answer: typeof p.answer === 'string' ? p.answer.trim().slice(0, 1000) : '' };
    }
  }

  const scored = score(answers);
  const qualification = qualify(answers, scored);
  const estimate = publicEstimate(scored);
  const id = crypto.randomUUID();
  const record = {
    id, sessionId: b.sessionId,
    receivedAt: new Date().toISOString(),
    submittedAt: typeof b.submittedAt === 'string' ? b.submittedAt.slice(0, 40) : '',
    src: cleanTag(b.src), ref: cleanTag(b.ref),
    answers, probes, scored, qualification,
    processed: false, processedAt: null,
    emails: { confirmation: 'skipped', alert: 'skipped' },
  };

  if (env.RESEND_API_KEY) {
    const conf = confirmationEmail({ name: answers['1.1'] });
    const alert = alertEmail({ id, answers, probes, scored, qualification, estimate, src: record.src, ref: record.ref, fmt: formatAUD });
    const [c, a] = await Promise.allSettled([
      sendEmail(env, { to: answers['1.4'], subject: conf.subject, text: conf.text, replyTo: env.REPLY_TO }),
      sendEmail(env, { to: env.ALERT_TO, subject: alert.subject, text: alert.text, replyTo: answers['1.4'] }),
    ]);
    record.emails.confirmation = c.status === 'fulfilled' ? 'sent' : 'failed';
    record.emails.alert = a.status === 'fulfilled' ? 'sent' : 'failed';
  }

  await env.SUBMISSIONS.put(`sub:${id}`, JSON.stringify(record), {
    metadata: { processed: false, firm: answers['1.2'].slice(0, 80), receivedAt: record.receivedAt, score: qualification.total },
  });
  await env.SUBMISSIONS.put(`sess:${b.sessionId}`, JSON.stringify({ id, estimate }), { expirationTtl: LIMITS.sessionMemoryDays * 86400 });
  console.log(`submit stored ${id} emails=${record.emails.confirmation}/${record.emails.alert}`);
  return { ok: true, id, estimate };
}

async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return; // not configured, nothing to check against
  if (!token || typeof token !== 'string') throw new HttpError(403, 'turnstile_missing');
  const form = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
  if (ip) form.set('remoteip', ip);
  let ok = false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form, signal: AbortSignal.timeout(8000) });
    const j = await r.json();
    ok = !!j.success;
  } catch (e) { ok = false; }
  if (!ok) throw new HttpError(403, 'turnstile_failed');
}

async function sendEmail(env, { to, subject, text, replyTo }) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.RESEND_FROM, to: [to], reply_to: replyTo || undefined, subject, text }),
    signal: AbortSignal.timeout(10000),
  });
  if (!r.ok) throw new Error(`resend ${r.status}`);
  return r.json();
}

// ---------- /api/pull and /api/mark ----------
async function pull(env, url) {
  const all = url.searchParams.get('all') === '1';
  const keys = [];
  let cursor;
  do {
    const page = await env.SUBMISSIONS.list({ prefix: 'sub:', cursor });
    for (const k of page.keys) if (all || !(k.metadata && k.metadata.processed)) keys.push(k.name);
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor && keys.length < 200);
  const submissions = [];
  for (const name of keys.slice(0, 50)) {
    const rec = await env.SUBMISSIONS.get(name, 'json');
    if (rec) submissions.push(rec);
  }
  submissions.sort((a, b) => a.receivedAt.localeCompare(b.receivedAt));
  return { ok: true, count: submissions.length, submissions };
}

async function mark(request, env) {
  const b = await readJson(request);
  if (!isSessionId(b.id)) throw new HttpError(400, 'bad_id');
  const rec = await env.SUBMISSIONS.get(`sub:${b.id}`, 'json');
  if (!rec) throw new HttpError(404, 'not_found');
  rec.processed = true;
  rec.processedAt = new Date().toISOString();
  await env.SUBMISSIONS.put(`sub:${b.id}`, JSON.stringify(rec), {
    metadata: { processed: true, firm: rec.answers['1.2'].slice(0, 80), receivedAt: rec.receivedAt, score: rec.qualification.total },
  });
  return { ok: true, id: b.id };
}
