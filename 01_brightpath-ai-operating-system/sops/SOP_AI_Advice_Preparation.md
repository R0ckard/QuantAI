---
title: "Standard Operating Procedure, AI-Assisted Advice Preparation"
---

# SOP, AI-Assisted Advice Preparation

**BrightPath Financial Services**
Document owner: Head of Advice · Maintained by: Advice AI Champion
Version: 1.0 · Review cycle: quarterly

> **Demonstration SOP.** A real deployment would be approved by the firm's licensee/compliance function. This is not legal or compliance advice.

## 1. Purpose

To produce advice documents (SoA/RoA) and related artefacts faster and more consistently using an approved AI tool, **while keeping the adviser's best-interests review the decisive, accountable step**. AI drafts; a licensed adviser decides and owns the advice.

## 2. Scope

Applies to advisers and paraplanners preparing advice documents, strategy rationale, file notes and scope/needs summaries. Does **not** authorise AI to determine strategy or issue advice.

## 3. Roles

| Role | Responsibility |
|---|---|
| Adviser (licensed) | Owns the advice; performs best-interests review; signs off |
| Paraplanner | Prepares structured inputs; runs the draft; assists review |
| Advice AI Champion | Maintains the Claude Project, prompts and exemplars |
| Head of Advice | Owns this SOP and the review standard |

## 4. Prerequisites

- Access to the `BrightPath, Advice Preparation` Claude Project (approved Team tool).
- The client file and decided strategy available in firm systems.
- Familiarity with the governance framework and the de-identification convention (`[CLIENT]`, `[BALANCE]`, `[FUND]`, …).

## 5. Procedure

**Step 1, Decide the strategy (human).** The adviser determines the recommended strategy and products. *AI is not used for this step.*

**Step 2, Prepare structured inputs.** Enter goals, risk profile, recommended strategy, products, fees and scope into the prompt template, using **placeholders** for all client-identifying details.

**Step 3, Generate the first draft.** In the Advice-Prep Project, run the `soa-first-draft` prompt (or the relevant prompt). The output is a firm-standard draft ending in a mandatory review checklist.

**Step 4, Best-interests review (the gate).** The licensed adviser reviews the draft against the client file:
- verify every figure, projection and product fact against the system, the AI must not be the source of any number;
- confirm each recommendation is in the client's interest and the rationale documents why (best-interests duty);
- confirm disclosures are complete and current;
- resolve every `[[ADVISER TO CONFIRM: …]]` marker.

**Step 5, Reinstate client details.** Replace placeholders with real client information **inside firm systems**, not in the AI tool.

**Step 6, Peer / compliance review.** Route through the firm's normal review as usual.

**Step 7, Finalise and issue.** The adviser signs and issues. The completed review checklist is retained as evidence of the best-interests review.

## 6. The human-review gate (must not be skipped)

No advice document leaves the firm without a licensed adviser completing Step 4 and signing at Step 7. The AI never issues advice, never sources figures, and never has the final word. If the tool is unavailable, revert to the manual process, the gate does not change.

## 7. Data handling

Use only the approved Team tool with training disabled. Client-identifying and sensitive data (e.g. TFNs, health) are handled via placeholders and reinstated in-system. Refer to the governance framework for the full data-handling tiers.

## 8. Exceptions & escalation

- Missing or uncertain inputs → mark `[[ADVISER TO CONFIRM]]`; do not proceed on assumptions.
- Any doubt about whether output meets best-interests duty → the adviser rewrites; when in doubt, the human standard prevails.
- Tool or data-setting concern → escalate to the Advice AI Champion / IT & Risk Manager.

## 9. Records & version control

Retain the completed review checklist with the advice file. This SOP is versioned; changes are logged below and announced to advisers.

| Version | Date | Change | Author |
|---|---|---|---|
| 1.0 | 2026 | Initial SOP | QuantAI (portfolio) |
