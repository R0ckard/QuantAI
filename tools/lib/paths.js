import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const TOOLS_DIR = path.join(here, '..');
// ADMIN_CHECK_HOME lets the tests work in a scratch folder.
const home = process.env.ADMIN_CHECK_HOME || TOOLS_DIR;
export const DATA_DIR = path.join(home, 'data');
export const OUT_DIR = path.join(home, 'out');
export const SENT_LOG = path.join(DATA_DIR, 'sent.log');
export const TEMPLATE = path.join(TOOLS_DIR, 'templates', 'report.html');

for (const d of [DATA_DIR, OUT_DIR]) fs.mkdirSync(d, { recursive: true });

export const dataFile = id => path.join(DATA_DIR, `${id}.json`);
export const outJson = id => path.join(OUT_DIR, `${id}.json`);
export const outHtml = id => path.join(OUT_DIR, `${id}.html`);
export const outPdf = id => path.join(OUT_DIR, `${id}.pdf`);

export function loadRecord(id) {
  const f = dataFile(id);
  if (!fs.existsSync(f)) { console.error(`No submission ${id} in ${DATA_DIR}. Run npm run pull first.`); process.exit(2); }
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

// Accept a full id or an unambiguous prefix.
export function resolveId(arg) {
  if (!arg) { console.error('Which one? Pass the submission id (or the first few characters of it).'); process.exit(2); }
  if (fs.existsSync(dataFile(arg))) return arg;
  const hits = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f.startsWith(arg)).map(f => f.slice(0, -5));
  if (hits.length === 1) return hits[0];
  console.error(hits.length ? `More than one matches ${arg}: ${hits.join(', ')}` : `Nothing in ${DATA_DIR} starts with ${arg}.`);
  process.exit(2);
}
