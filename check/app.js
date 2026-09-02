// The Admin Load Check · interview flow, state and rendering.
// No secrets here. Talks to the worker (if configured) for the two adaptive
// follow ups and the submission. Everything else is local.

import { CONFIG } from './config.js';
import { SECTIONS, QUESTIONS, QUESTION_COUNT, byId, optionLabel, isValidAnswer } from './questions.js';
import { score, publicEstimate, formatAUD } from './model.js';

const CONTACT_IDS = ['1.1', '1.2', '1.3', '1.4', '1.5'];
const PROBE_IDS = QUESTIONS.filter(q => q.probe).map(q => q.id);

// ---------- screens ----------
const SCREENS = [{ type: 'intro' }, { type: 'contact' }];
for (const q of QUESTIONS) {
  if (CONTACT_IDS.includes(q.id)) continue;
  SCREENS.push({ type: 'question', id: q.id });
  if (q.probe) SCREENS.push({ type: 'probe', forId: q.id });
}
SCREENS.push({ type: 'submit' });
SCREENS.push({ type: 'results' });

// ---------- state ----------
const params = new URLSearchParams(location.search);
const clean = v => (v || '').toString().slice(0, 60).replace(/[^\w .-]/g, '');

let state = {
  sessionId: uuid(),
  src: clean(params.get('src')),
  ref: clean(params.get('ref')),
  screen: 0,
  answers: {},
  probes: {},         // '5.1': { question, answer, skipped, tried }
  probeCalls: 0,
  submitted: null,    // server response, or { stub: true }
};

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function load() {
  try {
    const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved && saved.answers && typeof saved.screen === 'number') {
      state = { ...state, ...saved, submitted: null };
      if (params.get('src')) state.src = clean(params.get('src'));
      if (params.get('ref')) state.ref = clean(params.get('ref'));
      if (state.screen >= SCREENS.length - 2) state.screen = SCREENS.length - 3; // never resume onto submit or results
    }
  } catch (e) { /* storage unavailable, carry on in memory */ }
}
function save() {
  if (state.submitted) return; // once it's gone, nothing goes back into storage
  try { localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({ ...state, submitted: null })); } catch (e) { /* ignore */ }
}
function clearSaved() {
  try { localStorage.removeItem(CONFIG.STORAGE_KEY); } catch (e) { /* ignore */ }
}

// ---------- helpers ----------
const $ = sel => document.querySelector(sel);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function answeredCount() {
  // Optional questions count once the screen they sit on has been passed.
  return QUESTIONS.filter(q => {
    const v = state.answers[q.id];
    if (q.optional) return q.id in state.answers;
    return v != null && v !== '' && isValidAnswer(q, v);
  }).length;
}
function questionNumber(id) { return QUESTIONS.findIndex(q => q.id === id) + 1; }
function firstOfSection(id) {
  const q = byId[id];
  return QUESTIONS.find(x => x.section === q.section).id === id; // section 1's banner sits on the contact screen
}
function firstName() {
  const n = (state.answers['1.1'] || '').trim();
  return n.split(/\s+/)[0] || '';
}

// ---------- rendering ----------
function render() {
  const s = SCREENS[state.screen];
  const root = $('#screen');
  const done = answeredCount();
  $('#count').textContent = s.type === 'question' ? `${questionNumber(s.id)} of ${QUESTION_COUNT}` : (s.type === 'contact' ? `1 of ${QUESTION_COUNT}` : '');
  $('#bar').style.width = `${Math.round((done / QUESTION_COUNT) * 100)}%`;
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  switch (s.type) {
    case 'intro': return renderIntro(root);
    case 'contact': return renderContact(root);
    case 'question': return renderQuestion(root, byId[s.id]);
    case 'probe': return renderProbe(root, s.forId);
    case 'submit': return renderSubmit(root);
    case 'results': return renderResults(root);
  }
}

