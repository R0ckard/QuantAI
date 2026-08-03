# Pilot 1: Proposals and Bids

*Vertex Engineering. Highest-value workflow: faster, more consistent bids from a structured brief.*

## Why this pilot

Proposals and bids is where Vertex competes for revenue, and today every bid starts close to a blank page. Good material exists (past proposals, capability statements, project references) but it is trapped in individuals and folders, so each bid re-solves problems the firm already solved. The prize is not just speed, it is consistency and win-readiness: reusing the firm's best material every time instead of whatever the author can find.

The tool is **Claude** (long-form, structured, reuse-heavy), inside Claude Team. Confidential client and commercial detail stays in the enterprise instance.

## Current state

```
  Bid arrives
     |
  Author hunts for a similar past proposal to copy
     |
  Rewrites boilerplate from scratch (approach, quality, safety, team)
     |
  Chases colleagues for CVs and project references
     |
  Drafts, self-edits, reformats to look consistent
     |
  Bid lead reviews (often finds tone and structure drift)
     |
  Submit
```

Effort is duplicated, quality depends on who wrote it, and the firm's best phrasing is rediscovered rather than reused.

## Target state

```
  Bid arrives
     |
  Author fills a short structured bid brief (client, scope, differentiators, constraints)
     |
  Claude drafts from the brief + the firm's reuse library (approved boilerplate, CVs, references)
     |
  Author reviews, tailors the win themes, drops in the right project references
     |
  Bid lead reviews a consistent, on-template draft (reviews content, not formatting)
     |
  Submit  ->  the best new phrasing is saved back to the reuse library
```

The human still owns the win strategy and every client-specific claim. AI removes the blank-page and boilerplate cost and enforces consistency. Crucially, the loop closes: good new material is captured once and reused.

## The workflow, step by step

1. **Structured bid brief.** The author completes a short intake (a form in the Claude Project): client and sector, scope and deliverables, the two or three differentiators, key personnel, constraints (budget signal, deadline, format), and any must-address evaluation criteria.
2. **Draft.** Claude drafts the proposal using the bid brief plus the firm's reuse library: approved approach, quality, safety and sustainability boilerplate, CV blocks, and project references matched to the sector.
3. **Human tailoring.** The author sharpens the win themes, confirms the right references and personnel, and checks every client-specific claim. This is where judgement goes.
4. **Consistency QA.** A second prompt checks the draft against the firm proposal template and tone, and lists anything unsupported or inconsistent for the human to resolve.
5. **Bid-lead review.** Unchanged from today, except the draft arrives consistent and on-template, so review is about strategy and substance, not formatting.
6. **Capture.** Any strong new phrasing (a crisp differentiator, a well-written approach) is added to the reuse library so the next bid starts stronger.

## Guardrails

- **No invented facts.** Claude drafts only from the brief and the reuse library. Any claim about experience, personnel, certifications or track record must trace to real firm material; the QA prompt flags unsupported claims for the human.
- **Human owns the win strategy and every client claim.** AI never decides positioning or asserts capability the firm cannot back.
- **Confidential in-tenant only.** Client and commercial detail stays in Claude Team.
- **Reuse library is curated.** Only approved, current boilerplate goes in; the BD Champion owns it.

## What good looks like

A bid lead receiving a first draft that is already on-template, consistent in tone, populated with the right reusable content, and honest about what still needs a human decision, produced in a fraction of the time, with the firm's best material working for every bid instead of the last one the author happened to remember.

## Scenario time model (see `before_after_comparison.md`)

Proposals is modelled at the firm's bid volume with a per-bid saving on drafting and boilerplate, netting roughly 497 hours a year at a 25-33% cycle-time reduction, comfortably above the brief's 15% bar. Figures are scenario estimates under stated assumptions.
