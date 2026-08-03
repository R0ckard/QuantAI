# Pilot 3, Hiring-Manager Updates

*Scenario design + test plan.*

## Problem

Hiring-manager (client) updates are written manually and inconsistently. Recruiters either spend real time crafting them or let them slip, and inconsistent client communication weakens the agency relationship.

## Objective

Produce clear, professional, consistent hiring-manager updates from pipeline status in a fraction of the time, the lowest-risk, fastest-confidence pilot.

## Current state (summary, see `diagrams/`)

Recruiter checks Bullhorn pipeline → writes an update email from scratch → varies by recruiter and by mood/time available → sometimes skipped. Inconsistent client experience.

## Future state

Recruiter supplies the pipeline snapshot (roles, candidates at each stage, next steps, de-identified as needed) → **Client-Updates Project** drafts a professional update in the firm's voice, structured by role and stage, with clear next steps and placeholders for specifics → recruiter checks accuracy and candidate confidentiality, then sends. Consistent, fast, professional.

## What's built (in this repo)

- `claude-project/client-updates-project-config.md`, Project instructions (structure, tone, confidentiality rule).
- `prompts/client-updates/`, pipeline update, role-status summary, delay/holding update.
- `templates/hiring-manager-toolkit.md`, the client-facing toolkit (update cadence, what a good update contains).

## Test plan (controlled, scenario)

- **Sample:** 15 real-shaped pipeline snapshots.
- **Method:** measure update drafting time and consistency, baseline vs AI-assisted; client-readability rating.
- **Primary metric:** update drafting time reduction (contributes to the ≥40% admin-time target).
- **Guardrail metrics:** zero breaches of candidate confidentiality (e.g. sharing candidate detail a candidate hasn't consented to share); ≥90% meet the tone/quality standard.
- **Success:** substantial time reduction with confidentiality and quality intact.

## Risks & mitigations

- *Over-sharing candidate information with the client* → confidentiality rule in the prompt; recruiter review; placeholders for anything sensitive.
- *Inaccurate status* → recruiter supplies and verifies the pipeline facts; the AI formats, it doesn't invent status.
- *Generic tone* → brand-voice knowledge + recruiter personalisation.
