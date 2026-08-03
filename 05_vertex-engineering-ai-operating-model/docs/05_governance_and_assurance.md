# Governance and Assurance

*Vertex Engineering. The layer that makes AI safe to adopt in a firm that signs and certifies.*

In most firms governance is a formality. In an engineering consultancy it is the whole point. Vertex's technical staff are right to be cautious: their names go on reports, their registration carries a duty of care, and a wrong number that reaches a client is a professional and safety problem, not an embarrassment. This layer exists so that AI can help the firm without ever touching the accountability that has to stay human.

## The one rule everything hangs from

> AI assists. A qualified professional decides and signs. No AI output reaches a client, a certificate or a calculation without a competent human owning it.

Everything below is that sentence made operational.

## The bright line: what AI must never do

Some work is out of bounds for AI at Vertex, full stop, on every platform. This is not a setting or a preference, it is the assurance line.

**AI never performs, checks, or certifies:**

- engineering **design** or design decisions
- any **calculation** or the checking of a calculation
- **verification** that a design or output meets a standard, code or specification
- **certification**, sign-off, or anything a registered engineer puts their name to as fit for purpose

A qualified, registered engineer performs and owns all of the above, using their own judgement and the firm's established checking process, unaided by AI on the technical content. AI may help arrange the words around a finished, human-owned technical result. It may never produce or check the result itself.

**AI assists (with a human owner) on:** structure, drafting, formatting, plain-language clarity, consistency against a template, summarising source material a human has provided, and admin. In every case a named person reviews the output and owns it.

## Accountable human review: the RACI for every AI-assisted output

For any workflow that uses AI, four roles are always assigned to named people. AI is never any of them.

| Role | Who | What it means |
|---|---|---|
| **Owner (Accountable)** | The qualified professional whose name is on the output | Decides, reviews, signs. Carries the professional accountability. Cannot be delegated to a tool. |
| **Author (Responsible)** | The person doing the work with AI assistance | Runs the workflow, applies the prompts, does the first human check. |
| **Reviewer (Consulted)** | Discipline lead or peer, per the firm's existing checking process | Independent human review, unchanged by the presence of AI. |
| **Governance (Informed)** | The AI governance forum | Sees adoption, incidents and measures. Steers the model. Does not review individual outputs. |

The important design choice: **AI use does not change who is accountable or who reviews.** The firm's existing professional checking process stays exactly as it is. AI sits before it, helping the author produce a better first draft faster. It never replaces a reviewer and never becomes an owner.

## The governance forum (light, not bureaucratic)

Vertex has no platform team and does not want a heavy process. Governance is a small forum, not a department.

- **Who:** an executive sponsor, a senior engineer (for the assurance line), the AI Champions lead, and someone from people-and-operations for capability and policy. Four to five people.
- **Cadence:** monthly for the first six months, then quarterly.
- **What it owns:** the tool-selection matrix and approved-use rules, the bright line, the incident log, the adoption and benefits baseline, and the quarterly review of both. It re-weights the workflow prioritisation as evidence comes in.
- **What it does not do:** review individual documents, approve every prompt, or slow work down. If governance becomes a bottleneck it has failed. Its job is to set clear rules once and keep them current, so day-to-day use needs no permission.

## Confidentiality and data handling

The firm handles client, project and personal information, so data controls are part of assurance, not separate from it.

- **Enterprise tier only.** Firm and client material goes only into the approved enterprise instances (Copilot in the tenant, ChatGPT Enterprise, Claude Team), never personal or free accounts. See `04_tool_selection_and_approved_use.md`.
- **Personal information** is handled consistent with the Privacy Act 1988 (Australian Privacy Principles): collected and used only as needed, kept inside approved tools, not pasted into anything ungoverned.
- **Commercial sensitivity.** Client commercial terms and competitive material follow the same least-exposure rule as personal data.
- **Provenance.** Where an AI-assisted document is client-facing, the author keeps a simple note of which tool assisted and what the human changed, so the firm can answer "how was this produced" if a client ever asks.

## When something goes wrong: a simple incident path

Assurance needs a way to catch and learn from misuse without punishing honesty.

1. **Notice and stop.** Anyone who spots an AI output that crossed the bright line, leaked sensitive data, or reached a client without proper review, flags it to an AI Champion or the forum.
2. **Contain.** Correct the output, notify the owner, and if a client was affected, follow the firm's existing error-handling process (AI does not change that obligation).
3. **Log and learn.** The forum records it in a short incident log: what happened, why, and the one change that prevents a repeat (a clearer rule, a prompt guardrail, a training gap closed).
4. **No-blame for honest flags.** The goal is a firm that surfaces problems early, not one that hides them. Honest, prompt flagging is treated as good professional practice.

## Professional-practice context (practitioner level, not legal advice)

This model is designed to sit comfortably inside the expectations a Melbourne engineering consultancy already works to: engineers' duty of care and the obligations that come with professional registration, the firm's own quality and checking processes, and the Privacy Act 1988 for personal information. The bright line and the human-owner rule exist precisely so that AI use never sits in tension with those obligations. This document is a practitioner-level operating control, not legal or professional-indemnity advice; the firm's own legal and PI arrangements remain the authority, and the governance forum should confirm the model against them before rollout.

## Why this is a feature, not a brake

Framed well, this layer is the reason the technical staff will say yes. It tells them, in writing, that the firm is not asking them to trust a tool with their signature. It keeps their judgement in charge, respects the caution that makes them good at their jobs, and gives them faster drafting on everything around the technical core. Governance here is not the price of adoption. It is what makes adoption possible.
