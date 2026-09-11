# The 6-minute AI check · handoff

Last updated 11 Sep 2026, end of session. Architecture, conventions, commands
and settled decisions live in `CLAUDE.md`. This file is status only.

## Read this first: the site is not live yet

- Dave's push on 11 Sep did not land. On 7 Sep a one-line edit to
  `check/app.js` was committed directly on GitHub ("Update app.js", the
  privacy line on the intro screen), so local `main` was 3 commits ahead and
  1 behind and the push was rejected. At the end of the session the docs
  commit was made and local `main` was rebased onto `origin/main` (dry-run
  merge was clean, no conflicts, the GitHub edit is kept).
- **Next step is `git push`, then verify live.** Until then quantai.com.au
  serves the 7 Sep build: "Admin Load Check", "Book a call", "Start with an
  assessment".
- The worker was deployed on 11 Sep from local files, so it already runs
  today's code (new name, "sign off" wording, widened labels, new 1.6 codes).
  It accepts everything the older live page sends, so nothing is broken in
  the gap.

Verify after the push (Pages rebuilds in about a minute, the CDN caches for up
to 10 minutes):

```bash
git fetch origin && git status -sb          # expect: ## main...origin/main, nothing ahead or behind
curl -sL https://quantai.com.au/ | grep -c "Free 15-minute call"                              # non-zero
curl -sL https://quantai.com.au/admin-load-check.html | grep -c "Before you spend a cent on AI" # 1
curl -sL https://quantai.com.au/check/questions.js | grep -c "HEALTH"                          # 1
gh api repos/R0ckard/QuantAI/pages/builds/latest --jq '.status + " " + .commit[0:7]'
```

## Objective

A free 26-question check on quantai.com.au, publicly "the 6-minute AI check"
(formerly the Admin Load Check), that puts a number on what a business's repeat
work costs and routes the respondent to one next step. It replaced a Tally
form with a self-hosted pipeline: a one-question-per-screen interview at
`/check/`, a Cloudflare Worker that scores, stores and emails, and a local tool
on Dave's Mac that drafts, renders and sends a three-page PDF behind a human
review gate. Since 11 Sep the site also sets out QuantAI's two-step offer
around it: a free 15-minute call, then the $995 assessment.

Original spec: `~/Documents/QuantAI/Consulting/GTM/Admin-Load-Check/BRIEF-for-Code.md`
(outside the repo).

## What's done

- **`check/`**: full interview (one question per screen, keyboard shortcuts,
  progress bar, localStorage resume, adaptive follow-ups on 5.1 and 6.1 via the
  worker, Turnstile, instant estimate on the results screen, mailto fallback if
  `API_BASE` is empty). Wired to the live worker and real Turnstile site key in
  `check/config.js`. Wording reflects Dave's 3 Sep phone test, and on 11 Sep:
  the new name, the intro headline "Before you spend a cent on AI, see where
  your team's week actually goes", "firm" to "business" and "fee earners" to
  client-work wording in labels, and four industries on 1.6 (`HEALTH`,
  `TRADE`, `HOSP`, plus `PROP` relabelled to include real estate). Codes were
  only added.
- **Landing page** (`admin-load-check.html`): renamed; hero reframed for people
  curious about AI; audience line widened to any business where the team's
  time costs money; says the report is drafted with AI and read and signed off
  by Dave (the FAQ too); every call CTA is the free 15-minute call.
- **Homepage** (`index.html`): nav link and hero button to the check; "Where to
  start" rebuilt as two steps (free 15-minute call, then the $995 assessment,
  "The call tells you whether it's worth doing. The assessment does it."); the
  $995 list leads with what they get; hero, price box and contact CTAs say
  "Free 15-minute call" or "Start with the free call".
