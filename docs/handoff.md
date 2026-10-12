# QuantAI site and the 6-minute AI check · handoff

Last updated 13 Oct 2026, as Phase 1 slice 2 went live. Architecture, conventions, commands
and settled decisions live in `CLAUDE.md`. This file is status only. Rewrite
it at each checkpoint; don't append.

## Objective

QuantAI is moving from selling automations to selling AI consulting, with a
paid audit as the product. The plan is in two files outside this repo, in
`~/Documents/QuantAI/Consulting/Briefs/`:

- `QUANTAI-CONSULTANT-REBUILD-BRIEF.md` (v2): the whole rebuild, Phases 0 to 4.
- `QUANTAI-CONSULTANT-REBUILD-PHASE-1-v3.md`: replaces section 5 of v2. It
  carries Dave's decisions of 10 Oct and the state of every input he owes.
  **Where the two disagree, v3 wins.**

Phase 0 (survey and quick fixes to this site) is finished and live. Phase 1
(what happens after somebody fills in the check: pipeline, booking,
follow-ups, agreement, payment) has not started, and **it does not get built
in this repo.** It is a module in the GTM engine at
`~/Projects/S&M/gtm-engine`.

## What's done

- **Phase 0 survey:** `docs/SURVEY.md`. How the check is built, every page's
  title and meta, the five worked examples as raw material, what noomoo-crm
  really contains, and where the v2 brief was wrong. One part is now
  superseded: its section 7 recommends Cloudflare hosting and a Supabase
  schema, and Dave has since chosen the GTM engine (Vercel and Neon) instead.
