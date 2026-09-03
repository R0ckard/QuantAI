// npm run render <id> [--no-open]   fill is already done; this prints the PDF.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolveId, outHtml, outPdf } from './lib/paths.js';

const args = process.argv.slice(2);
const id = resolveId(args.find(a => !a.startsWith('--')));
const html = outHtml(id);
if (!fs.existsSync(html)) { console.error(`No ${html}. Run npm run draft ${id.slice(0, 8)} first.`); process.exit(2); }

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!fs.existsSync(CHROME)) { console.error(`Chrome not found at ${CHROME}. Set CHROME_PATH.`); process.exit(2); }
const pdf = outPdf(id);
if (fs.existsSync(pdf)) fs.unlinkSync(pdf);

const r = spawnSync(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--no-pdf-header-footer', '--virtual-time-budget=10000',
  `--print-to-pdf=${pdf}`, `file://${html}`,
], { encoding: 'utf8', timeout: 90000 });

if (!fs.existsSync(pdf) || fs.statSync(pdf).size < 5000) {
  console.error(`Chrome did not produce a PDF.\n${r.stderr || ''}`);
  process.exit(1);
}
console.log(`PDF: ${pdf} (${Math.round(fs.statSync(pdf).size / 1024)} KB)`);
if (!args.includes('--no-open')) spawnSync('open', [pdf]);
console.log(`Read it. If it's right: npm run send ${id.slice(0, 8)} -- --reviewed`);
