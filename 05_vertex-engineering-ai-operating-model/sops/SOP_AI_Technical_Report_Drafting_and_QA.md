---
title: "Standard Operating Procedure, AI-Assisted Technical Report Drafting and QA"
---

# SOP, AI-Assisted Technical Report Drafting and QA

**Vertex Engineering**
Document owner: Technical Director · Assurance oversight: Discipline Leads · Maintained by: Engineering-Delivery AI Champion
Version: 1.0 · Review cycle: quarterly, and after any incident

> **Demonstration SOP.** A real deployment would be confirmed against the firm's quality system and professional-indemnity arrangements. This is a practitioner-level operating control, not legal or professional advice.

## 1. Purpose

To help a qualified engineer produce technical reports faster and more consistently by using AI for structure, drafting and formatting **around** finished, human-owned technical content, while guaranteeing that AI never performs, checks, verifies or certifies any engineering work. AI drafts the words. A qualified, registered engineer owns and signs every technical statement.

## 2. Scope

Applies to engineers drafting technical reports with AI assistance. It does **not** authorise AI to perform or check any calculation, verify a design against a code or standard, or certify anything. Engineering design, calculation, verification and certification are out of scope and out of bounds for AI, always.

## 3. The assurance line (read before anything else)

> The AI helps with structure, clarity, formatting and consistency. A qualified, registered engineer performs, checks, owns and signs every technical statement, number and conclusion. The AI never performs a calculation, never checks a calculation, never verifies a design against a code or standard, and never certifies anything.

If following this SOP would ever put AI in the position of producing or checking technical content, stop and do that part the normal way, without AI.

## 4. Roles

| Role | Responsibility |
|---|---|
| Owning engineer | Does and owns all technical work; confirms every technical statement; signs |
| Discipline lead | Independent technical review, unchanged by the presence of AI |
| Engineering-Delivery AI Champion | Maintains the Claude Project, prompts and glossary; watches the assurance line |
| Technical Director | Owns this SOP and the firm quality standard |

## 5. Prerequisites

- Access to the `Vertex, Technical Report Drafting and QA` Claude Project (approved Claude Team tool).
- The firm report template and the completed, human-owned technical content for the report.

## 6. Procedure

**Step 1, Do the technical work (human, no AI).** Complete the calculations, design and findings using the firm's normal process. AI is not involved.

**Step 2, Prepare inputs.** Gather the fixed, human-owned technical content and the report template. The technical content is what it is; it will not be changed by the AI.

**Step 3, Draft the surround.** Run prompt **T1**. The AI drafts structure, executive-summary wording that restates (never reinterprets) your conclusions, plain-language explanation, and formatting to template. It reproduces your technical content exactly.

**Step 4, QA-assist pass.** Run prompt **T2**. This is a readability-and-consistency checklist that states its own scope: it does not assess technical correctness or code compliance. Resolve the wording issues it flags.

**Step 5, Engineer confirmation (the gate).** Confirm:
- every number, finding and conclusion is yours and unchanged;
- the AI has not implied any technical judgement, and no "meets / complies / verified / certified" language has crept in;
- each AI suggestion is accepted or rejected by you.

**Step 6, Discipline-lead review.** The firm's existing technical review, now able to focus cleanly on correctness because structure and clarity are already handled.

**Step 7, Issue.** You sign. The report is yours, exactly as it would be without AI, produced faster.

## 7. The human-review gate (must not be skipped)

No report is issued without Step 5. The AI never owns a technical statement. If the tool is unavailable, draft to the same template manually; the assurance line does not change.

## 8. Data handling

Approved Claude Team tool only. All report content stays in the enterprise instance. Do not load live calculation or design files "for the AI to use"; technical content enters only as fixed, human-owned input inside the specified prompt. Keep a short provenance note that AI assisted with structure and language only.

## 9. Exceptions and escalation

- The AI implies a technical judgement or adds compliance language → remove it; report to the AI Champion so the prompt can be tightened; log with the governance forum.
- Drafting well would need a technical decision → insert [ENGINEER TO CONFIRM] and resolve it yourself; never let the AI guess.
- Any doubt about the assurance line → the engineer's judgement and the bright line prevail, every time.

## 10. Records and version control

| Version | Date | Change | Author |
|---|---|---|---|
| 1.0 | 2026 | Initial SOP | QuantAI (portfolio) |
