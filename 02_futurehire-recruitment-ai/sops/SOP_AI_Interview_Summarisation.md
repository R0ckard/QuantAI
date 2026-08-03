---
title: "Standard Operating Procedure, AI-Assisted Interview Summarisation"
---

# SOP, AI-Assisted Interview Summarisation

**FutureHire Recruitment**
Document owner: Recruitment Director · Fairness oversight: Privacy Lead · Maintained by: Interview AI Champion
Version: 1.0 · Review cycle: quarterly

> **Demonstration SOP.** A real deployment would be reviewed by the firm's Privacy Lead and employment-law adviser. This is not legal advice.

## 1. Purpose

To turn a recruiter's rough interview notes into a structured, **evidence-based** candidate summary faster and more consistently, while guaranteeing the summary stays job-relevant, fair, and free of any progression decision. AI summarises evidence; the recruiter decides.

## 2. Scope

Applies to recruiters writing up interviews. Does **not** authorise AI to screen, rank, score, shortlist or recommend a candidate decision.

## 3. Roles

| Role | Responsibility |
|---|---|
| Recruiter | Owns the assessment and decision; verifies the summary reflects the interview |
| Interview AI Champion | Maintains the Project, prompts and templates; runs the fairness audit |
| Privacy Lead | Oversees fairness and candidate-data controls |
| Recruitment Director | Owns this SOP and the service standard |

## 4. Prerequisites

- Access to the `FutureHire, Interview Summaries` Claude Project (approved Team tool).
- Familiarity with the governance/fairness framework and the de-identification convention.

## 5. Procedure

**Step 1, Capture notes (human).** Take interview notes as usual, focused on evidence against the role's requirements.

**Step 2, Prepare inputs.** Paste the role requirements and your rough notes into the prompt, de-identifying candidate specifics where practical.

**Step 3, Generate the summary.** Run the `structured-summary` prompt. The output is structured against the requirements and ends with a fairness check.

**Step 4, Fairness & accuracy review (the gate).** Confirm:
- the summary reflects what actually happened in the interview;
- every requirement is backed by evidence from your notes or marked "not covered", nothing inferred;
- there are **no protected attributes** (age, gender, ethnicity, accent, appearance, family status, health) or proxies, and no "culture fit"/personality judgements;
- the summary presents evidence only, it makes no progression recommendation.

**Step 5, Save.** Paste the reviewed summary into the Bullhorn Interview-summary field and tag evidence. Your progression decision is recorded separately, per firm process, it is yours, not the tool's.

## 6. The human-review gate (must not be skipped)

No summary is saved or shared without Step 4. The AI never screens, ranks or decides. If the tool is unavailable, write the summary manually to the same standard, the fairness rules don't change.

## 7. Data handling

Approved Team tool only, training off. De-identify where practical; keep sensitive candidate data in Bullhorn, not in prompts.

## 8. Exceptions & escalation

- Notes don't support a requirement → mark "not covered"; never infer.
- Any protected-attribute content appears → remove it; report the pattern to the AI Champion so the prompt/knowledge can be tightened.
- Doubt about fairness → the recruiter's judgement and the fairness rules prevail.

## 9. Records & version control

| Version | Date | Change | Author |
|---|---|---|---|
| 1.0 | 2026 | Initial SOP | QuantAI (portfolio) |
