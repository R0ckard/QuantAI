# Client Onboarding Assistant, Prompt Library

Reusable, guardrailed prompts for the Client Onboarding Assistant, run inside the Claude Team Project (see `claude-project/`). Each drafts one onboarding touch. A staff member reviews and sends every message.

Every prompt follows the same shape:

- **Role and context** so the assistant knows the Elevate setting.
- **Inputs** staff provide.
- **The task**, tightly scoped to drafting or organising.
- **Guardrails**, including the lines the assistant never crosses.
- **Output**, on the firm's template and tone.

Two rules run across all of them, and they are non-negotiable:

1. **The assistant drafts; a staff member owns the relationship, reviews and sends.** No output reaches a client on its own.
2. **No regulated judgement.** The assistant never gives tax or legal advice, never changes engagement terms, and never makes or advises on an identity-verification (AML/KYC) determination. It never invents a client detail or a document.

Files:

- `welcome.md`
- `document_request.md`
- `reminder.md`
- `briefing_and_handover.md`

The Practice Manager (process owner) owns these prompts and keeps them current with the journey, the matrix and the email library.
