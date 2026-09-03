// npm run pull   fetch submissions not yet processed into tools/data/
import fs from 'node:fs';
import { ENV, need } from './lib/env.js';
import { DATA_DIR, dataFile } from './lib/paths.js';

need('WORKER_URL', 'PULL_TOKEN');
const all = process.argv.includes('--all');

const r = await fetch(`${ENV.WORKER_URL}/api/pull${all ? '?all=1' : ''}`, { headers: { authorization: `Bearer ${ENV.PULL_TOKEN}` } });
if (!r.ok) { console.error(`Worker said ${r.status}. Check WORKER_URL and PULL_TOKEN.`); process.exit(1); }
const { submissions } = await r.json();

let fresh = 0;
for (const s of submissions) {
  const f = dataFile(s.id);
  if (!fs.existsSync(f)) { fs.writeFileSync(f, JSON.stringify(s, null, 2)); fresh += 1; }
}
console.log(`${submissions.length} waiting, ${fresh} new, saved in ${DATA_DIR}\n`);
for (const s of submissions) {
  const q = s.qualification;
  const flag = q.override ? ' OVERRIDE' : '';
  console.log(`${s.id.slice(0, 8)}  ${s.receivedAt.slice(0, 16).replace('T', ' ')}  ${String(q.total).padStart(2)}/25 ${q.tier.padEnd(9)}${flag}  ${s.answers['1.2']} (${s.answers['1.1']})`);
}
if (submissions.length) console.log('\nNext: npm run draft <id>');