function sectionBanner(sec) {
  return `<div class="section-banner">
    <p class="kick">Section ${sec.n} of ${SECTIONS.length}</p>
    <h2>${esc(sec.name)}</h2>
    <p class="meta">${sec.count} question${sec.count === 1 ? '' : 's'}</p>
    ${sec.note ? `<div class="note"><b>${esc(sec.note.split('. ')[0])}.</b> ${esc(sec.note.slice(sec.note.indexOf('. ') + 2))}</div>` : ''}
  </div>`;
}

function renderIntro(root) {
  root.innerHTML = `
    <p class="kick">Free · The Admin Load Check</p>
    <h1>You know the admin's heavy. This puts a number on it.</h1>
    <p class="lead">Twenty six questions about how the work actually gets done in your firm. Nearly all of them are one tap. You'll see your number on screen the moment you finish, and the written version lands inside two business days.</p>
    <div class="facts">
      <div><b>6 min</b><span>To answer. Most of it is one tap.</span></div>
      <div><b>2 days</b><span>To get your report back.</span></div>
      <div><b>$0</b><span>No obligation, no follow up call.</span></div>
    </div>
    <div class="intro-quote">There are no right answers here and nothing gets checked against you. The closer your answers are, the more useful your report is. Dave reads every one of these himself before it goes back to you.</div>
    <div class="actions"><span></span><button class="btn primary" id="next">Start the check</button></div>
    <p class="meta">Your answers are used to write your report and nothing else. Reply to the email that brings it and Dave will delete them.</p>`;
  $('#next').addEventListener('click', () => go(state.screen + 1));
}

function renderContact(root) {
  const sec = SECTIONS[0];
  const fields = CONTACT_IDS.map(id => {
    const q = byId[id];
    const type = q.type === 'email' ? 'email' : q.type === 'phone' ? 'tel' : 'text';
    return `<div class="field" data-id="${id}">
      <label for="f-${id}">${esc(q.label)}${q.optional ? ' <span>(optional)</span>' : ''}</label>
      <input type="${type}" id="f-${id}" name="${id}" autocomplete="${q.autocomplete || 'off'}" ${q.optional ? '' : 'required'} value="${esc(state.answers[id] || '')}" ${q.type === 'email' ? 'inputmode="email"' : ''} ${q.type === 'phone' ? 'inputmode="tel"' : ''}>
      ${q.helper ? `<p class="helper">${esc(q.helper)}</p>` : ''}
      <p class="err-inline" hidden></p>
    </div>`;
  }).join('');
  root.innerHTML = `${sectionBanner(sec)}
    <h1>First, who am I writing this for?</h1>
    <form id="contact" novalidate>${fields}
      <div class="actions"><button type="button" class="btn ghost" id="back">Back</button><button type="submit" class="btn primary">Next</button></div>
    </form>`;
  const form = $('#contact');
  form.addEventListener('input', e => { const id = e.target.name; if (id) { state.answers[id] = e.target.value; save(); } });
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    for (const id of CONTACT_IDS) {
      const q = byId[id];
      const wrap = form.querySelector(`.field[data-id="${id}"]`);
      const val = (state.answers[id] || '').trim();
      const valid = isValidAnswer(q, val);
      wrap.classList.toggle('invalid', !valid);
      const err = wrap.querySelector('.err-inline');
      err.hidden = valid;
      err.textContent = valid ? '' : (q.type === 'email' ? 'That doesn\'t look like an email address.' : 'I need this one.');
      if (!valid) ok = false;
    }
    if (ok) { state.answers['1.5'] = state.answers['1.5'] || ''; go(state.screen + 1); } else form.querySelector('.invalid input')?.focus();
  });
  $('#back').addEventListener('click', () => go(state.screen - 1));
  form.querySelector('input').focus({ preventScroll: true });
}

