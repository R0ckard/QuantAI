# 90-Day Implementation Roadmap & Benefits Tracker

*Indicative plan aligned to the brief's 8-week engagement, then a 90-day adoption horizon.*

## Engagement (weeks 1-8), from the brief

| Phase | Weeks | Outcome |
|---|---|---|
| Mobilise & discover | 1-2 | Kickoff, access, interviews, baseline measures |
| Analyse & design | 2-4 | Current-state findings, opportunity matrix, operating-system design, governance |
| Prototype & test | 4-7 | Configure the two pilot Projects + prompt library; controlled testing against ≥20% target |
| Enable & hand over | 7-8 | Training, AI Champions, final docs, roadmap, acceptance |

## 90-day adoption (post-handover)

**Days 0-30, Embed the two pilots.**
Roll the advice-prep and client-comms Projects to their teams. AI Champions run weekly office hours. Capture baseline vs actual in the benefits tracker. Governance signed by all staff.
*Gate:* both pilots sustaining ≥20% cycle-time in live use; zero governance breaches.

**Days 31-60, Prove and tune.**
Refine prompts from real usage; publish the first "what good looks like" examples to the prompt library. Begin workflow 3 (meeting capture) configuration using the proven pattern.
*Gate:* adviser-rated draft quality ≥4/5; review pass-rate steady or improved.

**Days 61-90, Extend.**
Stand up workflow 3, scope workflows 4-5 (proposals, internal knowledge, the latter after knowledge consolidation). Firm-level benefits review with the Steering Group; decide phase-2 investment.
*Gate:* Steering Group approves phase-2 scope on the evidence.

## Benefits tracker (the living measure)

A simple sheet the AI Champions keep current, built reproducibly by `tools/benefits_tracker.py` and delivered as `deliverables/BrightPath_Benefits_Tracker.xlsx`. It carries:

- **Assumptions** (editable inputs, one place).
- **Pilot models**, advice prep and client comms, with cycle-time % and hours/value reclaimed.
- **Opportunity matrix**, the live scoring from `02_ai_opportunity_matrix.md`.
- **Adoption log**, a template for recording actual measured results as they replace the scenario estimates.

The tracker is designed so that as real measurements come in, the scenario numbers are swapped for actuals and the ROI recomputes, turning the portfolio model into a real management dashboard.

## What success looks like at day 90

Two workflows demonstrably faster and more consistent, a third underway, governance embedded, a Champion in each department, and a Steering Group holding evidence, not anecdotes, to decide how far to take AI next.
