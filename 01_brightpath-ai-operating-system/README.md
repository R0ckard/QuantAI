# BrightPath AI Operating System, Portfolio Demonstration

A worked demonstration of how a 32-person Australian financial-planning firm can turn ad-hoc use of Claude and ChatGPT into a **governed, repeatable AI operating system**, with two workflows built out end-to-end as working prototypes.

**Prepared by:** Dave Richardson · QuantAI, Fractional AI Operations & Business Systems Consulting
**Based on brief:** *AI Workflow Audit & Operating System, BrightPath Financial Services*

---

## What this repository is

The brief asks for a firm-wide AI operating system across six workflows. This demonstration follows the brief's own "pilot two workflows" scope: it **maps all six at a summary level**, then goes **deep on the two pilots**, *Advice Preparation* and *Client Communications*, with assets you could actually run on Monday:

- reusable, quality-checked **prompt library**,
- **Claude Project** architecture and configuration,
- **governance** and human-review framework fit for regulated financial advice,
- **current- and future-state** workflow diagrams,
- a **before/after** time-savings model with explicit assumptions,
- editable **SOPs**, and
- a **90-day roadmap** with a benefits tracker.

## Repository map

| Path | What's inside |
|---|---|
| `docs/` | Discovery & AI-maturity assessment, opportunity matrix, operating-system overview, governance, the two pilot designs, before/after, 90-day roadmap |
| `playbooks/` | Role-based AI playbook (Advisers; Client Services summary) |
| `prompts/` | The reusable prompt library, advice-prep and client-comms, each prompt with purpose, inputs, guardrails and quality checks |
| `claude-project/` | Claude Project configuration guides (instructions, knowledge, connectors) for each pilot |
| `sops/` | Editable Standard Operating Procedures (Markdown source; `.docx` versions in `deliverables/`) |
| `tools/` | `benefits_tracker.py`, reproducible script that builds the benefits-tracker spreadsheet from the time-savings model |
| `diagrams/` | Current-state and future-state workflow diagrams (HTML/SVG) |
| `walkthrough/` | Timed narration script + a clickable HTML demo to record a 5-10 min Loom from |
| `case-study/` | Portfolio-ready case-study page (HTML) |
| `deliverables/` | Rendered, client-ready outputs: `.docx` SOPs, `.xlsx` benefits tracker |

## Start here

1. Open `case-study/index.html`, the one-page overview.
2. Skim `docs/03_operating_system_overview.md`, the model in one page.
3. Look at `prompts/` and `claude-project/`, the working prototype assets.
4. Read `docs/before_after_comparison.md`, the scenario time-savings, with assumptions.

## Reproduce the benefits tracker

```bash
pip install openpyxl
python tools/benefits_tracker.py    # writes deliverables/BrightPath_Benefits_Tracker.xlsx
```

## Push this to your own GitHub

```bash
# from the repo root
git add -A && git commit -m "BrightPath AI Operating System, portfolio demonstration"
gh repo create brightpath-ai-operating-system --public --source=. --push   # requires gh, or:
# git remote add origin https://github.com/<you>/brightpath-ai-operating-system.git
# git branch -M main && git push -u origin main
```

## Scope & honesty notes

Regulated advice in this demonstration always remains subject to **qualified human review**, the AI drafts, a licensed adviser decides. The governance framework references Australian obligations (Corporations Act best-interests duty, ASIC RG 175, Privacy Act 1988 / APPs) at a **practitioner** level; it is not legal or compliance assurance. Time-savings figures are scenario estimates under the assumptions stated in `docs/before_after_comparison.md`.

BrightPath is a representative client scenario used to demonstrate the approach; the figures throughout are modelled estimates under stated assumptions, not measured client outcomes.

## Licence

MIT, see `LICENSE`.
