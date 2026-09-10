# The Admin Load Check · handoff

Last updated 10 Sep 2026. Everything through the branded-email work is
committed and pushed (`b6b987b`, 4 Sep). The repo, the live worker, and the
`check/` wiring have all been verified against reality for this update.

## Objective

Replace the Tally-embedded lead form on quantai.com.au ("The Admin Load
Check", a free 26-question diagnostic) with a self-hosted pipeline: a
one-question-per-screen interview at `/check/`, a Cloudflare Worker that
scores and stores each submission and emails both sides, and a local tool on
Dave's Mac that drafts, renders and sends the three-page PDF report with a
human review gate before anything goes out. Full spec:
`Consulting/GTM/Admin-Load-Check/BRIEF-for-Code.md` (outside this repo, in
the Documents folder, not tracked here).

## Architecture

```
check/    static interview page, served by GitHub Pages, public
worker/   Cloudflare Worker, holds every key, scores + stores + emails
tools/    Dave's local pipeline (pull, draft, render, send), never deployed
```

**`check/model.js` is the single source of truth for the scoring maths.**
`check/app.js` (browser), `worker/src/index.js` (server), and
`tools/lib/report.js` (report) all import it directly. Nothing recomputes
the formulas independently — this is deliberate, so the number on the
respondent's screen, the number in the alert to Dave, and the number in the
PDF can never disagree. Restated from `admin-load-scoring.xlsx` (46 working
weeks, 20-40% recoverable range, MAX of the admin-hours total and the
document-count total with a disagree flag when documents exceed hours,
8 work families with fixed automatability weights).

`check/questions.js` is the 26-question schema, also shared: the worker
validates every incoming answer against it, and the local tool renders
answer labels from it.

## What's done

- **`check/`** — full interview flow (one question per screen, tap targets,
  number-key shortcuts, progress bar, localStorage resume, adaptive follow
  ups on 5.1/6.1 via the worker, Turnstile, results screen with instant
  estimate, a stub/mailto fallback if `API_BASE` is empty). Question wording
  reflects Dave's 3 Sep phone-test feedback (company name not firm name,
  business development/lead generation option, specialist software/
  SharePoint option, repeat-emails option, 3.4 changed to multi-select with
  a "Nobody" exclusive option, "building the business" option). 9 model
  tests pass (`check/../tools` runs them via the shared model). Wired to the
  live worker and the real Turnstile site key in `check/config.js`.
- **Landing page** (`admin-load-check.html`) — Tally embed removed, nav uses
  the real wordmark, every CTA points at `/check/`.
- **`worker/`** — deployed and live at
  `https://quantai-check.dave-70b.workers.dev`. Routes: `POST /api/followup`
  (rate-limited adaptive question, fails soft to null), `POST /api/submit`
  (validates, verifies Turnstile, scores, dedupes by session, stores in KV,
  emails both sides), `GET /api/pull` / `POST /api/mark` (bearer-token,
  used by the local tool), `GET /api/health`. KV namespace `SUBMISSIONS`
  bound (id `e54afe351e3f4471acc3f3f75f8c9a6e`). All four secrets
  (`ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET`,
  `PULL_TOKEN`) are set on the deployed Worker. 10 tests pass against a fake
  KV and fake Resend/Turnstile/Anthropic.
