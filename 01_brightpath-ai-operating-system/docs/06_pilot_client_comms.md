# Pilot 2, Client Communications

*Scenario design + test plan.*

## Problem

Client email is the highest-frequency task in the firm. Advisers and client-services staff draft similar replies repeatedly, tone varies by person, and triage (what needs an adviser vs a quick service reply) is done by feel. Time leaks in small amounts, many times a day.

## Objective

Standardise **triage and drafting** of routine client email so responses are faster and consistent in tone, while anything that constitutes advice is routed to an adviser, never auto-answered.

## Current-state (summary, see `diagrams/`)

Email arrives → staff member reads and mentally classifies → decides who handles → writes reply from scratch → (sometimes) checks tone → sends. Repetition and inconsistency in the drafting; ad-hoc triage.

## Future-state (with the operating system)

Email arrives → **Client-Comms Claude Project** proposes a triage tag (service / booking / document request / *possible advice → escalate*) and a draft reply option (or two) in the firm's voice, with placeholders for any specifics → staff member verifies, adjusts, and sends; advice-flagged items go to an adviser. A person still sends every message.

## What's built (in this repo)

- `claude-project/client-comms-project-config.md`, Project instructions (triage taxonomy, brand voice, escalation rule) and knowledge to attach.
- `prompts/client-comms/`, reusable prompts: triage + draft, reschedule/booking reply, document-request reply, sensitive/complaint acknowledgement (escalate), each with guardrails and quality checks.

## Test plan (controlled, scenario)

- **Sample:** 40 representative de-identified inbound emails across the common categories.
- **Method:** measure handle-time (read→sent) and tone-consistency rating, baseline vs AI-assisted; track triage accuracy and correct escalation of advice-bearing emails.
- **Primary metric:** average handle-time reduction (target ≥20%).
- **Guardrail metrics:** 100% of advice-bearing emails correctly escalated (not auto-drafted as advice); tone rating maintained or improved; zero client PII in non-approved tools.
- **Success:** ≥20% handle-time reduction with correct escalation maintained.

## Risks & mitigations

- *An advice question gets a casual AI answer* → triage taxonomy has an explicit "possible advice → escalate" class; the draft prompt refuses to answer advice questions and instead drafts an escalation-holding reply.
- *Tone drift / over-familiarity* → brand-voice knowledge attached to the Project; quality check on every draft.
- *PII leakage* → placeholders for specifics; approved tools only.
