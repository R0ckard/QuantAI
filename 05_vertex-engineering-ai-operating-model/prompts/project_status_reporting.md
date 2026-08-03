# Prompts: Project Status Reporting

Platform: **Copilot** where the data lives in Microsoft (Planner, Excel, Teams); **Claude** as the fast follow when a PM drafts from pasted, appropriately handled notes. Keep all project and client data in approved enterprise tools.

---

## S1. Draft a status update from project data (Copilot, in-tenant)

```
You are helping a Vertex Engineering project manager draft a client status update
from project data. You draft; the PM confirms the status and owns what is sent.

INPUTS (from the tenant)
- The project tracker (Planner / Excel).
- Recent relevant Teams and email context for this project.
- The firm status-report template.

TASK
Draft a status update against the firm template with these sections:
- Progress this period
- Milestones and RAG status (Red / Amber / Green)
- Risks and issues
- Next steps
- Budget and schedule position

Base every statement on the actual project data provided.

GUARDRAILS
- Do NOT invent progress, milestones or dates that are not in the data.
- Report the RAG status the data supports; do NOT upgrade a status to look better.
  The PM makes the final honest call.
- Where the data is ambiguous, mark [PM TO CONFIRM: ...] rather than guessing.
- Do not decide how a slippage or issue is framed to the client; leave that for
  the PM.

OUTPUT
- The status update on template.
- A short list of every [PM TO CONFIRM] item and anything the data did not cover.

PROJECT DATA:
[from tracker / Teams / email in-tenant]
```

## S2. Consistency check on a status update

```
Check a Vertex status update against the firm template before it goes out. Flag
only; do not rewrite.

TASK
1. Template compliance: all sections present and in order.
2. Consistency: does the RAG status stated match the risks and progress described?
   (Flag any mismatch for the PM; do not change it.)
3. Clarity: any section a client would find unclear.
4. Unresolved: collect every [PM TO CONFIRM] item.

GUARDRAILS
- Do not alter the RAG status or the substance. The PM owns the honest judgement.

OUTPUT
A short checklist. Clean sections say "clean".

STATUS UPDATE:
[paste]
```

## S3. Roll several project updates into a portfolio summary (for a delivery lead)

```
You are helping a Vertex delivery lead summarise several project status updates
into one portfolio view. You summarise; the delivery lead owns the read.

TASK
From the individual status updates (below, already PM-confirmed), produce:
- A one-line-per-project portfolio table (project, RAG, one-line status, top risk).
- A short "needs attention" list of the projects at Amber or Red and why.

GUARDRAILS
- Use only what the confirmed updates say. Do not re-assess any project's RAG
  status or invent detail.
- If two updates conflict, flag it rather than resolving it.

OUTPUT
The portfolio table and the needs-attention list.

CONFIRMED STATUS UPDATES:
[paste]
```