- **`worker/`**: live at `https://quantai-check.dave-70b.workers.dev`, redeployed
  11 Sep. Routes: `POST /api/followup` (rate limited, fails soft to null),
  `POST /api/submit` (validates against `questions.js`, verifies Turnstile,
  scores, dedupes by session, stores in KV, emails both sides), `GET /api/pull`
  and `POST /api/mark` (bearer token, for the local tool), `GET /api/health`.
  KV namespace `SUBMISSIONS` (id `e54afe351e3f4471acc3f3f75f8c9a6e`). Secrets set:
  `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET`, `PULL_TOKEN`.
  Branded HTML confirmation email ("Got it, your 6-minute AI check is with me")
  and a full review-sheet alert to Dave (subject "AI check · company · score/25
  · tier"). 10 tests pass.
- **`tools/`**: pull, draft, render, send. `send.js` refuses without
  `--reviewed`, without a PDF, or if the PDF is older than the draft. Report
  template's price block leads with the built automation; delivery emails offer
  the free 15-minute call; the PDF attachment is `QuantAI-AI-Check-<company>.pdf`.
  18 tests pass, including the live prompt-injection drafting test (run on
  11 Sep: one run failed `lint()` on a figure the model wrote, the rerun passed).
- **Earlier fix still worth knowing**: when the document total exceeds the
  section 2 hours total, the hours figures now follow whichever total was used.
  `admin-load-scoring.xlsx` (Dave's workbook, outside the repo) still has the
  same flaw on Model rows 24-25.
- **Docs outside the repo brought into line on 11 Sep**:
  `Consulting/GTM/dm-playbook-2026-09-11.md` (DM scripts, the free call run
  sheet), `offer-ladder.md`, `pitch-kit-in-person.md`,
  `Admin-Load-Check/emails.md`.

## Confirmed live

- Worker health `{"ok":true}` (11 Sep, after Dave's redeploy). Earlier checks
  (10 Sep): `/api/pull` without a token returns 401, `/api/submit` without a
  Turnstile token returns `turnstile_missing`.
- GitHub Pages: source `main` at `/`, CNAME quantai.com.au, last successful build
  7 Sep on "Update app.js". Today's site changes are **not** live until the push
  above lands.

## What's next

1. **Push and verify** (commands above).
2. **Run the report pipeline end to end on a real submission.** It has never
   been done: nothing has been sent for real (`send.js` only ever ran with
   `--dry-run`) and nobody has read a real PDF. Fill the check in on a phone,
   then `cd tools && npm run pull`, `npm run draft <id>`, `npm run render <id>`,
   read the PDF, and `npm run send <id> -- --reviewed` to Dave's own inbox. This
   has to happen before the check link goes out in any DM.
3. **Calendly** (Dave, outside the repo): set the event behind every call
   button (`calendly.com/dave-quantai/zoom-meeting`) to 20 minutes and name it
   "15-minute call". Not confirmed done.
4. Sales work that depends on 1 and 2 is in the DM playbook (LinkedIn headline
   and Featured link, DMs, a post about the check once the pipeline is proven).

## Open questions

1. **Scoring for the wider audience.** Size points peak at 16 to 50 people,
   section 4 assumes billable hours, and industry (1.6) isn't scored at all. Once
   roughly ten real submissions include trades, clinics or hospitality, check
   whether the tiers route them sensibly. Dave's call.
2. **Indexing `check/`.** It's `noindex` so the landing page stays the front
   door. No decision.
3. **Worker domain.** Moving off `*.workers.dev` to `api.quantai.com.au` needs the
   domain's DNS on Cloudflare. Cosmetic, not blocking.
4. **Resend sender.** Sends from verified `send.quantai.com.au` with reply-to
   Dave's real address. Only revisit if the root domain gets verified.
5. **Family split bias.** The first-pass split from 2.1 and 3.1 ticks leans
   towards documents by construction. Evaluate once there's real volume.
6. **The workbook flaw** on Model rows 24-25 of `admin-load-scoring.xlsx`. Dave's
   file, his call.

Settled, not open: the public name; $995 published on the homepage and in the
report for high scorers; $295 never on the site; the free call is 15 minutes.
Details in `CLAUDE.md`.

## Dead ends already ruled out, don't retry these

- **Cloudflare "Set up with Spin" for Turnstile.** Declined for "Add widget
  manually". Spin auto-wires a backend that was already done by hand.
- **`preview_start` on a path under `~/Desktop`.** Hangs. Browser pane tabs on
  `file://` pages also can't be screenshotted or scripted. Use
  `python3 -m http.server` in background Bash, then `tabs_create` and `navigate`.
- **Installing `wrangler` with `npm install` in `worker/` on a nearly full disk.**
  iCloud evicted `node_modules` mid-install. Use `npx wrangler`, check `df -h /`
  first.
- **Driving LinkedIn with Claude in Chrome.** The page never reaches
  document_idle: `get_page_text` times out after 45 seconds and screenshots fail
  with "Script injection timed out", twice each, even after a 10 second wait.
  Give Dave the text to paste instead.
- **Headless Chrome for narrow or anchored screenshots.** Windows under about
  500px clip the right edge, and `#fragment` URLs don't scroll (blank image).
  Render tall and crop with `sips`.
- **Taking "pushed" to mean live.** The 11 Sep push silently didn't land. Always
  `git fetch && git status -sb` and curl the live page before recording
  anything as live.
- **Comparing test runs in a `git worktree` at HEAD.** `tools/.env` isn't in the
  worktree, so the live drafting test skips there and pass counts differ by one.
- **`echo =====` in zsh.** `=word` is expansion, so it errors "not found" and
  kills the rest of a `&&` chain. Use `echo "---"`.

## iCloud fault that recurs on this repo

On 10 Sep every pre-existing file under `~/Desktop/QuantAI` (including `.git`)
came back `dataless` and unreadable, `brctl download` failed with
`SqliteErrorDomain Code=13 "database or disk is full"` despite 8 to 14 GB free,
restarting `bird` didn't help, and git said `fatal: not a git repository`. Dave
cleared it by re-downloading the folder from Finder. It didn't recur on 11 Sep.
The two-attempts-then-stop procedure is in `CLAUDE.md`.