function renderQuestion(root, q) {
  const sec = SECTIONS[q.section - 1];
  const showBanner = firstOfSection(q.id);
  let body = '';
  if (q.type === 'single' || q.type === 'multi') {
    const multi = q.type === 'multi';
    const cur = state.answers[q.id];
    body = `<ul class="options" role="${multi ? 'group' : 'radiogroup'}" aria-label="${esc(q.label)}">` + q.options.map((o, i) => {
      const checked = multi ? (Array.isArray(cur) && cur.includes(o[0])) : cur === o[0];
      return `<li><button type="button" class="opt${multi ? ' multi' : ''}" role="${multi ? 'checkbox' : 'radio'}" aria-checked="${checked}" data-code="${esc(o[0])}"><span class="key">${i + 1 <= 9 ? i + 1 : ''}</span><span class="box"></span><span class="txt">${esc(o[1])}</span></button></li>`;
    }).join('') + '</ul>' + (multi ? '<p class="helper" style="margin-top:10px">Tick everything that applies.</p>' : '');
  } else if (q.type === 'long') {
    body = `<div class="field"><textarea id="ta" name="${q.id}" maxlength="2000" placeholder="A sentence or two is plenty.">${esc(state.answers[q.id] || '')}</textarea><p class="err-inline" hidden>I need a few words here, it's the most useful part of the report.</p></div>`;
  }
  root.innerHTML = `${showBanner ? sectionBanner(sec) : `<p class="kick">${esc(sec.name)}</p>`}
    <h1>${esc(q.label)}</h1>
    ${q.helper ? `<p class="helper">${esc(q.helper)}</p>` : ''}
    <div class="q-body">${body}</div>
    <div class="actions"><button type="button" class="btn ghost" id="back">Back</button>${q.type === 'single' ? '<button type="button" class="btn primary" id="next">Next</button>' : '<button type="button" class="btn primary" id="next">Next</button>'}</div>
    ${(q.type === 'single' || q.type === 'multi') ? '<p class="hint">Press 1 to 9 to pick an option, Enter to go on.</p>' : ''}`;

  $('#back').addEventListener('click', () => go(state.screen - 1));
  const next = $('#next');
  const setNext = () => { next.disabled = !isValidAnswer(q, state.answers[q.id]); };
  setNext();

  if (q.type === 'single') {
    root.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
      state.answers[q.id] = b.dataset.code; save();
      root.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-checked', x === b));
      setNext();
      setTimeout(() => { if (SCREENS[state.screen].id === q.id) go(state.screen + 1); }, 220);
    }));
  } else if (q.type === 'multi') {
    root.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
      let cur = Array.isArray(state.answers[q.id]) ? [...state.answers[q.id]] : [];
      const code = b.dataset.code;
      if (cur.includes(code)) cur = cur.filter(c => c !== code);
      else {
        if (q.exclusive && code === q.exclusive) cur = [code];
        else cur = cur.filter(c => c !== q.exclusive).concat(code);
      }
      state.answers[q.id] = cur; save();
      root.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-checked', cur.includes(x.dataset.code)));
      setNext();
    }));
  } else if (q.type === 'long') {
    const ta = $('#ta');
    ta.addEventListener('input', () => { state.answers[q.id] = ta.value; save(); setNext(); });
    ta.focus({ preventScroll: true });
  }
  next.addEventListener('click', () => {
    if (!isValidAnswer(q, state.answers[q.id])) { const e = root.querySelector('.err-inline'); if (e) e.hidden = false; return; }
    if (q.probe) startProbe(q.id);
    go(state.screen + 1);
  });
}

// ---------- adaptive follow ups ----------
function startProbe(id) {
  const p = state.probes[id] || {};
  if (p.tried && p.answerHash === hash(state.answers[id])) return; // same answer, don't ask again
  state.probes[id] = { question: null, answer: '', skipped: false, tried: true, answerHash: hash(state.answers[id]), pending: true };
  save();
  fetchFollowup(id).then(text => {
    const cur = state.probes[id];
    if (!cur || cur.answerHash !== hash(state.answers[id])) return;
    cur.pending = false; cur.question = text || null; save();
    if (SCREENS[state.screen].type === 'probe' && SCREENS[state.screen].forId === id) render();
  });
}
function hash(s) { let h = 0; for (const c of String(s || '')) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }

