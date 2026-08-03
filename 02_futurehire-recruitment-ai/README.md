# FutureHire Recruitment, AI Transformation

A worked demonstration of how a 30-person Sydney technology-recruitment agency can give recruiters their time back, turning manual, inconsistent admin into three AI-assisted workflows that keep a recruiter in control and a fair, private process by design.

**Prepared by:** Dave Richardson · QuantAI, Fractional AI Operations & Business Systems Consulting
**Based on brief:** *Recruitment AI Transformation, FutureHire Recruitment*

---

## What this repository is

FutureHire's problem isn't a lack of AI, recruiters already have Claude and ChatGPT. It's that productivity has plateaued under admin: drafting, note-taking, updating Bullhorn, and rekeying the same information between systems. Earlier automation failed because tools were dropped in without redesigning the workflow or supporting adoption.

This demonstration follows the brief's scope and builds the **three named prototype workflows** end-to-end, as assets recruiters could use on Monday:

1. **Job-ad drafting**, a consistent, inclusive, on-brand ad from an intake brief.
2. **Interview summarisation**, structured, evidence-based candidate summaries and interview notes from rough notes.
3. **Hiring-manager updates**, clear, professional client updates from pipeline status.

Around them: a recruiter prompt library and playbook, candidate-communication and interview templates, a Hiring-Manager Toolkit, Bullhorn field/handoff recommendations, a fairness-and-privacy governance framework, current/future-state maps, a before/after time-savings model, editable SOPs, and a 90-day rollout roadmap.

## The design principle

> **AI drafts, a recruiter decides. It never screens or selects candidates. Every candidate is treated fairly and their data is handled with care.**

Autonomous candidate screening and employment decisions are explicitly out of scope (and out of bounds). The AI removes typing, not judgement.

## Repository map

| Path | What's inside |
|---|---|
| `docs/` | Discovery & opportunity assessment, prioritisation matrix, candidate journey & service principles, governance (fairness/privacy), the three pilot designs, before/after, Bullhorn recommendations, 90-day roadmap |
| `playbooks/` | Recruiter AI playbook |
| `prompts/` | Reusable prompt library, job-ad, interview-summary, client-updates, candidate-comms, each with guardrails, fairness and quality checks |
| `claude-project/` | Claude Project configuration guides for each pilot |
| `templates/` | Structured interview-note & candidate-summary templates, Hiring-Manager Toolkit, candidate-communication template library |
| `tools/` | `benefits_tracker.py`, reproducible script that builds the benefits-tracker spreadsheet from the time-savings model |
| `diagrams/` | Current-state and future-state workflow diagrams (HTML/SVG) |
| `walkthrough/` | Timed narration script + a clickable HTML demo to record a 5-10 min walkthrough from |
| `case-study/` | Portfolio-ready case-study page (HTML) |
| `deliverables/` | Rendered, client-ready outputs: `.docx` SOPs, `.xlsx` benefits tracker |

## Start here

1. Open `case-study/index.html`, the one-page overview.
2. Skim `docs/04_governance_fairness_privacy.md`, the fairness & privacy backbone.
3. Look at `prompts/` and `templates/`, the working prototype assets.
4. Read `docs/before_after_comparison.md`, the scenario time-savings, with assumptions.

## Reproduce the benefits tracker

```bash
pip install openpyxl
python tools/benefits_tracker.py     # writes deliverables/FutureHire_Benefits_Tracker.xlsx
```

## Push this to your own GitHub

```bash
git add -A && git commit -m "FutureHire Recruitment AI Transformation, portfolio demonstration"
gh repo create futurehire-recruitment-ai --public --source=. --push   # requires gh, or:
# git remote add origin https://github.com/<you>/futurehire-recruitment-ai.git
# git branch -M main && git push -u origin main
```

## Scope & honesty notes

Recruitment is a high-stakes, regulated area for fairness and privacy. In this demonstration the AI never screens, ranks or selects candidates and never makes employment decisions, a recruiter reviews and owns every output before it's used externally. The governance framework references Australian obligations (Privacy Act 1988 / APPs, and anti-discrimination principles) at a **practitioner** level; it is not legal advice. Time-savings figures are scenario estimates under the assumptions stated in `docs/before_after_comparison.md`.

FutureHire is a representative client scenario used to demonstrate the approach; the figures throughout are modelled estimates under stated assumptions, not measured client outcomes.

## Licence

MIT, see `LICENSE`.
