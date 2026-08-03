# Pilot 2, Interview Summarisation

*Scenario design + test plan.*

## Problem

Interview notes vary wildly in structure and quality by recruiter. That makes candidate summaries hard to reuse, weakens the shortlist story to clients, and means the judgement of good recruiters isn't captured. It's also the highest-risk workflow for fairness if done carelessly.

## Objective

Turn a recruiter's rough interview notes into a **structured, evidence-based** candidate summary and interview note, consistent, reusable, and strictly job-relevant.

## Current state (summary, see `diagrams/`)

Recruiter scribbles notes during/after the interview → later writes them up (or doesn't) → summary quality depends on the individual → inconsistent records in Bullhorn.

## Future state

Recruiter pastes rough notes (de-identified where practical) → **Interview-Summary Project** returns a structured summary against the role's requirements, plus a clean interview note in the firm template → the tool omits protected attributes and flags anything that isn't job-relevant evidence → recruiter verifies it reflects the interview and saves it. Consistent, reusable, fair.

## What's built (in this repo)

- `claude-project/interview-summary-project-config.md`, Project instructions with the evidence-only, no-protected-attributes constraint.
- `prompts/interview-summary/`, structured summary, interview note, strengths/areas-to-explore (evidence-based).
- `templates/interview-note-template.md`, `templates/candidate-summary-template.md`.

## Test plan (controlled, scenario)

- **Sample:** 12 de-identified interview note sets across role types.
- **Method:** measure write-up time and consistency, baseline vs AI-assisted; fairness review of every output.
- **Primary metric:** candidate-summary preparation time reduction (target ≥50% median, per the brief).
- **Guardrail metrics:** 100% of summaries free of protected-attribute references and non-job-relevant characterisations; recruiter agreement that the summary reflects the interview ≥90%.
- **Success:** ≥50% median prep-time reduction with fairness guardrails intact.

## Risks & mitigations

- *Bias / protected attributes creeping in* → prompt is constrained to job-relevant evidence and instructed to omit protected attributes; fairness flag + recruiter review.
- *Over-stating what the candidate said* → prompt sticks to the notes; anything inferred is flagged, not asserted.
- *The summary drifting into a decision* → the tool summarises evidence; it never recommends progress/reject. That stays with the recruiter.
