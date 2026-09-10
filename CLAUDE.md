# QuantAI website repo

Public repo (`R0ckard/QuantAI`), served by GitHub Pages at quantai.com.au.
`index.html` at the root is the main site. **Dave runs every `git push`
himself** — write and stage changes, tell him what to run, don't push on
your own initiative unless he's explicitly said to.

For the Admin Load Check project (`check/`, `worker/`, `tools/`), read
[`docs/handoff.md`](docs/handoff.md) first — it has current state, what's
confirmed live, what's still open, and dead ends already ruled out. Keep
that file current rather than letting this one grow stale duplicate
history: update `docs/handoff.md` for status, use this file for things that
don't change session to session.

## Structure

```
index.html, admin-load-check.html, how-i-work/, 01_.../05_...   the site
check/     Admin Load Check interview, static, GitHub Pages, public
worker/    Cloudflare Worker behind check/, holds every key, deployed
tools/     Dave's local pipeline (pull/draft/render/send), never deployed
```

**`check/model.js` is the single source of truth for the Admin Load Check
scoring maths**, imported directly by the browser page, the worker, and the
local tools — never reimplemented. `check/questions.js` is the single
source of truth for the question schema, same rule. If a change touches the
numbers or the questions, it goes in those two files and nowhere else.

## Brand and voice — non-negotiable, every deliverable

The brand file and Dave's writing-style skill live outside this repo, in
the Cowork session's memory folders (see
`Consulting/GTM/Admin-Load-Check/` project memory,
`brand-and-voice-locations.md`, for the exact paths — they move between
machines, don't hardcode them here). The rules that matter most:

- **No em dashes or en dashes, anywhere, in anything produced** — prose,
  code comments, commit messages, everything. Comma, colon, or a new
  sentence instead. Plain hyphen only for ranges and compounds.
- Contractions always. British/Australian spelling. Sentence case, not
  Title Case. No Australian idiom (Dave is a Londoner).
- Viridian is the single accent colour, used sparingly. Ink/paper/slate do
  most of the work. Corners 2-4px, hairlines not shadows.
- For the Admin Load Check specifically: **findings, never fixes.** The
  free report names what the repeat work costs and which family is
  heaviest. It never names a tool, a product, a sequence, or a first step —
  that's the paid assessment. `tools/lib/draft-prompt.js` encodes this as a
  hard rule in the drafting system prompt, and `tools/lib/report.js`'s
  `lint()` checks the model's output against it before Dave ever sees the
  draft.

## Commands

```bash
# check/ and worker/ share the model — run its tests from tools/, which
# has the dependency (check/ itself has none installed)
cd tools && npm test

# worker: deploy (runs its own tests first)
cd worker && npm run deploy

# local pipeline, one submission at a time
cd tools
npm run pull                        # list what's waiting
npm run draft <id>                  # numbers, family split, AI draft + lint
npm run render <id>                 # Chrome headless -> PDF, opens it
npm run send <id> -- --reviewed     # refuses without a PDF and without this flag
```

Full detail on each command and its flags: `tools/README.md` and
`worker/README.md`.

## Secrets

Nothing in this repo is secret — it's a public repo and GitHub Pages serves
every file as plain text. Worker secrets live only as Wrangler secrets
(`npx wrangler secret put <NAME>` from `worker/`); the local pipeline's
equivalents live in `tools/.env`, gitignored, copied from
`tools/.env.example`. Never put a key in a committed file, ever, even
temporarily.

## Known environment hazard: iCloud eviction on `~/Desktop`

This repo's clone lives on Dave's Desktop, which syncs to iCloud with
"Optimise Mac Storage" on. Two distinct failure modes have hit this repo:

1. **Disk nearly full** → macOS evicts file contents to free space; reads
   return empty or hang. Fix: check `df -h /` before any `npm install`
   here, keep installs lean (`worker/node_modules` should only ever need
   the Anthropic SDK, ~15 MB — use `npx wrangler` rather than installing it
   as a dependency).
2. **iCloud sync daemon (`bird`) stuck**, even with disk space free —
   `brctl download` fails with a `SqliteErrorDomain` "database or disk is
   full" error regardless of actual free space, every pre-existing file in
   the repo (including everything under `.git`) reads as `dataless` and
   times out, and `git` itself fails with `fatal: not a git repository`.
   Restarting `bird` (`killall bird`) has not reliably cleared this.
   New files still write and read fine — only files iCloud already knows
   about are affected.

If you hit mode 2: two safe attempts (`killall bird`, then `brctl download
<path>`), then stop and ask Dave to re-download the folder from Finder or
reboot — that's what cleared it on 10 Sep 2026. Don't loop on fixes, and if
git is unusable hand Dave the exact `git add`/`commit`/`push` to run
himself. Separately, a session sometimes starts here without folder access
at all (`mcp__ccd_directory__request_directory` needed before Bash/Read can
see anything) — that's a normal permissions step, not the iCloud fault;
confirm `git status` works before assuming the sync issue has recurred.

## Preview / local server

`mcp__Claude_Browser__preview_start` cannot serve a path under `~/Desktop`
directly (it hangs). Run `python3 -m http.server <port> --bind 127.0.0.1
--directory ~/Desktop/QuantAI` in a background Bash call instead, then put
a `url`-only entry (no command) in `.claude/launch.json` so `preview_start`
attaches to it rather than trying to start its own process.
