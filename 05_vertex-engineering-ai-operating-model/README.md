# Vertex Engineering, AI Operating Model

A worked demonstration of how a 52-person Melbourne engineering consultancy can turn three overlapping, under-used AI platforms into one governed operating model, with the judgement of qualified engineers kept firmly in charge.

**Prepared by:** Dave Richardson, QuantAI, Fractional AI Operations and Business Systems Consulting
**Based on brief:** *AI Operating Model for a Professional Services Firm, Vertex Engineering*

---

## What this repository is

Vertex has already bought the tools (Microsoft Copilot, Claude Team, ChatGPT Enterprise) but adoption is low and fragmented: overlapping tools with no decision rules, managers who cannot connect licence spend to benefit, knowledge trapped in individuals and project folders, and technical staff worried about accuracy, confidentiality and professional liability. Leadership is right to treat this as an operating-model change, not a technology rollout.

This demonstration follows the brief. It designs the firm-wide operating model and the two things that make it stick, a clear "which AI for which task" decision framework and an engineering-grade governance layer, prioritises all ten workflows, and builds out **three representative prototypes** end to end:

1. **Proposals and bids**, faster, more consistent bid drafting from a structured brief.
2. **Technical report drafting and QA**, structure, clarity and consistency on reports, with the qualified engineer as the decisive reviewer. The AI never performs, checks or certifies engineering.
3. **Project status reporting**, reliable client and internal status updates from project data.

## The design principle

> The AI assists. A qualified professional decides and signs. No AI output touches a client, a certificate or a calculation without a competent human owning it.

Engineering design, calculation, verification and certification are out of scope and out of bounds. The AI removes drafting and admin effort, not professional judgement or accountability.

## Repository map

| Path | What is inside |
|---|---|
| `docs/` | Discovery and maturity assessment, current and target operating model, ten-workflow prioritisation, the tool-selection and approved-use framework, governance and assurance, capability matrix and AI Champions programme, the three pilot designs, before/after, executive dashboard spec, roadmap |
| `playbooks/` | A firm-wide "AI ways of working" playbook |
| `prompts/` | Reusable prompt library for the three pilots, each prompt with guardrails and assurance checks |
| `claude-project/` | Claude Project configuration guides for each pilot |
| `tools/` | `benefits_tracker.py`, a reproducible script that builds the benefits-tracker spreadsheet from the time-savings model |
| `diagrams/` | Current and target operating-model diagram, plus current and future-state diagrams for the three pilots (HTML) |
| `walkthrough/` | Timed narration script and a clickable HTML demo to record a five to ten minute walkthrough from |
| `case-study/` | Portfolio-ready case-study page (HTML) |
| `deliverables/` | Rendered, client-ready outputs: `.docx` (SOP and governance framework), `.xlsx` benefits tracker |

## Start here

1. Open `case-study/index.html`, the one-page overview.
2. Read `docs/04_tool_selection_and_approved_use.md`, the decision rules for three platforms. This is the piece most firms are missing.
3. Skim `docs/02_operating_model_current_and_target.md`, the model on a page.
4. Look at `prompts/` and `claude-project/`, the working prototype assets.

## Reproduce the benefits tracker

```bash
pip install openpyxl
python tools/benefits_tracker.py     # writes deliverables/Vertex_Benefits_Tracker.xlsx
```

## Push this to your own GitHub

```bash
git add -A && git commit -m "Vertex Engineering AI Operating Model, portfolio demonstration"
gh repo create vertex-engineering-ai-operating-model --public --source=. --push   # requires gh, or:
# git remote add origin https://github.com/<you>/vertex-engineering-ai-operating-model.git
# git branch -M main && git push -u origin main
```

## Scope and honesty notes

This is a high-stakes professional setting. In this demonstration the AI never performs engineering design, calculation, verification or certification, and never issues anything a client sees without a competent human reviewing and owning it. The governance framework references Australian professional-practice expectations (engineers' duty of care and registration obligations, and the Privacy Act 1988 for personal information) at a practitioner level; it is not legal or professional-indemnity advice. Time-savings figures are scenario estimates under the assumptions stated in `docs/before_after_comparison.md`.

Vertex Engineering is a representative client scenario used to demonstrate the approach. The figures throughout are modelled estimates under stated assumptions, not measured client outcomes.

## Licence

MIT, see `LICENSE`.