async function fetchFollowup(id) {
  if (!CONFIG.API_BASE || state.probeCalls >= 4) return null;
  state.probeCalls += 1; save();
  const prior = {};
  for (const q of QUESTIONS) if (q.options && state.answers[q.id] != null) prior[q.id] = state.answers[q.id];
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), CONFIG.FOLLOWUP_TIMEOUT_MS);
  try {
    const r = await fetch(`${CONFIG.API_BASE}/api/followup`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal,
      body: JSON.stringify({ sessionId: state.sessionId, questionId: id, answer: state.answers[id], priorAnswers: prior }),
    });
    if (!r.ok) return null;
    const j = await r.json();
    return typeof j.followup === 'string' && j.followup.trim() ? j.followup.trim().slice(0, 300) : null;
  } catch (e) { return null; } finally { clearTimeout(t); }
}

function renderProbe(root, forId) {
  const p = state.probes[forId];
  const q = byId[forId];
  if (!p || (!p.pending && !p.question)) { // nothing to ask, move on in the direction of travel
    go(state.screen + (state.lastDir || 1), true); return;
  }
  const sec = SECTIONS[q.section - 1];
  if (p.pending) {
    root.innerHTML = `<p class="kick">${esc(sec.name)}</p><h1>One sec.</h1><p class="lead"><span class="spinner"></span>Reading that back.</p>
      <div class="actions"><button type="button" class="btn ghost" id="back">Back</button><button type="button" class="btn link" id="skip">Skip this</button></div>`;
    $('#back').addEventListener('click', () => go(state.screen - 1));
    $('#skip').addEventListener('click', () => { p.pending = false; p.question = null; p.skipped = true; save(); go(state.screen + 1); });
    setTimeout(() => { if (p.pending && SCREENS[state.screen].forId === forId) { p.pending = false; p.question = null; save(); go(state.screen + 1); } }, CONFIG.FOLLOWUP_TIMEOUT_MS + 500);
    return;
  }
  root.innerHTML = `<p class="kick">${esc(sec.name)} · one more on that</p>
    <h1>${esc(p.question)}</h1>
    <div class="q-body"><div class="field"><textarea id="ta" maxlength="1000" placeholder="Optional. A line is enough.">${esc(p.answer || '')}</textarea></div></div>
    <div class="actions"><button type="button" class="btn ghost" id="back">Back</button><span><button type="button" class="btn link" id="skip">Skip</button> <button type="button" class="btn primary" id="next">Next</button></span></div>`;
  const ta = $('#ta');
  ta.addEventListener('input', () => { p.answer = ta.value; p.skipped = false; save(); });
  $('#back').addEventListener('click', () => go(state.screen - 1));
  $('#skip').addEventListener('click', () => { p.answer = ''; p.skipped = true; save(); go(state.screen + 1); });
  $('#next').addEventListener('click', () => { p.skipped = !(p.answer || '').trim(); save(); go(state.screen + 1); });
  ta.focus({ preventScroll: true });
}

