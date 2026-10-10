# Phase 0 survey

Written 10 Oct 2026 against `origin/main` at `94ea55a`, before any change.
Brief: `~/Documents/QuantAI/Consulting/Briefs/QUANTAI-CONSULTANT-REBUILD-BRIEF.md` (v2).

Everything here was read from the code or checked live on the day. Where
something couldn't be checked, it says so.

## 1. Where the brief was wrong or out of date

Read these first. They change Phase 1.

1. **There are three local clones, not one stale one.** `~/Desktop/QuantAI` is a
   third copy, level with `origin/main` and clean. It holds the only
   `tools/.env` (the local pipeline's keys). This clone
   (`~/Projects/QuantAI`) has none, so `npm run pull` won't work here until
   Dave copies that file across. I didn't copy it.
2. **noomoo-crm is not the complete pattern library the brief describes.** It
   has the schema rules, the send choke point, the kill switch, the live cap,
   insert-before-send and append-only activities. It does **not** have:
   - a sequence worker (deliberately absent; nothing sends without a click)
   - sequences as JSON (no `/sequences` folder exists)
   - dry-run as a send mode (`email_sends.status` has no `dry_run` value)
   - Supabase magic-link auth (it's a shared passphrase cookie)
   - RFC 8058 one-click unsubscribe (it sends a `mailto:` `List-Unsubscribe`
     only, with no `List-Unsubscribe-Post`)
   - a suppression table (suppression is a boolean on `contacts`)
   - shadcn/ui (Tailwind 4 and hand-written components)

   Its `CLAUDE.md` describes all seven as rules. They're intentions there, not
   code. The S&M Machine has to build them new, which is most of the risky
   part of 5.4.
3. **The `crm` schema name is taken** in the `noomoo` Supabase project. If the
   S&M Machine shares that project (see 7b) it needs another name.
4. **Supabase has no free slot.** The QuantAI org has two active projects
   (`noomoo`, `carboncut-prod`) and one paused (`pilot-manus-memory`). Free
   allows two active.
5. **noomoo-crm runs on Vercel Hobby**, which Vercel restricts to
   non-commercial use. Not this project's problem, but Dave should know.
6. **The $995 lives in more places than the brief lists.** Section 4.2 names
   the homepage and `admin-load-check.html`. It's also in the PDF report
   template, the routing text in `check/model.js`, the alert email subject, and
   five tests. See section 3.
7. **`$295` is publicly readable today.** `check/model.js` is served by GitHub
   Pages and line 152 names "the $295 first automation". `CLAUDE.md` and
   `docs/handoff.md` (public repo) name it too.
8. **Emails 5 and 6 (day +5, day +12) were never built.** They exist as copy in
   `emails.md` only. Nothing schedules or sends them.
9. **The report pipeline has never run on a real submission**, per
   `docs/handoff.md` (11 Sep), and `tools/data/` in the Desktop clone is empty
   with no `sent.log`. I couldn't count what's in KV without the pull token.
10. **DNS is on Namecheap, not Cloudflare.** Any custom domain for a Worker or
    Pages project (`api.` or `crm.quantai.com.au`) needs either a nameserver
    move or a CNAME setup. That's a DNS change, so it needs Dave's say-so.
11. **Cal.com webhooks on the free plan: not confirmed.** The pricing page
    lists webhooks as a feature without saying which plans get them. Check in
    the account (Settings, Developer, Webhooks) before Phase 1 builds on it.

## 2. The checker as built

### What runs where

| Piece | Where | Notes |
|---|---|---|
| Landing page | `admin-load-check.html`, GitHub Pages | Static |
| Interview | `check/` (`index.html`, `app.js`, `check.css`), GitHub Pages | ES modules, `noindex`, one question per screen, localStorage resume |
| Worker | Cloudflare Worker `quantai-check` at `quantai-check.dave-70b.workers.dev` | Source in `worker/`, deployed by hand with `npm run deploy`. Free plan, `workers.dev` hostname |
| Storage | Cloudflare KV namespace `SUBMISSIONS` | Bound in `worker/wrangler.toml` |
| Report pipeline | `tools/`, Dave's Mac only | `pull`, `draft`, `render`, `send`. Never deployed |
| Spam check | Cloudflare Turnstile | Site key in `check/config.js`, secret on the worker |
| Email | Resend, from `dave@send.quantai.com.au`, reply-to `dave@quantai.com.au` | Called from the worker and from `tools/send.js` |
| AI | Anthropic API | Worker: one follow-up question on 5.1 and 6.1 (`claude-haiku-4-5`). Tools: report prose (`claude-fable-5-1`) |
| Analytics | GA4 `G-VQC3NV1XM8` | On every HTML page in the repo |

So the 2 September spec was built as written: Worker, KV and a local CLI.

### Endpoints

| Route | Auth | Does |
|---|---|---|
| `GET /api/health` | none | `{"ok":true}` |
| `POST /api/followup` | none, rate limited (4 a session, 30 an hour per hashed IP) | One adaptive follow-up, or `null`. Fails soft |
| `POST /api/submit` | Turnstile | Validates every answer against `questions.js`, scores, dedupes by session, emails both sides, stores in KV, returns the public estimate |
| `GET /api/pull` | bearer `PULL_TOKEN` | Unprocessed submissions (max 50), `?all=1` for everything |
| `POST /api/mark` | bearer `PULL_TOKEN` | Marks one processed |

CORS allows `quantai.com.au`, `www.quantai.com.au` and two localhost ports.

Checked live on 10 Oct: health returns `{"ok":true}`, `/api/pull` without a
token returns 401, and the live `questions.js` matches the repo.

### Where submissions are stored

KV only. Three key shapes:

- `sub:<uuid>`: the full record (answers, follow-ups, model output, qualification,
  email status, processed flag). Metadata carries company, date, score and the
  processed flag. **No expiry.**
- `sess:<sessionId>`: id and estimate, for retry dedupe. Expires after 30 days.
- `rl:s:*` and `rl:ip:*`: rate-limit counters. Expire in 1 to 6 hours.

No IP address is stored against a submission. Nothing is ever deleted, and
there's no delete route, so the landing page's "ask me to delete them" promise
is honoured by hand in the Cloudflare dashboard.

Once pulled, a copy also sits in `tools/data/<id>.json` on Dave's Mac, with
drafts and PDFs in `tools/out/`. Both are gitignored.

### How the report is produced and sent today

1. Submit. The worker sends the confirmation to the respondent and a full
   review sheet to Dave (score out of 25, tier, override, every answer).
2. `npm run pull` copies waiting submissions to `tools/data/`.
3. `npm run draft <id>` shows the numbers and the derived family split, lets
   Dave override the split, calls Anthropic for five prose blocks, runs
   `lint()` (invented figures, fix words, benchmark claims, dashes), asks the
   model to repair what's flagged, and writes `tools/out/<id>.html`.
4. `npm run render <id>` prints that to PDF with headless Chrome and opens it.
5. `npm run send <id> -- --reviewed` emails it through Resend with the PDF
   attached, appends a line to `tools/data/sent.log`, and marks the submission
   processed on the worker. It refuses without `--reviewed`, without a PDF, or
   with a PDF older than the draft. `--dry-run` prints and stops.

Which email goes out is decided by `tierFor()` in `tools/lib/report.js`:
full (15+, price block shown), full with the price held (9 to 14), small
(load under $10,000 a year), short (under 9, no PDF). A 1 to 5 person business
never sees the price.

### What the send path lacks, measured against the brief's rule 5

The check's emails today are one-to-one replies to a request, so this is fine
as it stands. It stops being fine the moment a sequence is attached.

- no suppression check anywhere
- no unsubscribe link or `List-Unsubscribe` header
- no ABN or address in any footer (the signature has neither)
- no consent record: the form stores no consent timestamp or wording version
- no kill switch, no cap, no send ledger beyond a local text file

### Secrets (names only)

| Where | Names |
|---|---|
| Worker (Wrangler secrets) | `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `TURNSTILE_SECRET`, `PULL_TOKEN` |
| Worker (plain vars in `wrangler.toml`) | `ALLOWED_ORIGINS`, `RESEND_FROM`, `REPLY_TO`, `ALERT_TO` |
| Local pipeline (`tools/.env`, gitignored) | `WORKER_URL`, `PULL_TOKEN`, `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM`, `REPLY_TO`, `CALENDLY_URL` |
| Public by design | Turnstile site key and the worker URL in `check/config.js`; the KV namespace id in `wrangler.toml` |

No secret is committed. The brief's rule that worker source stays out of the
public repo is **already broken**: `worker/src/` is in the repo and has been
since 3 Sep. It holds no keys, but it does publish the qualification logic and
the follow-up prompt. The scoring weights and routing are public anyway,
because the browser has to load `check/model.js`.

### Is `model.js` truly single-source?

For the maths, yes. Every consumer imports it and none reimplements it:

- browser: `check/app.js`
- worker: `worker/src/index.js`, `worker/src/emails.js`
- tools: `draft.js`, `send.js`, `lib/report.js`
- tests: `tools/test/*.js`, `worker/test/worker.test.js`

`check/questions.js` is the same for the question schema.

Four things sit outside it and will drift if the constants ever change:

1. `tools/templates/report.html` line 90 hardcodes `46`, and line 93 hardcodes
   "20% to 40%" in prose.
2. `tools/draft.js` line 36 prints `x 46` in a console line.
3. `admin-load-scoring.xlsx` and `build_model.py` (outside the repo) are the
   original statement of the model. `handoff.md` records a known flaw in the
   workbook that the code has fixed, so they already disagree.
4. Routing **wording** lives in `model.js` (`routing`, `overrideLine`), which
   means offer copy, including `$995` and `$295`, ships to every browser.

Qualification is described as "server side only", but `qualify()` and its
points table are in the public file. The score isn't computed in the browser,
but anyone can read how it's built.

## 3. Every place the old offer appears

| File | What | Changed in Phase 0? |
|---|---|---|
| `index.html` | `<title>`, meta, eyebrow, "Where to start" ($995 block, guarantee) | Yes |
| `admin-load-check.html` | Card 04, FAQ 1 ($995), FAQ 2, the "paid piece" note | Yes |
| `check/model.js` | Routing strings name `$995` and `$295` | Yes, wording only |
| `worker/src/emails.js` | Alert subject tag "land the $995" | Yes, wording only. Needs a worker redeploy to take effect |
| `tools/templates/report.html` | Page 3 price block: $995, the build, the guarantee | **No.** Phase 1 (5.3) |
| `tools/lib/draft-prompt.js` | Tells the model "the assessment below is the natural next step" | **No.** Goes with the template |
| `tools/test/*`, `worker/test/*` | Assert on `$995` | Only where the wording above changed |
| `CLAUDE.md`, `docs/handoff.md` | Describe the 11 Sep offer as settled | `CLAUDE.md` offer section updated; `handoff.md` left as a dated record |
| `how-i-work/QuantAI_How_I_Work.html` and `.pdf` | No price. Eyebrow and footer say "Fractional AI operations" | No. Phase 4 brand pass |
| All five `0N_.../case-study/index.html` | Footer (and brand line on 03, 04, 05) says "Fractional AI Operations" | No. Phase 2 reframes these |
| Outside the repo: `offer-ladder.md`, `dm-playbook-2026-09-11.md`, `pitch-kit-in-person.md`, `Admin-Load-Check/emails.md` | The old ladder | No. Dave's documents |

**Live gap this leaves:** after Phase 0 the site sells the audit, but a
respondent who scores 15 or more still gets a PDF offering the $995
assessment. Until Phase 1 rewrites page 3, send those reports with the price
held (`full_hold` behaviour: strip the `<!--PRICE-->` block by hand in
`out/<id>.html` before rendering).

Calendly (`calendly.com/dave-quantai/zoom-meeting`) appears in 4 places in
`index.html`, 3 in `admin-load-check.html`, in `worker/src/emails.js`
(signature text), `tools/lib/env.js` and `tools/.env.example`. Not changed in
Phase 0: there's no Cal.com link to swap in yet.

## 4. Page inventory

23 HTML files. None has a canonical link. There's no `robots.txt`,
`sitemap.xml` or `404.html` (both return 404 live). GitHub Pages reports
`https_enforced: false`, so `http://quantai.com.au` isn't being redirected.

| Page | `<title>` | Meta description |
|---|---|---|
| `index.html` | QuantAI · Quantified AI consulting · Dave Richardson | QuantAI, fractional AI operations. Dave Richardson helps professional services firms get the admin out of their week with AI, without handing over the decisions that carry risk. |
| `admin-load-check.html` | The 6-minute AI check · QuantAI | Before you spend anything on AI, see where your team's week actually goes. Twenty six quick questions, then a costed read of the repeat work, drafted with AI and signed off by Dave Richardson, within two business days. |
| `check/index.html` (`noindex`) | The 6-minute AI check · QuantAI | Twenty six questions about how the work gets done in your firm. See what the repeat work costs on screen straight away, and get the written version inside two business days. |
| `how-i-work/QuantAI_How_I_Work.html` | QuantAI · How I work | none |
| `01_.../case-study/index.html` | Case Study · BrightPath AI Operating System \| QuantAI | none |
| `01_.../diagrams/workflow-diagrams.html` | BrightPath · Current & Future State Workflow Diagrams | none |
| `01_.../walkthrough/demo.html` | BrightPath AI Operating System · Walkthrough Demo | none |
| `02_.../case-study/index.html` | Case Study · FutureHire Recruitment AI \| QuantAI | none |
| `02_.../diagrams/workflow-diagrams.html` | FutureHire · Current & Future State Workflow Diagrams | none |
| `02_.../walkthrough/demo.html` | FutureHire Recruitment AI · Walkthrough Demo | none |
| `03_.../case-study/index.html` | Case Study · NorthStar Meeting Intelligence \| QuantAI | none |
| `03_.../dashboard/index.html` | NorthStar Consulting · Meeting Intelligence Dashboard | none |
| `03_.../diagrams/workflow-diagrams.html` | NorthStar Consulting · Meeting Intelligence Process Maps | none |
| `03_.../walkthrough/demo.html` | NorthStar Meeting Intelligence · Walkthrough Demo | none |
| `04_.../case-study/index.html` | Case Study · Elevate Accounting Client Onboarding \| QuantAI | none |
| `04_.../diagrams/workflow-diagrams.html` | Elevate Accounting · Onboarding Process Maps | none |
| `04_.../tracker/index.html` | Elevate Accounting · Client Onboarding Tracker | none |
| `04_.../walkthrough/demo.html` | Elevate Accounting Client Onboarding · Walkthrough Demo | none |
| `05_.../case-study/index.html` | Case Study · Vertex Engineering AI Operating Model \| QuantAI | none |
| `05_.../diagrams/workflow-diagrams.html` | Vertex Engineering · Operating Model and Pilot Workflow Diagrams | none |
| `05_.../tools/which-ai-decision-tool/index.html` | Which AI for which task, Vertex Engineering decision tool | none |
| `05_.../walkthrough/demo.html` | Vertex Engineering AI Operating Model · Walkthrough Demo | none |
| `tools/templates/report.html` | 6-minute AI check | none. A template, but Pages serves it publicly with `{{TOKENS}}` showing |

19 of 23 pages have no meta description. Those 18 worked-example pages carry
no product copy in their meta, which is what 4.2 asked to confirm. The only
page-level meta that needed changing was the homepage's.

Other things noticed on the pages:

- `index.html` declares `lang="en"`; the landing page uses `en-AU`.
- The homepage calls the five examples "engagements" in the heading ("Five
  engagements, built end to end"). The paragraph under it is honest that
  they're representative scenarios, but the heading alone reads as client
  work. Worth a word change under rule 2 (no fake proof). Not changed here:
  it's copy Dave should choose.
- The Elevate card says "75% less admin" with no "modelled" label beside it.
  Same rule, same reason, same call.

## 5. The five worked examples as audit raw material

| Example | Discovery notes | Opportunity or prioritisation matrix | Benefits arithmetic |
|---|---|---|---|
| 01 BrightPath (financial advice) | `docs/01_discovery_and_maturity_assessment.md` | `docs/02_ai_opportunity_matrix.md` | `docs/before_after_comparison.md`, `tools/benefits_tracker.py` |
| 02 FutureHire (recruitment) | `docs/01_discovery_and_opportunity_assessment.md` | `docs/02_prioritisation_matrix.md` (7 use cases, scored 1 to 5, one explicitly excluded) | `docs/before_after_comparison.md`, `tools/benefits_tracker.py` |
| 03 NorthStar (meetings) | `docs/01_meeting_workflow_audit.md` | none | `docs/08_benefits_model.md`, `tools/benefits_tracker.py` |
| 04 Elevate (accounting) | `docs/01_discovery_and_current_state.md` (six themes, systems list) | **none** | `docs/08_benefits_model.md`, `tools/benefits_tracker.py` |
| 05 Vertex (engineering) | `docs/01_discovery_and_maturity_assessment.md` | `docs/03_workflow_prioritisation_matrix.md` (ten workflows) | `docs/before_after_comparison.md`, `tools/benefits_tracker.py` |

What this means for Phase 2:

- **FutureHire** converts most directly: discovery, a scored matrix, an
  explicit "AI never screens" exclusion, and a 90-day roadmap.
- **Elevate** has good discovery and a benefits model but no matrix. The
  quadrant has to be built, not reshaped.
- **The arithmetic won't carry over as it is.** The examples already use 46
  working weeks, which matches the checker. But they claim 60% to 80% time
  reductions on targeted tasks, and the checker says 20% to 40% of the whole
  repeat load is recoverable. Those aren't contradictory (one is per task, one
  is across everything), but side by side on one site they'll look it. The
  mock-up money slides need to say which one they're using.
- Each example has a `tools/benefits_tracker.py` that regenerates its figures,
  so the Phase 2 rule "arithmetic checked by running it" has something to run.

## 6. noomoo-crm: what's there to lift

Read from `~/Documents/QuantAI/noomoo/noomoo-crm` at `fccb8bc` (clean, level
with `origin/master`).

### Schema conventions (all real, all worth copying)

- Everything in a `crm` schema. `public` is never used, because Supabase's
  default grant there reaches the anon key.
- Explicit `GRANT` to `service_role` only, column by column where it matters.
  RLS enabled with zero policies as the backstop. A default-privilege `REVOKE`
  for anon and authenticated on future tables (`0003`).
- Migrations numbered `NNNN_description.sql`, never edited once applied, each
  ending with its own verification queries and expected output.
- `timestamptz` in UTC, displayed in `Australia/Melbourne`. Money in integer
  cents.
- `crm.activities` is append-only at the privilege layer: `service_role` has
  `SELECT` and `INSERT`, no `UPDATE` or `DELETE` (`0006`). A unique index
  dedupes email events.
- `crm.system_settings` is a singleton row with `sends_paused` defaulting to
  **true** and `daily_send_cap` defaulting to 20 (`0008`).
- Triggers do the things application code mustn't be trusted with: suppression
  changes always write an activity; suppression can't be reversed except by
  hand.

### The send choke point

`supabase/functions/crm-send/index.ts` (413 lines), plus `0010` and `0011`.

- Two phases. `prepare` validates and returns the recipient list and a cap
  snapshot; nothing sends. `confirm` takes a batch id.
- The atomic core is in Postgres: `crm.confirm_batch()` checks the kill
  switch, counts today's attempts under `FOR UPDATE`, and inserts `pending`
  ledger rows before any call to Resend. The whole batch is rejected if any
  check fails.
- `crm.claim_send()` re-checks suppression per recipient immediately before
  the Resend call.
- Merge tokens are a whitelist; an unknown token fails `prepare`.
- The function only accepts the service-role key as bearer. The browser talks
  to a Next route (`web/app/api/send/route.ts`) that holds the key server
  side.
- `supabase/functions/resend-webhook` verifies the Svix signature on raw
  bytes, maps Resend events to activities, drives suppression from bounces and
  complaints, and dead-letters anything it can't attribute.
- `supabase/functions/resend-sync-flush` runs on `pg_cron` every 10 minutes.
  This is the **only** scheduled job, and it exists because it can only ever
  reduce email.

### The sequence worker

Doesn't exist. See 1.2. `0010` says so in a comment: "Deliberately absent:
scheduled_at / send_after / sequence_id / step_number."

The design to build from: one worker on a schedule, reading due steps, calling
the same choke point with the same Postgres-side gates. The `pg_cron` plus
`net.http_post` plus token-header pattern from `resend-sync-flush` is the
proven way to trigger it.

### Auth and middleware

`web/middleware.ts` (23 lines): a single `CRM_PASSPHRASE` env var, hashed into
an `httpOnly` cookie. If the variable is unset the app is **open**. There's
one "user" and no session identity, so activities record the actor as a
literal `'dave'`.

The brief asks for Supabase magic link for one address. That's new work, and
better: copy the server-only Supabase client (`web/lib/supabase.ts`) and
replace the gate.

### UI worth lifting

Next.js 15 App Router, React 19, Tailwind 4, one runtime dependency beyond
Next (`@supabase/supabase-js`). About 3,500 lines of app code.

| File | Lines | Use |
|---|---|---|
| `web/app/pipeline/ui.tsx` + `page.tsx` | 387 | Kanban with native HTML drag and drop, no library. Direct fit for 5.7 |
| `web/app/contacts/[id]/ui.tsx` + `actions.ts` | 632 | Contact page: timeline, notes, stage change, suppress, quick actions |
| `web/components/ContactsTable.tsx` | 397 | Filterable, selectable table |
| `web/app/settings/*` | 393 | Kill switch, cap, signature |
| `web/app/templates/*` | 209 | Template editor |
| `web/app/outreach/page.tsx` | 201 | Prepare and confirm screen |
| `web/app/page.tsx` | 162 | Dashboard: stage counts, 7-day email stats |
| `web/lib/meta.tsx` | 132 | Stage list, badges, display helpers |
| `web/components/Modal.tsx` | 30 | Modal |

It's a dark, emerald-accented theme. It needs re-skinning to the QuantAI
tokens, not just copying.

### Hosting and plan

- App: Vercel project `noomoo-crm` under `dave-s-projects16`, root directory
  `web`, auto-deploys `master`. Live at `noomoo-crm.vercel.app`. **Hobby
  plan** (its own handover note records Hobby-specific quirks). The
  `crm.noomoo.com.au` domain in the brief is listed there as still to do.
- Database: Supabase project `noomoo` (Sydney), shared with the public site.
- Edge Functions deployed from the Supabase dashboard, not from CI.

## 7. Two recommendations

Prices in USD, checked against each vendor's own page on 10 Oct 2026.

### (a) Where the CRM admin is hosted: Cloudflare

| Option | Cost | For | Against |
|---|---|---|---|
| **Cloudflare Workers, free plan** (recommended) | $0. Commercial use allowed. 100,000 requests a day | Same account and deploy tool as the checker. One place for the Stripe, Cal.com and agreement endpoints too | **10 ms CPU per request on free.** A Next.js server-rendered page can exceed that. If it does, Workers Paid is **$5 a month** |
| Vercel Pro | **$20 a month** per seat | noomoo-crm deploys there unchanged | Paid from day one, for a one-user internal tool |
| Vercel Hobby | $0 | Works today | Non-commercial use only. Rules it out |

Recommendation: **Cloudflare, and build the admin to fit the free CPU limit
rather than porting Next.js server rendering wholesale.** In practice: static
pages plus small Worker API routes that talk to Supabase, which is the shape
the checker already has. The noomoo-crm components port across as React; its
server actions become API calls. If that turns out to cost more build time
than it saves, the fallback is the same code on Workers Paid at $5 a month,
still a quarter of Vercel Pro.

Cost line: **$0 a month expected, $5 a month worst case.** Decision D2.

A custom domain (`crm.quantai.com.au`) needs a DNS change at Namecheap either
way. A `workers.dev` or `pages.dev` address works without one.

### (b) Where the database lives: a schema in the `noomoo` project now, its own project before real client material

| Option | Cost | For | Against |
|---|---|---|---|
| New free project | not available | | Both free slots are in use |
| **Separate schema in the existing `noomoo` project** (recommended for Phase 1) | **$0** | Never pauses (the live noomoo site keeps it active). The `crm`-schema conventions are already proven in that exact project. Same region | Shares one service-role key and one 500 MB database with another business. Schema must be named something other than `crm` (suggest `quantai`). Needs adding to that project's exposed schemas |
| Supabase Pro for the org, new project | **$25 a month**, plus **$10 a month** compute for each project beyond the first. With three projects in the org that's about **$45 a month** | Clean separation, no pausing, backups | The brief's own 2 Sep ruling: no Pro until a paying client offsets it |
| A new free org on another login | $0 | Clean separation | Pauses after a week idle. A paused database drops Stripe and Cal.com webhooks on the floor. The 2-project limit is per user, so it may not even be allowed |

Recommendation: **start in a `quantai` schema inside the `noomoo` project at
$0, and move to a dedicated project before the first real interview
transcript is stored.** Phase 1 runs on fictional seed data in Stripe test
mode, so sharing costs nothing in risk yet. Phase 3 stores client interview
transcripts, and those shouldn't sit behind a key that another business's app
also holds. By then a founding audit ($1,500) has paid for a year of Pro
several times over, which is the trigger the 2 Sep ruling asked for. Because
everything is numbered SQL migrations, the move is a replay, not a rewrite.

Cost line: **$0 a month now; $25 to $45 a month from the first real audit.**
Decision D3.

I couldn't confirm which plan the QuantAI Supabase org is on from the CLI. If
it's already Pro, a new project is just $10 a month and the answer changes to
"dedicated project from day one".

## 8. Other costs and risks found on the way

- **Resend.** The brief gives QuantAI its own account with one free domain.
  `send.quantai.com.au` is already verified somewhere and is what the checker
  sends from. If that's the shared account, the new account either takes that
  domain over (and the worker's key changes) or uses `mail.quantai.com.au`
  and the free tier's one domain is spent. Dave to confirm which account
  holds `send.` today.
- **One DNS oddity.** `send.send.quantai.com.au` is a CNAME to
  `send.forge.rmta.net`, which isn't a Resend host. Resend's DKIM record at
  `resend._domainkey.send` is present. Probably the Hermes outbound setup
  sharing the label. Worth a look in the Resend dashboard to confirm the
  domain still shows verified before any sequence depends on it. I haven't
  touched DNS.
- **DMARC is `p=none`** on `quantai.com.au`. Fine for now; worth tightening
  before nurture mail starts.
- **Workers free plan: 50 subrequests per invocation.** A sequence worker that
  sends more than about 40 emails in one run needs batching. At the volumes
  in this brief it won't bite.
- **`tools/templates/report.html` is publicly served.** Harmless, but it's the
  one page on the site showing the $995 offer after Phase 0.
