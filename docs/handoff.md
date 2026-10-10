# QuantAI site and the 6-minute AI check · handoff

Last updated 10 Oct 2026, end of session. Architecture, conventions, commands
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
- **Homepage (`index.html`):**
  - title "QuantAI · AI consulting for Australian businesses · Melbourne",
    new meta description, eyebrow "QuantAI · Quantified AI consulting ·
    Melbourne"
  - "What I build" is three cards: noomoo, CarbonCut, the GTM engine. The
    Wattlebid card and the six tooling cards are gone
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
- **Tests:** tools 17 pass and 1 skipped (the live drafting test, no
  `tools/.env` in this clone), worker 10 pass.

## Confirmed live (10 Oct)

- `origin/main` is at `1253de2` and the working tree is clean.
- quantai.com.au serves the new title, the founding offer and the Cal.com
  link.
- Worker health returns `{"ok":true}`.

**Not confirmed:** whether the worker has been redeployed since these
changes. Until it is, the alert subject still says "land the $995" and the
email signature text still shows the Calendly link. Nothing breaks either
way. `cd worker && npm run deploy`.

## What's next

1. **Phase 1, slice 1: the pipeline board, in the GTM engine.** Not started,
   and Dave has not yet said go. Read `QUANTAI-CONSULTANT-REBUILD-PHASE-1-v3.md`
   and the engine's own `CLAUDE.md` and `docs/handoff.md` first. Branch from
   the engine's `main` (`feat/review-inbox` merged as PR 134). Fictional data,
   no sends, show the SQL before any migration.
2. **Slice 2 touches this repo.** The worker passes each submission on to the
   engine; insurance broking and not-for-profit are added to question 1.6
   (codes added only, worker deployed before the site); a `?sector=` prefill;
   a separate unticked consent box; and page 3 of the report
   (`tools/templates/report.html`) plus the CLOSE instruction in
   `tools/lib/draft-prompt.js` stop describing the $995 assessment.
3. **Until slice 2 lands:** a respondent scoring 15 or more still gets a PDF
   offering the $995 assessment. Strip the `<!--PRICE-->` block from
   `tools/out/<id>.html` by hand before rendering.
4. **Run the report pipeline end to end on a real submission.** Still never
   done. It needs `tools/.env`, which exists only in the old clone at
   `~/Desktop/QuantAI/tools/.env` (and that copy still has the Calendly URL).
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
6. **The how-I-work PDF** still says "Fractional AI operations". The HTML is
   fixed; the PDF needs re-exporting.
7. **Homepage `lang`** is `en`; the landing page uses `en-AU`. No canonical
   links, `robots.txt` or `sitemap.xml` exist, and GitHub Pages isn't
   enforcing HTTPS. All Phase 2 or Phase 4 work.
8. Carried over from the check project, still open: scoring for the wider
   audience (size points, billable-hours assumption), whether `check/` stays
   `noindex`, moving the worker off `*.workers.dev` (DNS is on Namecheap, so
   that's a DNS change), the family-split bias towards documents, and the
   known flaw on Model rows 24 to 25 of Dave's `admin-load-scoring.xlsx`.

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

From this session:

- **Working in `~/Documents/QuantAI/QuantAI/Website/QuantAI-repo` or
  `~/Desktop/QuantAI`.** Both are iCloud-synced. The first is stale since
  13 Aug and git fails there. Use `~/Projects/QuantAI`.
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