// ---------- submit ----------
let turnstileToken = '';
function renderSubmit(root) {
  const missing = QUESTIONS.filter(q => !isValidAnswer(q, state.answers[q.id]));
  if (missing.length) {
    root.innerHTML = `<p class="kick">Nearly there</p><h1>A couple are missing.</h1><p class="lead">I can't build the number without these, so I've kept your place.</p>
      <ul class="options">${missing.map(q => `<li><button type="button" class="opt" data-go="${q.id}"><span class="txt">${esc(q.id)} · ${esc(q.label)}</span></button></li>`).join('')}</ul>
      <div class="actions"><button type="button" class="btn ghost" id="back">Back</button><span></span></div>`;
    root.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.go;
      const idx = CONTACT_IDS.includes(id) ? 1 : SCREENS.findIndex(s => s.type === 'question' && s.id === id);
      go(idx);
    }));
    $('#back').addEventListener('click', () => go(state.screen - 1));
    return;
  }
  const stub = !CONFIG.API_BASE;
  root.innerHTML = `<p class="kick">That's all ${QUESTION_COUNT}</p>
    <h1>Send it and see your number.</h1>
    <p class="lead">Your estimate comes up on the next screen straight away. The written version, checked by Dave, goes to <b>${esc(state.answers['1.4'])}</b> inside two business days.</p>
    <div id="ts" class="turnstile"></div>
    <div class="actions"><button type="button" class="btn ghost" id="back">Back</button><button type="button" class="btn primary" id="send">Send my answers</button></div>
    <p class="meta">Your answers are used to write your report and nothing else.</p>`;
  $('#back').addEventListener('click', () => go(state.screen - 1));
  if (!stub && CONFIG.TURNSTILE_SITE_KEY) mountTurnstile();
  $('#send').addEventListener('click', submit);
}

function mountTurnstile() {
  const mount = () => window.turnstile && window.turnstile.render('#ts', {
    sitekey: CONFIG.TURNSTILE_SITE_KEY, callback: t => { turnstileToken = t; }, 'expired-callback': () => { turnstileToken = ''; },
  });
  if (window.turnstile) return mount();
  if (!document.getElementById('ts-script')) {
    const s = document.createElement('script');
    s.id = 'ts-script'; s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; s.async = true; s.onload = mount;
    document.head.appendChild(s);
  }
}

function payload() {
  const probes = {};
  for (const id of PROBE_IDS) {
    const p = state.probes[id];
    if (p && p.question) probes[id] = { question: p.question, answer: p.skipped ? '' : (p.answer || '') };
  }
  return { sessionId: state.sessionId, submittedAt: new Date().toISOString(), src: state.src, ref: state.ref, answers: state.answers, probes, turnstileToken };
}

async function submit() {
  const btn = $('#send');
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>Sending';
  if (!CONFIG.API_BASE) { state.submitted = { stub: true }; clearSaved(); go(state.screen + 1); return; }
  if (CONFIG.TURNSTILE_SITE_KEY && !turnstileToken) {
    btn.disabled = false; btn.textContent = 'Send my answers';
    showError('The spam check hasn\'t finished. Give it a second and press send again.'); return;
  }
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const r = await fetch(`${CONFIG.API_BASE}/api/submit`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload()), signal: ctrl.signal });
    clearTimeout(t);
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) throw new Error(j.error || `HTTP ${r.status}`);
    state.submitted = j; clearSaved(); go(state.screen + 1);
  } catch (e) {
    state.submitted = { failed: true, error: String(e.message || e) };
    go(state.screen + 1);
  }
}

function showError(msg) {
  let el = $('#err');
  if (!el) { el = document.createElement('div'); el.id = 'err'; el.className = 'error'; $('#screen .actions').after(el); }
  el.innerHTML = `<p>${esc(msg)}</p>`;
}

