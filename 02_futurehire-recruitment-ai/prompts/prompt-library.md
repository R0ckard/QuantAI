# FutureHire Prompt Library

*The agency's shared, versioned prompts. Each is a reusable asset, attached to the relevant Claude Project.*

## Why a shared library

Recruiter quality currently depends on who's at the desk. A shared, versioned library makes the best version of each task available to everyone, so quality compounds and the judgement of good recruiters is captured, not lost when they leave.

## The standard prompt format

Every prompt has: **Purpose · When to use / not use · Inputs (with de-identification placeholders) · Prompt · Guardrails · Quality & fairness checks · Version.**

## Firm-wide checks (apply to every prompt)

Before any AI output is used, the recruiter confirms:

1. **Accuracy**, every fact (role detail, candidate statement, pipeline status) verified. No invented content.
2. **No decisioning**, the output does not screen, rank, shortlist or recommend a candidate decision. That's the recruiter's job.
3. **Fairness**, no protected attributes, no proxies, no "culture fit" judgements; assessment language is job-relevant evidence only.
4. **Privacy**, no candidate personal data in non-approved tools; placeholders used; confidentiality respected in client-facing content.
5. **Tone**, matches FutureHire's voice (professional, warm, clear).

If any check fails, the output is corrected or discarded.

## De-identification convention

`[CANDIDATE]` `[ROLE]` `[CLIENT]` `[HIRING MANAGER]` `[SALARY]` `[LOCATION]` `[DATE]` `[STAGE]`

## Contents

**Job ads** (`job-ad/`), `job-ad-draft`, `inclusive-language-check`, `ad-shortener`
**Interview summarisation** (`interview-summary/`), `structured-summary`, `interview-note`, `strengths-and-areas`
**Client updates** (`client-updates/`), `pipeline-update`, `delay-holding-update`
**Candidate comms** (`candidate-comms/`), `interview-invite`, `respectful-decline`, `offer-next-steps`

## Governance

All prompts inherit `../docs/04_governance_fairness_privacy.md`. A prompt may narrow those rules but never relax them, in particular, **no prompt screens, ranks or decides on candidates.**
