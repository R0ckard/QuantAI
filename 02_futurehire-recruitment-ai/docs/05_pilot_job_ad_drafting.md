# Pilot 1, Job-Ad Drafting

*Scenario design + test plan.*

## Problem

Job ads are written from scratch, vary by recruiter, and often need heavy editing before going live. Inconsistency costs editing time and weakens the FutureHire brand, and unchecked language can inadvertently deter diverse applicants.

## Objective

Produce a consistent, on-brand, **inclusive** job-ad draft from a short intake, cutting drafting/editing time while raising quality and fairness.

## Current state (summary, see `diagrams/`)

Recruiter takes an intake call → drafts the ad from memory or an old ad → edits for tone → (sometimes) checks inclusivity → posts. Duplicated effort; variable quality; inclusivity ad hoc.

## Future state

Recruiter completes a short structured intake (role, must-haves, nice-to-haves, team, package range, location/work model) → **Job-Ad Project** returns a firm-standard draft with an inclusive-language check and a flag on any "requirement" likely to deter diverse applicants → recruiter reviews, adjusts, posts. Faster, consistent, and fairer by default.

## What's built (in this repo)

- `claude-project/job-ad-project-config.md`, Project instructions, brand-voice and inclusive-language knowledge to attach.
- `prompts/job-ad/`, job-ad draft, inclusive-language check, ad-shortener (for LinkedIn/Seek length).
- `templates/`, candidate-comms library shares the same brand voice.

## Test plan (controlled, scenario)

- **Sample:** 10 representative roles across the desks.
- **Method:** measure draft-to-post time and edit volume, baseline vs AI-assisted; rate tone/quality against the agreed standard.
- **Primary metric:** drafting time reduction (contributes to the ≥40% admin-time target).
- **Guardrail metrics:** ≥90% of drafts meet the quality/tone standard; inclusive-language check applied to 100%; zero fabricated role facts.
- **Success:** substantial time reduction with ≥90% quality and inclusivity checks passing.

## Risks & mitigations

- *Fabricated role detail* → prompt uses only intake inputs; missing details flagged `[[CONFIRM]]`.
- *Exclusionary language slips through* → built-in inclusive-language check + recruiter review.
- *Bland, samey ads* → brand-voice knowledge + recruiter personalisation step.
