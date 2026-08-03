# Pilot 3: Project Status Reporting

*Vertex Engineering. Highest priority, lowest risk: the confidence-builder.*

## Why this pilot

Status reporting is the ideal first win. It is high-frequency (every project, every reporting cycle), low-risk (no professional-liability exposure), and the improvement is visible to clients immediately. For a firm that is cautious about AI, this is where trust gets built fast, with almost nothing at stake if the first attempts need refining. It also removes a genuine, universally disliked chore: turning messy project data into a clean, consistent update.

The tool is **Copilot** where the project data already lives in Microsoft (Planner, Excel trackers, Teams), because Copilot has the context in-tenant and needs no copy-paste. Where a project manager prefers to draft the narrative from pasted notes, Claude is the fast follow. Either way the data stays in approved enterprise tools.

## Current state

```
  Reporting cycle comes around
     |
  PM gathers data from the tracker, email, Teams, their own memory
     |
  Writes the status update from scratch, every project, every time
     |
  Formats it, chases RAG status and next-steps
     |
  Inconsistent between PMs and between cycles
     |
  Send to client / internal
```

Every PM has their own format, quality drifts, and the same summarising work is redone from zero each cycle.

## Target state

```
  Reporting cycle comes around
     |
  Copilot drafts the update from the project tracker + recent Teams/email context
  against the firm status-report template
     |
  PM reviews: confirms progress, RAG status and next steps are right,
  adds the judgement a tool cannot have (risks, client sensitivities)
     |
  Consistent, on-template update
     |
  Send  ->  same standard every project, every cycle
```

The PM's judgement (what the status really is, what the client needs to hear) stays human. The mechanical gather-and-write step is removed, and every report looks like it came from one firm.

## The workflow, step by step

1. **Point Copilot at the source.** The project tracker (Planner/Excel), plus recent relevant Teams and email context, inside the tenant.
2. **Draft to template.** Copilot drafts the status update against the firm's standard status-report structure: progress this period, milestones and RAG status, risks and issues, next steps, budget/schedule position.
3. **PM review (the judgement step).** The PM confirms the RAG status is honest, adds real risks and client-sensitive framing, and corrects anything the data does not capture. A tool can summarise data; it cannot know the client politics.
4. **Consistency check.** A short check that the report matches the firm template and reads consistently, so every project's report has the same shape.
5. **Send.** Internal or client, per the normal approval.

## Guardrails

- **The PM owns the RAG status and the risks.** AI drafts from data; the honest judgement of "are we actually green" is always human. AI must not upgrade or soften a status.
- **No invented progress.** The draft is built only from real project data; anything the PM adds from judgement is theirs and marked as such in their review.
- **In-tenant only.** Project and client data stays in Copilot in the tenant (or Claude Team if the PM drafts from pasted, appropriately handled notes).
- **Client-sensitive framing is human.** How a slippage or issue is communicated to a client is a relationship decision, not a drafting one.

## What good looks like

Every client, on every project, receiving a status update in the same clear firm format, on time, with honest RAG status and real next steps, produced in minutes of gather-and-draft plus the PM's judgement, instead of an afternoon of copy-paste that looks different depending on who wrote it.

## Why it goes first

Lowest risk, highest frequency, immediately visible to clients. It gives the firm an early, safe, obvious win that builds the confidence to take on the higher-stakes pilots. When PMs find their least favourite chore mostly done for them, with their judgement still clearly in charge, adoption sells itself.

## Scenario time model (see `before_after_comparison.md`)

Project status reporting is modelled at roughly 230 hours a year across the PM group, at a 25-33% cycle-time reduction on the gather-and-draft effort. It is the smallest saving of the three but the fastest to realise and the lowest risk. Figures are scenario estimates under stated assumptions.
