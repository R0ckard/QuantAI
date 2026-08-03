# BrightPath Prompt Library

*The firm's shared, versioned prompts. Each prompt is a reusable asset, not a one-off.*

## Why a shared library

When every adviser writes their own prompts, quality stays private and never compounds. A shared, versioned library means the best version of each task is available to everyone and improves over time. This library is attached to the relevant **Claude Project** (see `../claude-project/`) so staff start from the standard, not a blank box.

## The standard prompt format

Every prompt in this library follows the same structure so they are predictable to use and safe by default:

- **Purpose**, what task it does, in one line.
- **When to use / not use**, the boundary.
- **Inputs**, what the user supplies (with de-identification placeholders).
- **Prompt**, the reusable text.
- **Guardrails**, what the model must not do.
- **Quality checks**, the review checklist the user runs before using the output.
- **Version**, so improvements are tracked.

## The firm-wide quality-check standard (applies to every prompt)

Before any AI output is used, the responsible human confirms:

1. **Accuracy**, every figure, name, product and date verified against the file/system. No invented facts.
2. **Advice gate**, if the output constitutes personal financial advice, a licensed adviser has reviewed and owns it.
3. **Privacy**, no client-identifying data was placed in a non-approved tool; placeholders used where required.
4. **Tone**, matches BrightPath's voice (warm, plain-English, professional; no jargon dumps).
5. **Completeness**, nothing material omitted; disclosures present where required.

If any check fails, the output is corrected or discarded, never sent as-is.

## The de-identification convention

Supply client specifics as placeholders and reinstate them inside firm systems at the review step:

`[CLIENT]` `[SPOUSE]` `[AGE]` `[BALANCE]` `[FUND]` `[PRODUCT]` `[FEE]` `[GOAL]` `[DATE]`

## Contents

**Advice preparation** (`advice-prep/`)
- `soa-first-draft.md`, firm-standard Statement of Advice first draft from structured inputs
- `strategy-rationale.md`, plain-English rationale paragraph for a recommendation
- `file-note.md`, structured file note from rough meeting notes
- `needs-summary.md`, scope & needs summary from discovery notes

**Client communications** (`client-comms/`)
- `triage-and-draft.md`, classify an inbound email and draft a reply option (with advice-escalation)
- `booking-reply.md`, reschedule / booking response
- `document-request.md`, respond to a client document request
- `complaint-ack.md`, acknowledge a complaint/sensitive message and escalate (never resolve autonomously)

## Governance

All prompts inherit the `../docs/04_governance_acceptable_use.md` framework. A prompt may narrow those rules but never relax them.
