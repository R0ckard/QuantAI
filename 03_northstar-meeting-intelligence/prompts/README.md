# Meeting Intelligence Assistant, Prompt Library

Reusable, guardrailed prompts for the Meeting Intelligence Assistant, run inside the Claude Team Project (see `claude-project/`). Each produces part or all of a meeting record to the firm's minimum standard. A nominated reviewer approves every record before it is published.

Every prompt follows the same shape:

- **Role and context** so the assistant knows the NorthStar setting and the meeting type.
- **Inputs** (the transcript, the meeting type, and any previous record for carry-forward).
- **The task**, tightly scoped to structuring, not judging.
- **Guardrails**, including the lines the assistant never crosses.
- **Output**, on the standard minutes template.

Two rules run across all of them, and they are non-negotiable:

1. **The assistant drafts; a human reviews and approves before anything is published.** Nothing is auto-published.
2. **Every action has a named owner and a due date, or it is flagged.** The assistant never invents an owner, a date, a decision, a risk or an action that was not in the transcript.

Files:

- `record.md` (the main prompt: transcript to full record)
- `actions_decisions_risks.md` (focused extraction, and carry-forward)
- `confidentiality_check.md`

The PMO Manager (process owner) owns these prompts and keeps them current with the taxonomy and record standard.