// ---------- results ----------
function renderResults(root) {
  let est;
  try { est = publicEstimate(score(state.answers)); }
  catch (e) { est = null; }
  const server = state.submitted && state.submitted.estimate;
  if (server && est && (server.recoverableLow !== est.recoverableLow || server.recoverableHigh !== est.recoverableHigh)) {
    console.warn('Estimate mismatch between page and worker', est, server);
  }
  const e = server || est;
  const name = firstName();
  const failed = state.submitted && state.submitted.failed;
  const stub = state.submitted && state.submitted.stub;
  const mail = mailtoLink();
  root.innerHTML = `<p class="kick">Your number${name ? ', ' + esc(name) : ''}</p>
    <h1>What the repeat work is costing ${esc(state.answers['1.2'] || 'the firm')}.</h1>
    ${e ? `<div class="figure"><p class="label">Recoverable, a year</p><p class="big">${formatAUD(e.recoverableLow)} to ${formatAUD(e.recoverableHigh)}</p><p class="sub">Said in hours, that's ${e.hoursLow} to ${e.hoursHigh} a year.</p></div>
    <p class="line">The part carrying most of it is <b>${esc(e.gapLabel.toLowerCase())}</b>.</p>` : '<p class="line">I couldn\'t build the number from what came through, so I\'ll work it out by hand for the written version.</p>'}
    ${failed ? `<div class="error"><p><b>One snag.</b> Your answers didn't reach Dave, so nothing's on its way yet. Easiest fix: the button below opens an email with your answers already in it. Hit send and he's got them.</p><p><a class="btn primary" href="${mail}">Email my answers to Dave</a></p><p>Or write to <a href="mailto:${CONFIG.CONTACT_EMAIL}">${CONFIG.CONTACT_EMAIL}</a> and he'll sort it.</p></div>`
      : stub ? `<div class="panel"><p><b>One more tap.</b> The button below opens an email with your answers already in it. Hit send and they're with Dave.</p><p><a class="btn primary" href="${mail}">Email my answers to Dave</a></p></div>`
      : `<div class="panel"><p><b>The written version is on its way.</b> Dave goes through the answers and checks the report himself before it goes anywhere, so give him two business days rather than two minutes. It comes from ${CONFIG.CONTACT_EMAIL} with a PDF attached.</p><p>If anything's changed since you filled it in, reply to the confirmation email and it'll reach him.</p></div>`}
    <p class="meta">This is an estimate built from the bands you picked, using conservative midpoints, and it's deliberately shown as a range. It tells you the scale. The written version says where the figure comes from and what it doesn't cover.</p>
    <p class="meta"><a href="/">Back to quantai.com.au</a> · <a href="#" id="again">Start again</a></p>`;
  $('#again').addEventListener('click', ev => { ev.preventDefault(); clearSaved(); location.href = location.pathname; });
}

function mailtoLink() {
  const lines = ['Hi Dave,', '', 'Here are my Admin Load Check answers.', ''];
  for (const q of QUESTIONS) {
    const v = state.answers[q.id];
    const text = Array.isArray(v) ? v.map(c => optionLabel(q.id, c)).join('; ') : (q.options ? optionLabel(q.id, v) : (v || ''));
    lines.push(`${q.id} ${q.label}`, `  ${text}`);
    const p = state.probes[q.id];
    if (p && p.question) lines.push(`  Follow up: ${p.question}`, `  ${p.answer || '(skipped)'}`);
  }
  lines.push('', `Reference ${state.sessionId}${state.src ? ' · via ' + state.src + (state.ref ? ' (' + state.ref + ')' : '') : ''}`);
  return `mailto:${CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent('Admin Load Check · ' + (state.answers['1.2'] || ''))}&body=${encodeURIComponent(lines.join('\n'))}`;
}

// ---------- navigation ----------
function go(n, silent) {
  const dir = n >= state.screen ? 1 : -1;
  state.lastDir = dir;
  state.screen = Math.max(0, Math.min(SCREENS.length - 1, n));
  if (!silent) save();
  render();
}

document.addEventListener('keydown', e => {
  const s = SCREENS[state.screen];
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'textarea' || tag === 'input') {
    if (e.key === 'Enter' && tag === 'input') return; // form submit handles it
    return;
  }
  if (s.type === 'question' && /^[1-9]$/.test(e.key)) {
    const opts = document.querySelectorAll('.opt');
    const b = opts[Number(e.key) - 1];
    if (b) { e.preventDefault(); b.click(); }
  } else if (e.key === 'Enter') {
    const next = document.getElementById('next') || document.getElementById('send');
    if (next && !next.disabled) { e.preventDefault(); next.click(); }
  }
});

load();
render();