- **`tools/`** — `pull.js`, `draft.js`, `render.js`, `send.js` plus
  `lib/env.js`, `lib/paths.js`, `lib/report.js`, `lib/draft-prompt.js`, and
  `templates/report.html` (built from the pack's `report-template.html`,
  fonts matched to the site, a `<!--PRICE-->...<!--/PRICE-->` block that
  drops for anyone Qualify says shouldn't see it). `send.js` refuses to send
  without `--reviewed`, refuses without a PDF, and refuses if the PDF is
  older than the draft. 16 tests pass plus one live test (skipped unless
  `ANTHROPIC_API_KEY` is set) that feeds a prompt-injection attempt through
  real drafting and confirms it comes back clean — **this live test has
  been run and passed** (28s, no dashes, no invented figures, no mention of
  the injected "$50,000" or "Zapier").
- **Emails.** Both the confirmation (to the respondent) and the alert (to
  Dave) were rewritten on 4 Sep after Dave's feedback that the plain-text
  versions weren't enough:
  - Confirmation is now branded HTML (`worker/src/emails.js`:
    `wrapHtml` + `paragraphsToHtml`), Dave's exact copy, his signature
    block (name, Founder · QuantAI, phone, email, site, Book a call,
    LinkedIn) inlined as a table for email-client compatibility. A plain
    text part travels alongside.
  - The alert to Dave is now a full review sheet, not a summary: who they
    are, a "what to do" box (score /25, routing sentence, whether the price
    stays in the PDF), the numbers table, all seven qualification points
    shown against their max, the first-pass family split, their two free
    text answers with any follow ups, then every one of the 26 answers
    laid out by section. Subject line carries the score so Dave can triage
    from the inbox.
  - `tools/send.js` was updated to send the same branded wrapper and
    signature on the report delivery emails.
  - **A real bug was found and fixed in `tools/lib/report.js`**: when the
    document-count total exceeds the section-2 hours total (the "inputs
    disagree" case), the dollar range already followed the higher figure,
    but the *hours* figures (`HOURS_LOW`/`HOURS_HIGH`/`HOURS_WEEK`) were
    still derived from the section-2 band, so the report's own numbers
    table wouldn't have added up internally. Fixed to follow whichever
    total was actually used. **The original `admin-load-scoring.xlsx` has
    the same flaw on Model rows 24-25, unfixed** — flagged to Dave, his
    file, his call whether to fix it there too.

## Confirmed live (verified 10 Sep 2026)

- Worker health check: `{"ok":true}`.
- `/api/pull` without a token: `401`. `/api/submit` without a Turnstile
  token: `{"ok":false,"error":"turnstile_missing"}` — so the secret is set
  and enforced.
- `check/config.js` has the live `API_BASE` and the real Turnstile site key.
- `worker/src/emails.js` in the repo exports `wrapHtml`, `SIGNATURE_HTML`,
  `SIGNATURE_TEXT`, `paragraphsToHtml` — the branded rewrite is committed
  and pushed.
- Funnel: `index.html` → `admin-load-check.html` (landing page) → `/check/`.

## Not yet done

1. **Redeploy the worker once more to be certain the branded emails are the
   live version.** The branded-email commit (`b6b987b`, 4 Sep 12:00) landed
   after the last apparent `wrangler` activity (`worker/.wrangler/tmp`,
   4 Sep 10:43), so the deployed binary may still be sending the old plain
   text. `cd worker && npm run deploy` is idempotent and takes under a
   minute — just do it.
2. **The draft → render → send pipeline has never been run on a real
   submission.** It was proven against a synthetic submission (written
   straight into a scratch data file, not through the real form) and the
   `live` drafting test passed against a real Anthropic call, but nobody
   has seen an actual PDF report for a real person and nothing has ever
   been sent for real (`send.js` only ever run with `--dry-run`).
   `tools/data/` is currently empty — the earlier phone-test submission
   ("Dave Richardson" / "Test", id starting `ba3b7438`) is gitignored
   local-only data and is no longer on disk, but it should still be in the
   worker's KV. Next step: `cd tools && npm run pull` to fetch it (or fill
   the check in fresh on the phone for a submission under the branded
   format), then `npm run draft <id>`, `npm run render <id>`, read the PDF,
   and only then `npm run send <id> -- --reviewed` to Dave's own inbox as
   the first real send.
3. Whether `$995` stays published on the landing page and in the report, or
   gets held for a call — open, Dave's call (see
   `Consulting/GTM/Admin-Load-Check/README-runbook.md`, "Decisions still
   yours").
4. Whether the interview page (`check/`) should be indexed by search
   engines — currently `<meta name="robots" content="noindex">` so the
   landing page stays the front door. Flagged to Dave, no decision made.
5. Whether the worker should move off `*.workers.dev` onto
   `api.quantai.com.au` — only possible if the domain's DNS moves to
   Cloudflare. Not blocking, cosmetic.
6. Whether Resend should send from `dave@quantai.com.au` directly once (if)
   that root domain gets verified there — currently sends from the already-
   verified `send.quantai.com.au` with reply-to set to Dave's real address,
   which works fine as a workaround.
7. The derived family split (from ticks on 2.1/3.1) leans toward "documents"
   by construction — every 3.1 tick adds a unit to that family. The
   runbook's own advice (watch whether the gap always comes out as
   documents once there's real volume) hasn't been evaluated yet: only one
   real submission exists.

## Dead ends already ruled out — don't retry these

- **Cloudflare's "Set up with Spin" for Turnstile.** Declined in favour of
  "Add widget manually". Spin wants to auto-wire the backend, which was
  already done by hand; there was nothing for it to add.
- **`mcp__Claude_Browser__preview_start` pointed directly at a path under
  `~/Desktop`.** Hangs — the preview helper process can't read that folder.
  Workaround: serve with a plain `python3 -m http.server` from a background
  Bash call, then a `.claude/launch.json` entry with only a `url` (no
  command) so `preview_start` attaches to the already-running server
  instead of trying to start one itself.
- **Installing `wrangler` as a full `npm install` inside `worker/`
  when the Mac's disk was nearly full.** iCloud started evicting file
  contents mid-install (`node_modules` came back "dataless", reads
  returned empty). Fixed at the time by removing the dependency and using
  `npx wrangler` instead, and by checking `df -h /` before any install
  under this repo from then on.

## An iCloud fault that recurs on this repo

On 10 Sep 2026 this session opened with every pre-existing file under
`~/Desktop/QuantAI` (including all of `.git`) evicted to iCloud and
unreadable: `ls -lO` showed them `dataless`, reads timed out, `brctl
download` failed with `SqliteErrorDomain Code=13 "database or disk is full"`
despite 8-14 GB free, restarting `bird` didn't help, and `git` reported
`fatal: not a git repository`. Dave cleared it by re-downloading the folders
manually from Finder. New files were never affected.

If a future session hits this: two safe attempts (`killall bird`, `brctl
download <path>`), then stop and ask Dave to re-download the folder from
Finder or reboot. Don't loop on it, and if git is unusable, hand Dave the
`git add`/`commit`/`push` to run himself rather than fighting the sandbox.
This is now also noted in `CLAUDE.md`.
