// npm run shared            rewrites the shared blocks on the homepage and every sector page
// npm run shared -- --check  exits 1 if any page has drifted (the test runs this)
//
// Sector pages (ai-consulting/<sector>/index.html) are a sector-specific top
// half on one shared bottom half (parity row G2). GitHub Pages serves the
// repo as committed, with no build step, so the shared half is copied into
// each page here, before Dave commits, and the committed HTML stays the
// served HTML. A block is the text between
//   <!-- shared:NAME -->   and   <!-- /shared:NAME -->
// and comes from shared/NAME.html. The page's FAQPage schema is rebuilt from
// the questions the page actually shows, between <!-- faq-schema --> markers,
// so the schema can never say something the page doesn't.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

export function sectorPages() {
  const dir = path.join(root, 'ai-consulting');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .map(d => path.join(dir, d, 'index.html'))
    .filter(f => fs.existsSync(f));
}

// Every page carrying shared blocks: the sector pages and the homepage.
export function sharedPages() {
  return [path.join(root, 'index.html'), ...sectorPages()];
}

const text = html => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/\s+/g, ' ').trim();

export function faqSchema(html) {
  const items = [...html.matchAll(/<details><summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)]
    .map(m => ({ '@type': 'Question', name: text(m[1]), acceptedAnswer: { '@type': 'Answer', text: text(m[2]) } }));
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items })}</script>`;
}

export function build(html) {
  let out = html.replace(/<!-- shared:([a-z-]+) -->[\s\S]*?<!-- \/shared:\1 -->/g, (_, name) => {
    const file = path.join(root, 'shared', `${name}.html`);
    if (!fs.existsSync(file)) throw new Error(`No shared/${name}.html`);
    return `<!-- shared:${name} -->\n${fs.readFileSync(file, 'utf8').trim()}\n<!-- /shared:${name} -->`;
  });
  // The schema is built from the page with the shared blocks already in it.
  out = out.replace(/<!-- faq-schema -->[\s\S]*?<!-- \/faq-schema -->/, () => `<!-- faq-schema -->\n${faqSchema(out)}\n<!-- /faq-schema -->`);
  return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const check = process.argv.includes('--check');
  let drifted = 0;
  for (const file of sharedPages()) {
    const before = fs.readFileSync(file, 'utf8');
    const after = build(before);
    if (before === after) continue;
    drifted += 1;
    if (check) console.error(`${path.relative(root, file)} has drifted from shared/. Run npm run shared.`);
    else { fs.writeFileSync(file, after); console.log(`Updated ${path.relative(root, file)}`); }
  }
  if (check && drifted) process.exit(1);
  if (!check && !drifted) console.log('Every sector page is up to date.');
}
