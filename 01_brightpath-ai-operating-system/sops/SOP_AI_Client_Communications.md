---
title: "Standard Operating Procedure, AI-Assisted Client Communications"
---

# SOP, AI-Assisted Client Communications

**BrightPath Financial Services**
Document owner: Client Services Manager · Maintained by: Client-Services AI Champion
Version: 1.0 · Review cycle: quarterly

> **Demonstration SOP.** Not compliance advice.

## 1. Purpose

To triage and draft routine client email faster and more consistently using an approved AI tool, **while ensuring anything that could be financial advice is escalated to an adviser and never auto-answered**, and a human sends every message.

## 2. Scope

Applies to Client Services staff and advisers handling inbound client email. Covers service, booking and document requests, and the escalation of advice-bearing or sensitive messages. Does **not** authorise AI to send messages or to answer advice questions.

## 3. Roles

| Role | Responsibility |
|---|---|
| Client Services staff | Triage, verify and send replies; escalate as required |
| Adviser | Handles escalated advice/sensitive matters |
| Client-Services AI Champion | Maintains the Project, voice guide and prompts; audits triage |
| Client Services Manager | Owns this SOP |

## 4. Prerequisites

- Access to the `BrightPath, Client Communications` Claude Project (approved Team tool).
- Familiarity with the triage taxonomy and the governance framework.

## 5. Procedure

**Step 1, Open the message.** Read the inbound email. Redact obvious client identifiers where practical before pasting.

**Step 2, Triage + draft.** Run the `triage-and-draft` prompt. The Project returns a triage tag and either a reply option (SERVICE / BOOKING / DOCUMENT) or a holding reply + escalation flag (POSSIBLE ADVICE / SENSITIVE).

**Step 3, Route escalations.** If tagged POSSIBLE ADVICE or SENSITIVE, send the brief holding reply (after review) and route the matter to the appropriate adviser. **Do not** attempt to answer the substance.

**Step 4, Verify (the gate).** For routine replies, check accuracy and tone, reinstate real specifics (dates, links, documents), never invented by the AI, and confirm no client PII went into a non-approved tool.

**Step 5, Send (human).** The staff member sends the message. The AI never sends.

## 6. The human-review gate (must not be skipped)

Every message is read and sent by a human. Advice questions are always escalated, never answered by the tool. If the tool is unavailable, reply manually, the escalation rule does not change.

## 7. Data handling

Approved Team tool only, training disabled. Redact identifiers where practical; reinstate specifics at the verify step. Sensitive documents are handled via the firm's secure channel, never invited over insecure email.

## 8. Exceptions & escalation

- Unsure of triage class → treat as escalate; ask the AI Champion.
- Complaint / distress / vulnerability / legal → use the complaint-acknowledgement prompt (acknowledge + escalate only; no resolution).
- Tone or accuracy doubt → rewrite before sending.

## 9. Records & version control

| Version | Date | Change | Author |
|---|---|---|---|
| 1.0 | 2026 | Initial SOP | QuantAI (portfolio) |
