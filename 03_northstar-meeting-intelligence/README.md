# NorthStar Consulting, Meeting Intelligence Platform

A worked demonstration of how a 65-person professional services firm running about 120 meetings a week can turn its transcripts into reliable organisational memory: consistent minutes, decisions, risks and actions that carry forward and are visible to managers across teams, with a human reviewing everything before it is published.

**Prepared by:** Dave Richardson, QuantAI, Fractional AI Operations and Business Systems Consulting
**Based on brief:** *Meeting Intelligence Platform, NorthStar Consulting*

---

## What this repository is

NorthStar has a memory problem, not a meeting problem. Decisions are hard to retrieve, actions are captured inconsistently and often without an owner or a due date, incomplete actions are not carried into the next meeting, and managers cannot see overdue work across teams. The same discussions get repeated because nothing reliable is written down. The tools are already there (Microsoft Teams, Otter.ai, SharePoint, Planner, Lists, Outlook, Power BI and Claude Team); what is missing is a consistent method and a shared, accountable record.

This demonstration follows the brief. It audits the meeting workflow, defines a taxonomy of five meeting types with a minimum record standard for each, and builds out the system that turns a transcript into a reliable record and keeps it alive:

1. **The Meeting Intelligence Assistant**, a Claude Team assistant that turns a transcript into a structured minutes record: a summary, the decisions, the risks, and the actions, each action with an owner and a due date. It never invents an owner (it marks the gap for a human), and it flags confidential content handling. A reviewer approves before anything is published.
2. **The action, decision and risk registers**, with a working dashboard prototype: every action across the firm with its owner, due date, status, and whether it has been carried forward, so managers can see open, overdue and carried-forward work by team, and the organisation finally has a searchable memory.

The workflow is tested against twenty representative meetings.

## The design principle

> The assistant drafts the record. A human reviews and approves before anything is published. Every action gets a named owner and a due date, or it is flagged, never guessed.

Nothing is auto-published. Client-confidential content is handled under a clear protocol, not copied between tools by habit. The AI removes the administrative effort of writing up meetings, not the accountability for what was decided and who owns what.

## Repository map

| Path | What is inside |
|---|---|
| `docs/` | Meeting workflow audit, the five-type taxonomy and minimum record standard, the intake-to-follow-up workflow design, the assistant design, the register designs and field mapping, the dashboard specifications, the governance and confidentiality procedures, the benefits model, the twenty-meeting pilot report, and the implementation, training and hypercare plan |
| `prompts/` | The Meeting Intelligence Assistant prompt library (summary, decisions, risks, actions, confidentiality check) with guardrails |
| `claude-project/` | Claude Project configuration guide for the assistant |
| `templates/` | The standard minutes template, the weekly digest template, and the monthly reporting template |
| `dashboard/` | A working, clickable HTML prototype of the action, decision and risk register and the manager dashboard, loaded with the pilot data |
| `diagrams/` | Current-state and future-state process maps |
| `walkthrough/` | Timed narration script and a clickable HTML demo to record a five to ten minute walkthrough from |
| `case-study/` | Portfolio-ready case-study page (HTML) |
| `tools/` | `benefits_tracker.py`, a reproducible script that builds the benefits-model spreadsheet |
| `deliverables/` | Rendered, client-ready outputs: `.docx` procedures, guides and the minutes template, `.xlsx` benefits model |

## Start here

1. Open `dashboard/index.html`, the live action, decision and risk register (this is the piece managers will love).
2. Open `case-study/index.html`, the one-page overview.
3. Read `docs/02_meeting_taxonomy_and_record_standard.md`, the five meeting types and what a good record contains.
4. Look at `prompts/` and `templates/`, the working assistant assets.

## Reproduce the benefits model

```bash
pip install openpyxl
python tools/benefits_tracker.py     # writes deliverables/NorthStar_Benefits_Model.xlsx
```

## Push this to your own GitHub

```bash
git add -A && git commit -m "NorthStar meeting intelligence platform, portfolio demonstration"
gh repo create northstar-meeting-intelligence --public --source=. --push   # requires gh, or:
# git remote add origin https://github.com/<you>/northstar-meeting-intelligence.git
# git branch -M main && git push -u origin main
```

## Scope and honesty notes

This demonstration keeps a human reviewer in control: nothing is auto-published, every action is owned or flagged, and client-confidential content follows a defined protocol. The design references Australian professional-practice expectations at a practitioner level (client confidentiality and the Privacy Act 1988 for personal information); it is not legal or records-management advice, and the firm's own information-governance controls remain the authority. Time-savings and quality figures are scenario estimates under the assumptions stated in `docs/08_benefits_model.md`; the aggregate value depends on how many meetings warrant a formal record, which is stated as an explicit, conservative assumption.

NorthStar Consulting is a representative client scenario used to demonstrate the approach. The figures throughout are modelled estimates under stated assumptions, not measured client outcomes.

## Licence

MIT, see `LICENSE`.