- **Site copy audit (11 Oct):** Dave asked for an AI-slop audit of the site
  and had all of it applied, in two passes (`5391daa`, `d54ed7d`), plus the
  noomoo card. Wording only: no scoring, answer codes, links or prices
  changed. It covered the homepage, the check landing page, the how-I-work
  page and the five demonstration pages. The check itself (`check/`) was
  clean and wasn't touched. Not covered: the walkthrough demos, diagrams,
  dashboards, READMEs and docs inside the five example folders.
  - Homepage: new hero ("Find out what the admin's costing you, and what's
    worth fixing with AI."), "What I help with" is five plain cards (the
    audit card went, since "Where to start" covers it), and "How I work" is
    one paragraph headed "If you bring me back to build it" with the four
    step boxes removed
  - Check landing page: three claims about past reports came out because
    nothing backs them yet ("in my experience it's rarely the part people
    point at first" and two like it). Don't put them back until real
    reports have gone out
  - How-I-work page: opens with the call and the audit, then describes the
    build as what follows. "Alongside client engagements" is gone
  - Demonstration pages: each says at the top that it's built around a
    made-up business, the title says "Demonstration" and not "Case Study",
    "What was delivered" is "What's in the repository", and 01 and 02 now
    say the figures aren't measured client outcomes
- **Homepage (`index.html`):**
  - title "QuantAI · AI consulting for Australian businesses · Melbourne",
    new meta description, eyebrow "QuantAI · Quantified AI consulting ·
    Melbourne"
  - "What I build" is three cards: noomoo, CarbonCut, the GTM engine. The
    Wattlebid card and the six tooling cards are gone. The noomoo card says
    what the CRM does in plain words: unsubscribes and bounces are
    suppressed (Dave's wording, 11 Oct)
  - the "Five engagements" section and its nav link are gone. The five
    example folders are still live at the same URLs and are mentioned once,
    in the approach section, as demonstrations built around made-up businesses
  - "Where to start" sets out how the audit works and the founding offer
    ($1,500 + GST, three spots). The $995 block and its guarantee are gone
- **Check landing page (`admin-load-check.html`):** the four mentions of the
  paid assessment now describe the audit. Nav link points at `/#build`.
- **Descriptor:** "Quantified AI consulting" replaces "Fractional AI
  operations" on the how-I-work page, the five case-study pages and their
  READMEs.
- **Old offers removed from code:** `$995` and `$295` no longer appear in
  `check/model.js` (publicly served) or the alert email subject. Wording only;
  no scoring, thresholds or answer codes changed.
- **Booking:** every Calendly link is now `https://cal.com/dave-richardson/15min`
  (homepage, landing page, email signature text, the pipeline's default).
- **Cal.com (Dave's account):** three event types, all on Zoom. `15min`
  (15 minutes plus a 5 minute buffer, public), `audit-interview` (45, hidden
  from profile), `audit-debrief` (60, hidden from profile). Webhooks are
  available on his plan.
- **Tests (12 Oct, on the slice 2 branch):** worker 16 pass; tools 18 pass
  and 1 skipped (the live drafting test, run without the Anthropic key).
  `tools/` now has its `node_modules`.

## Confirmed live (11 Oct)

- `origin/main` was at `d54ed7d` with both copy passes in it, before the
  commit that carries this file and the noomoo card.
- quantai.com.au serves the audited copy on the homepage, the check landing
  page and the BrightPath demonstration page (curled, one line each). The
  noomoo card wording isn't live until that last commit is pushed.
- Worker health returns `{"ok":true}`.

The worker was redeployed on 13 Oct (version `a5bb5095`), so the alert
subject and signature changes from 10 Oct are live too. Until it is, the alert subject still says "land the $995" and the
email signature text still shows the Calendly link. Nothing breaks either
way. `cd worker && npm run deploy`.

## What's next

1. **Phase 1, slice 1 (the pipeline board) is live** in the GTM engine at
   `/pipeline`, merged as PR 135 on 12 Oct. Dave tried it and it works.
2. **Slice 2 (the check feeds the board) went live on 13 Oct.** The engine
   half is merged (PR 136, migration ran), `CHECK_INTAKE_TOKEN` is set in
   Vercel, the worker has `ENGINE_TOKEN` and was deployed that morning, and
   the four fixtures filed and were read back from production: one per
   routing, all in "Check submitted", all flagged as tests. The website is
   the commit that carries this file. `CLAUDE.md` has how it works under
   "Single sources of truth". Still to do:
   - **Dave fills in the live check with his own address** as the real
     end-to-end test (it files as a test deal), then clears the test deals.
   - **A wording fix is waiting in the engine** on
     `fix/small-business-next-step`: a 1 to 5 person business's next step
     said both "a paid audit does not fit" and "land the audit".
   - **`tools/.env` holds the token** as `ENGINE_TOKEN`. It's the only saved
     copy outside Vercel and Cloudflare.
3. **Slices 3 to 5 wait on the GoHighLevel snapshot** (Dave, 13 Oct). Nobody
   has read Carly Meyers' actual build; the plan follows the brief's summary
   of it. Booking, follow-ups and the offer-to-payment steps are the parts
   her workflows, sequences and terms would shape, so they don't start until
   the snapshot has been gone through with Dave in Chrome (read only) and
   compared with what's built and planned. Her build may also use SMS, which
   this plan doesn't. The trial runs 30 days from the night of 13 Oct.
   **Decided:** the consent box keeps the words "Send me occasional practical
   notes on AI in a business like mine. Unsubscribe any time." **Still
   open:** the last screen says "Your answers are used to write your report
   and nothing else", which stops being the whole truth once follow-ups send.
4. **Run the report pipeline end to end on a real submission.** Still never
   done. It needs `tools/.env`, which is now in this clone (copied from the old
   Desktop clone on 10 Oct) and still has the Calendly URL.
5. **Add two cards to "What I build"** when they exist: the DM automations
   (Dave expected them on 11 Oct) and the Content Engine. They were held back
   so nothing unbuilt is listed as built.
6. **Phase 2 (sector pages and mock-up audits)** is where the five worked
   examples get reused. See `docs/SURVEY.md` section 5.

## Open questions

1. **Agreement record:** saved text plus an emailed copy, or a PDF as well?
   Default is no PDF. Dave hasn't answered.
2. **Not-for-profit discount:** standard price less 20% is decided. Assumed
   not to apply to the flat founding price. Dave hasn't confirmed.
3. **Engagement terms:** parked until Dave's capture of the Carly Meyers
   GoHighLevel snapshot (input I4) has been read.
   `QUANTAI-AUDIT-TERMS-DRAFT-v0.1.md` in the Briefs folder is a draft he has
   not approved. Don't build on it and don't rewrite it before I4.
4. **Resend:** Dave was moving `send.quantai.com.au` out of the shared noomoo
   account into QuantAI's own on 10 Oct. Outcome unknown. If it moved, the
   worker's `RESEND_API_KEY` secret and `tools/.env` need the new key, and the
   check's emails fail until they have it. The noomoo account also showed an
   unpaid invoice that day.
5. **Vercel free plan:** the GTM engine runs on it and Vercel restricts it to
   non-commercial use. Dave knows. The only free way off is his Contabo VPS,
   which he has parked as later work.
6. **The how-I-work PDF** still says "Fractional AI operations" and now
   differs from the HTML in most paragraphs after the 11 Oct copy changes.
   It needs re-exporting by hand.
7. **Homepage `lang`** is `en`; the landing page uses `en-AU`. No canonical
   links, `robots.txt` or `sitemap.xml` exist, and GitHub Pages isn't
   enforcing HTTPS. All Phase 2 or Phase 4 work.
8. Carried over from the check project, still open: scoring for the wider
   audience (size points, billable-hours assumption), whether `check/` stays
   `noindex`, moving the worker off `*.workers.dev` (DNS is on Namecheap, so
   that's a DNS change), the family-split bias towards documents, and the
   known flaw on Model rows 24 to 25 of Dave's `admin-load-scoring.xlsx`.

9. **Routing after a check:** this file lists the thresholds as settled,
   while `CLAUDE.md` says whether they still fit the audit ladder is an open
   decision for Dave. Raised with him on 11 Oct, not answered.
10. **Stat labels and tag strips:** the three stat labels on the check
    landing page ("To answer. Most of it is one tap.") and the small tag
    strips on the demonstration pages were left as labels. Dave hasn't said
    whether he wants them rewritten too.

Settled, don't reopen:

- The email footer. Dave's commercial emails are fine as they are. **Don't
  ask him about an address or sender identity again.**
- Stripe. He supplies the account and test keys when the payment slice is
  actually blocked. Don't ask before then.
- Routing thresholds are unchanged, including steering 1 to 5 person
  businesses away from a paid offer.
- Three touches then silence for everyone; nurture only for people who tick
  the consent box.
- No ongoing monthly costs. Don't propose a paid plan as a fallback.

## Dead ends already ruled out, don't retry these

From the 13 Oct go-live:

- **Handing Dave a token to carry between steps.** He generated one to the
  clipboard, it was overwritten, and Vercel ended up holding a token nothing
  else had. Write a new secret straight into `tools/.env` and pipe it from
  there into `wrangler secret put` and `vercel env add`, so nothing is
  pasted. Strip the newline for Vercel (`tr -d '\n'`).
- **Setting a Vercel variable and expecting the running deployment to have
  it.** It needs a redeploy (`vercel redeploy <deployment url>`).
- **`wrangler` as a bare command in `worker/`.** It isn't installed there.
  The deploy script now calls `npx wrangler`.
- **Giving instructions after the step they apply to.** "Save the token"
  came after he'd already moved on. Put the thing that can't be undone first.

From the 11 Oct copy session:

- **Fixing slop by compressing it.** A first set of rewrites cut the filler
  down to short punchy sentences and Dave rejected the lot as more AI slop
  ("Nobody writes 4 word sentences, only AI does that"). Write longer,
  connected sentences. The `my-writing-style` skill now has the rejected and
  accepted versions side by side, and `plain-english-ai` is a new skill for
  explainer content (LinkedIn posts and site pages). Both live in
  `~/quantai/skills/`, which is a local git repo with no remote. The
  explainer skill is waiting on Dave's recordings for its examples.
- **Judging the live site from an open browser tab.** Dave saw old copy
  after a push because of his browser cache. Curl the page, or hard refresh.

From the 10 Oct session:

- **Working in `~/Documents/QuantAI/QuantAI/Website/QuantAI-repo` or
  `~/Desktop/QuantAI`.** Both were iCloud-synced clones and both were removed
  on 11 Oct (as was a Codex copy under `~/Documents/Codex`). `~/Projects/QuantAI`
  is the only clone. Don't recreate one under Desktop or Documents.
- **Treating noomoo-crm as the pattern library for sequences.** It has no
  sequence worker, no sequences as JSON, no dry-run send mode, no magic-link
  login, no one-click unsubscribe and no suppression table. Its `CLAUDE.md`
  states them as rules; the code doesn't have them. The GTM engine has
  working versions of most.
- **Assuming the GTM engine is on the Hermes VPS and out of scope.** The v2
  brief says so and it's wrong. It's `~/Projects/S&M/gtm-engine`, on Vercel
  and Neon, and its ADR 0002 says every new component is a module there.
- **A new Supabase project.** Both free slots are in use (`noomoo`,
  `carboncut-prod`). And the `crm` schema name is taken in `noomoo`.
- **A separate CRM app on Cloudflare or Vercel.** Superseded by building
  inside the engine.
- **`mail.quantai.com.au` for nurture or transactional email.** It's the
  engine's cold outreach mailbox. Consented mail goes from
  `send.quantai.com.au`.
- **`timeout` in zsh on this Mac.** It isn't installed. Use
  `cmd & pid=$!; (sleep 30; kill $pid) & wait $pid` around anything that
  touches an iCloud folder.
- **Unquoted `--include=*.js` with grep in zsh.** It errors "no matches
  found". Quote the pattern.
- **Reading plan details from vendor pricing pages.** Cal.com's doesn't say
  which plan gets webhooks, and the Supabase CLI doesn't show the org's plan.
  Ask Dave for a screenshot of the account instead.

Carried over from the check project:

- **Cloudflare "Set up with Spin" for Turnstile.** Declined for "Add widget
  manually". Spin auto-wires a backend that was already done by hand.
- **`preview_start` on a path under `~/Desktop`.** Hangs. Browser pane tabs on
  `file://` pages also can't be screenshotted or scripted. Use
  `python3 -m http.server` in background Bash.
- **Installing `wrangler` with `npm install` in `worker/` on a nearly full
  disk.** Use `npx wrangler`, and check `df -h /` first. The Mac had 5.8 GB
  free on 10 Oct.
- **Driving LinkedIn with Claude in Chrome.** The page never reaches
  document_idle; text extraction and screenshots time out. Give Dave the text
  to paste.
- **Headless Chrome for narrow or anchored screenshots.** Windows under about
  500px clip the right edge, and `#fragment` URLs don't scroll. Render tall
  and crop with `sips`.
- **Taking "pushed" to mean live.** Always `git fetch && git status -sb` and
  curl the live page before recording anything as live.
- **Comparing test runs in a `git worktree` at HEAD.** `tools/.env` isn't in
  the worktree, so the live drafting test skips and pass counts differ by one.
- **`echo =====` in zsh.** `=word` is expansion and kills the rest of a `&&`
  chain. Use `echo "---"`.
