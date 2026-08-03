# Prompt Library

Reusable, guardrailed prompts for the three pilot workflows. Each prompt is written to be pasted into the relevant platform (see `docs/04_tool_selection_and_approved_use.md` for which tool) and to keep a qualified human in charge.

Every prompt follows the same shape:

- **Role and context** so the AI knows the firm setting.
- **Inputs** the human provides.
- **The task**, tightly scoped.
- **Guardrails**, including the assurance line where relevant.
- **Output format**, on template.

Two rules run across all of them, and they are non-negotiable:

1. **AI assists, a qualified human decides and signs.** No prompt output is used without a named person reviewing and owning it.
2. **The bright line.** AI never performs, checks, verifies or certifies engineering design or calculations. In the technical-report prompts this is stated inside the prompt itself so it cannot be lost.

Files:

- `proposals_and_bids.md`
- `technical_report_qa.md`
- `project_status_reporting.md`

The AI Champion for each role family owns the prompts for that family and keeps them current as the platforms change.
