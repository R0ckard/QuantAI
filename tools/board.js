// npm run board -- fixtures   file four made-up submissions on the pipeline board, one per routing
// npm run board -- <id>       pass a real stored submission to the board again
//
// The fixtures go straight to the engine, as test deals (clear them from the
// board when done). A real submission goes back through the worker, which
// holds the stored copy and records whether the board took it.
import { ENV, need } from './lib/env.js';
import { enginePayload } from '../worker/src/forward.js';
import { FIXTURES, fixtureRecord } from './lib/fixtures.js';

const arg = process.argv[2];
if (!arg) { console.error('Usage: npm run board -- fixtures   or   npm run board -- <submission id>'); process.exit(2); }

if (arg === 'fixtures') {
  need('ENGINE_URL', 'ENGINE_TOKEN');
  let failed = 0;
  for (const f of FIXTURES) {
    const rec = fixtureRecord(f);
    const r = await fetch(ENV.ENGINE_URL, { method: 'POST', headers: { authorization: `Bearer ${ENV.ENGINE_TOKEN}`, 'content-type': 'application/json' }, body: JSON.stringify(enginePayload(rec)) });
    const j = await r.json().catch(() => ({}));
    const q = rec.qualification;
    const what = r.ok ? (j.created ? 'filed' : 'already there') : `REFUSED ${r.status} ${j.error || ''}`;
    if (!r.ok) failed += 1;
    console.log(`${what.padEnd(14)} ${String(q.total).padStart(2)}/25 ${q.tier.padEnd(9)}${q.override ? ' OVERRIDE' : '         '}  ${f.answers['1.2']}`);
  }
  console.log(failed ? '\nSome were refused. Check ENGINE_URL and ENGINE_TOKEN in tools/.env.' : '\nOpen /pipeline on the dashboard: four test deals in Check submitted. Clear test deals when done.');
  process.exit(failed ? 1 : 0);
}

need('WORKER_URL', 'PULL_TOKEN');
const r = await fetch(`${ENV.WORKER_URL}/api/forward`, { method: 'POST', headers: { authorization: `Bearer ${ENV.PULL_TOKEN}`, 'content-type': 'application/json' }, body: JSON.stringify({ id: arg }) });
const j = await r.json().catch(() => ({}));
if (!r.ok) { console.error(`Worker said ${r.status} ${j.error || ''}. Use the full id from tools/data/.`); process.exit(1); }
console.log(j.engine === 'sent' ? 'On the board.' : `Not on the board: ${j.engine}. If it says skipped, the worker has no ENGINE_TOKEN yet.`);
process.exit(j.engine === 'sent' ? 0 : 1);
