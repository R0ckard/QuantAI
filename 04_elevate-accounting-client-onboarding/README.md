# Elevate Accounting, Client Onboarding Optimisation

A worked demonstration of how an 18-person Brisbane accounting and advisory firm can turn a slow, inconsistent, partner-by-partner onboarding process into one clear journey that is faster and more consistent, without losing the warm, personal experience clients value.

**Prepared by:** Dave Richardson, QuantAI, Fractional AI Operations and Business Systems Consulting
**Based on brief:** *Client Onboarding Optimisation, Elevate Accounting*

---

## What this repository is

Elevate has doubled in three years, and onboarding has not kept up. Every partner and service line does it differently, so clients get inconsistent emails and document requests, staff keep their own separate checklists, missing documents delay first meetings, reminders are manual and sometimes duplicated, and partners cannot see which onboardings have stalled. The partners want one standard, largely assisted process that still feels personal and gives everyone clear visibility of progress.

This demonstration follows the brief. It maps the onboarding journey across the three core service lines (business advisory, tax compliance, bookkeeping), designs one common journey with service-line variations and exception paths, and builds out the two prototypes that make it real:

1. **The Client Onboarding Assistant**, a Claude Team assistant that drafts every onboarding touch (welcome, document request, reminders, handover) to a consistent, warm, on-brand standard, and requests exactly the right documents for the service line. Staff review and send. It never gives tax, legal or identity-verification advice.
2. **The central onboarding tracker**, a single live view of every onboarding: stage, owner, missing items, next action, and a clear flag when something has stalled, so partners can finally see and steer the whole pipeline.

The future-state process is tested against five representative client scenarios.

## The design principle

> The assistant drafts and organises. A staff member owns the client relationship, reviews every message, and presses send. The firm's judgement, warmth and professional advice stay human.

Identity verification decisions (AML/KYC), tax positions and legal terms stay with qualified staff and the firm's existing controls. The AI removes the administrative load and the blank page, not the relationship or the professional judgement.

## Repository map

| Path | What is inside |
|---|---|
| `docs/` | Discovery and current-state findings, the client journey map and service blueprint, the common journey with three service-line variants and exception paths, the document-request matrix and completeness rules, the onboarding checklist, the dashboard specification, the knowledge-base structure, the five-scenario pilot test report, the benefits model, and the implementation and training plan |
| `prompts/` | The Client Onboarding Assistant prompt library (welcome, document request, reminder, handover), each with guardrails |
| `claude-project/` | Claude Project configuration guide for the Client Onboarding Assistant |
| `templates/` | The email library (welcome, document-request, reminder, handover) and the onboarding checklist |
| `tracker/` | A working, clickable HTML prototype of the central onboarding tracker and dashboard, loaded with the five pilot scenarios |
| `diagrams/` | Current-state and future-state process maps (common journey plus the three service lines) |
| `walkthrough/` | Timed narration script and a clickable HTML demo to record a five to ten minute walkthrough from |
| `case-study/` | Portfolio-ready case-study page (HTML) |
| `tools/` | `benefits_tracker.py`, a reproducible script that builds the benefits-model spreadsheet from the time-savings assumptions |
| `deliverables/` | Rendered, client-ready outputs: `.docx` SOPs, `.xlsx` benefits model |

## Start here

1. Open `tracker/index.html`, the live onboarding tracker prototype (this is the piece partners will love).
2. Open `case-study/index.html`, the one-page overview.
3. Read `docs/03_common_journey_and_service_variants.md`, the standard journey on a page.
4. Look at `prompts/` and `templates/`, the working assistant assets.

## Reproduce the benefits model

```bash
pip install openpyxl
python tools/benefits_tracker.py     # writes deliverables/Elevate_Benefits_Model.xlsx
```

## Push this to your own GitHub

```bash
git add -A && git commit -m "Elevate Accounting client onboarding optimisation, portfolio demonstration"
gh repo create elevate-accounting-client-onboarding --public --source=. --push   # requires gh, or:
# git remote add origin https://github.com/<you>/elevate-accounting-client-onboarding.git
# git branch -M main && git push -u origin main
```

## Scope and honesty notes

This demonstration keeps a staff member in control of every client interaction. The assistant drafts and organises; it does not give tax, legal or identity-verification (AML/KYC) advice, and no message reaches a client without a person reviewing and sending it. The design references Australian professional-practice expectations at a practitioner level (client confidentiality and the Privacy Act 1988 for personal information); it is not legal, tax or compliance advice, and the firm's own controls remain the authority. Time-savings and document-completeness figures are scenario estimates under the assumptions stated in `docs/08_benefits_model.md`.

Elevate Accounting is a representative client scenario used to demonstrate the approach. The figures throughout are modelled estimates under stated assumptions, not measured client outcomes.

## Licence

MIT, see `LICENSE`.
