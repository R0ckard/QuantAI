# QuantAI website repo

Public repo (`R0ckard/QuantAI`), served by GitHub Pages at quantai.com.au from
`main`. No branches or PRs in use. **Dave runs every `git push` himself**: write
and stage changes, tell him what to run, and don't push on your own initiative
unless he's explicitly said to.

For the 6-minute AI check (`check/`, `worker/`, `tools/`), read
[`docs/handoff.md`](docs/handoff.md) first. It has current state, what's
confirmed live, what's next, open questions, and dead ends already ruled out.
Status goes there. This file is for things that don't change session to session.

## Structure

```
index.html              homepage (hero, what I build, what I help with, worked
                        examples, where to start, approach, contact)
admin-load-check.html   landing page for the 6-minute AI check
check/                  the check itself: static, public, noindex, ES modules
worker/                 Cloudflare Worker behind check/, holds every key, deployed
tools/                  Dave's local report pipeline (pull/draft/render/send), never deployed
01_.../05_...           five demonstration projects (worked examples), not client work
how-i-work/             one-pager
docs/handoff.md         current status of the check project
```

## Names

The public name is **the 6-minute AI check** (renamed from "the Admin Load
Check" on 11 Sep 2026). Use it in anything a respondent sees. The
`admin-load-check.html` URL, file and package names, code comments,
`ADMIN_CHECK_HOME`, and the localStorage key `qa-admin-load-check-v1` keep the
old name on purpose, so links already sent and saved progress keep working.
Don't tidy them.

## Single sources of truth

- **`check/model.js`**: scoring maths and qualification (score out of 25, tiers,
  small-business override). Imported directly by the browser page, the worker
  and the local tools. Never reimplemented.
- **`check/questions.js`**: the 26-question schema. The worker validates every
  submitted answer against it and the tools render labels from it.
- **Answer codes are only ever added, never renamed or removed.** Scoring reads
  codes, and stored submissions in KV hold them. Labels can change freely.
- **When option codes change, deploy the worker before pushing the site.** The
  live worker rejects codes it doesn't know (`invalid_answer:<id>`), so a site
  ahead of the worker breaks submissions.
- **Emails that actually go out:** `worker/src/emails.js` (confirmation to the
  respondent, review-sheet alert to Dave) and `tools/lib/report.js`
  `deliveryEmail()` (report emails: full, small, short). The human-readable copy
  lives outside the repo in `~/Documents/QuantAI/Consulting/GTM/Admin-Load-Check/emails.md`;
  keep it in step when wording changes.
- **AI prompts:** `worker/src/ai.js` (`PROBE_SYSTEM`, the adaptive follow-up
  question, and `MODELS`) and `tools/lib/draft-prompt.js` (report prose).

## The offer, as the site and every email must say it (changed 10 Oct 2026)

QuantAI now sells AI consulting, with the paid audit as the product. The full
decisions are in `~/Documents/QuantAI/Consulting/Briefs/QUANTAI-CONSULTANT-REBUILD-BRIEF.md`
(sections 2 and 3). That brief wins over anything older in this repo.

- **Two steps.** A free 15-minute call, then the audit.
- **Free call:** 15 minutes (booked as 20). A decision, not a diagnosis. No
  advice, no plan, nothing written but the offer. Never describe it as 30 or 45
  minutes.
- **The audit:** interviews, a written report, a debrief. Every recommendation
  carries a number built from the client's own hours and rates. Builds are
  optional work after it.
- **Founding offer:** three audits at a flat $1,500 + GST, scope capped at the
  founder plus up to three team members, one report, one debrief. The site line
  is fixed: "Three founding audits at $1,500 + GST. Once they're gone, audits
  move to standard rates." No countdown, no invented deadline.
- **Retired, and must not appear anywhere:** the $995 assessment, its
  "built and running or you don't pay" guarantee, and the $295 first automation.
  **Never guarantee an outcome.**
- **Still to change (Phase 1):** page 3 of the report
  (`tools/templates/report.html`) and the CLOSE instruction in
  `tools/lib/draft-prompt.js` still describe the $995 assessment. Until then,
  strip the `<!--PRICE-->` block from `out/<id>.html` before rendering.
- **The 6-minute AI check** is the same free first step for people who'd rather
  not talk.
- **Routing after a check** (`qualify()` in `check/model.js`): thresholds are
  unchanged (15 or more, 9 to 14, under 9, and the 1 to 5 people override).
  Whether they still fit the audit ladder is an open decision for Dave.
- **Audience:** say "business", not "firm", in respondent-facing copy.

The sales docs that mirror this live outside the repo in
`~/Documents/QuantAI/Consulting/GTM/`: `dm-playbook-2026-09-11.md`,
`offer-ladder.md`, `pitch-kit-in-person.md`. If the offer changes on the site,
change them too.

## Brand and voice (non-negotiable, every deliverable)

The brand file and Dave's writing-style skill live outside this repo, in the
Cowork session's memory folders (see `Consulting/GTM/Admin-Load-Check/` project
memory, `brand-and-voice-locations.md`, for the exact paths; they move between
machines, don't hardcode them here). The rules that matter most:

- **No em dashes or en dashes, anywhere, in anything produced**: prose, code
  comments, commit messages, docs. Comma, colon, or a new sentence instead.
  Plain hyphen only for ranges and compounds ("6-minute", "15-minute").
- Contractions always. British/Australian spelling. Sentence case, not Title
  Case. No Australian idiom (Dave is a Londoner).
- Viridian is the single accent colour, used sparingly. Ink/paper/slate do most
  of the work. Corners 2-4px, hairlines not shadows.
- **The report is drafted with AI, then read and signed off by Dave.** Never write
  "written by hand" or "I write every one myself".
- **Findings, never fixes.** The free report names what the repeat work costs and
  which family is heaviest. It never names a tool, a product, a sequence, or a
  first step; that's the paid assessment. `tools/lib/draft-prompt.js` encodes
  this, including a ban on the word "AI" in report prose (the product name sits
  on the cover only), and `lint()` in `tools/lib/report.js` checks the model's
  output before Dave sees the draft.

## Commands

```bash
cd tools && npm test          # shared model + pipeline tests (18)
cd worker && npm test         # worker tests (10), fake KV/Resend/Turnstile/Anthropic
cd worker && npm run deploy   # runs its tests, then npx wrangler deploy
curl -s https://quantai-check.dave-70b.workers.dev/api/health   # {"ok":true}

# local pipeline, one submission at a time
cd tools
npm run pull                        # list what's waiting
npm run draft <id>                  # numbers, family split, AI draft + lint
npm run render <id>                 # Chrome headless to PDF, opens it
npm run send <id> -- --reviewed     # refuses without a PDF and without this flag
```

`tools` tests include one live drafting test that calls Anthropic whenever
`tools/.env` has `ANTHROPIC_API_KEY`. It costs a call and very occasionally fails
`lint()` on a figure the model wrote; rerun once before treating it as a
regression. Full detail on each command: `tools/README.md`, `worker/README.md`.

## Secrets

Nothing in this repo is secret: it's a public repo and GitHub Pages serves every
file as plain text. Worker secrets live only as Wrangler secrets
(`npx wrangler secret put <NAME>` from `worker/`); the local pipeline's
equivalents live in `tools/.env`, gitignored, copied from `tools/.env.example`.
Never put a key in a committed file, ever, even temporarily.

## Known environment hazard: iCloud eviction on `~/Desktop`

Work in `~/Projects/QuantAI`, which iCloud doesn't sync. The older clone on
Dave's Desktop syncs to iCloud with "Optimise Mac Storage" on, and the notes
below apply to it. Two distinct failure modes have hit this repo:

1. **Disk nearly full.** macOS evicts file contents to free space; reads return
   empty or hang. Check `df -h /` before any `npm install` here and keep installs
   lean (`worker/node_modules` should only ever need the Anthropic SDK, about
   15 MB; use `npx wrangler` rather than installing it).
2. **iCloud sync daemon (`bird`) stuck**, even with disk space free. `brctl
   download` fails with a `SqliteErrorDomain` "database or disk is full" error,
   every pre-existing file (including `.git`) reads as `dataless` and times out,
   and `git` fails with `fatal: not a git repository`. New files still write and
   read fine.

If you hit mode 2: two safe attempts (`killall bird`, then `brctl download
<path>`), then stop and ask Dave to re-download the folder from Finder or reboot
(that cleared it on 10 Sep 2026). Don't loop on fixes, and if git is unusable hand
Dave the exact `git add`/`commit`/`push` to run himself. Separately, a session
sometimes starts without folder access at all
(`mcp__ccd_directory__request_directory` needed first); that's a normal
permissions step, not the iCloud fault. Confirm `git status` works before
assuming the sync issue has recurred.

## Previewing and screenshots

- `mcp__Claude_Browser__preview_start` can't serve a path under `~/Desktop` (it
  hangs), and Browser pane tabs showing a `file://` page can't be screenshotted
  or scripted. Serve the repo instead:
  `python3 -m http.server 8765 --bind 127.0.0.1 --directory ~/Desktop/QuantAI` in
  a background Bash call, then `tabs_create` and `navigate` to
  `http://127.0.0.1:8765/...` (or a `url`-only `.claude/launch.json` entry for
  `preview_start`). `pkill -f "http.server 8765"` when done.
- `check/` uses ES modules, so it never runs from `file://`. Always use the server.
- For a PNG to send Dave, use headless Chrome
  (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new
  --hide-scrollbars --virtual-time-budget=5000 --window-size=W,H --screenshot=out.png URL`).
  It won't render narrower than about 500px (narrower clips the right edge) and
  it ignores `#fragment` scrolling (you get a blank image). Render tall
  (`--window-size=1280,6200`) and crop with `sips -c <h> <w> --cropOffset <y> 0`.
