# Copilot Setup: Project Status Reporting

Status reporting runs primarily on **Microsoft Copilot**, because the project data already lives in the tenant (Planner, Excel trackers, Teams, Outlook) and Copilot can read it in place without anyone copying client data out. There is no "Project" object to configure as in Claude; instead this is the standard way PMs use Copilot for status reports, plus the saved prompt and template that keep it consistent.

## What to standardise

1. **A firm status-report template** in the shared location Copilot can see, with the fixed sections: progress this period; milestones and RAG status; risks and issues; next steps; budget and schedule position.
2. **The saved status prompt (S1)** from `prompts/project_status_reporting.md`, kept where PMs can grab it (a pinned Teams post or a OneNote the PM group shares).
3. **A short usage note** (below) so every PM runs it the same way.

## Usage note for PMs

```
To draft a status update with Copilot:
1. Work inside the project's Microsoft context (the Planner/Excel tracker open,
   Teams channel and Outlook thread available). Copilot reads this in-tenant, so
   no client data leaves approved tools.
2. Use the saved status prompt (S1). Point it at the tracker and recent context
   and the firm template.
3. Copilot drafts. YOU confirm the RAG status honestly, add the risks and
   client-sensitive framing a tool cannot know, and resolve any [PM TO CONFIRM]
   items. Copilot must never upgrade a status to look better; the honest call is
   yours.
4. Run the consistency check (S2) if you want a second pass.
5. Send through the normal approval.

Rules:
- Project and client data stays in Copilot in the tenant. Never paste it into a
  personal or free account.
- You own the RAG status, the risks, and how anything sensitive is framed to the
  client.
- Australian English, no em dashes.
```

## Claude as the fast follow

If a PM prefers to draft a narrative from pasted, appropriately handled notes rather than from the tracker, the same prompts (S1-S3) work in Claude Team. The rule is unchanged: the data stays in an approved enterprise tool and the PM owns the honest status.

## Upkeep

The project-management Champion owns the template and the saved prompt, refreshes them as Copilot changes, and reviews them each quarter with the governance forum.
