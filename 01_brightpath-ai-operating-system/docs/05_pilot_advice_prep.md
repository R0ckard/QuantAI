# Pilot 1, Advice Preparation

*Scenario design + test plan.*

## Problem

Producing advice documents (Statements of Advice, Records of Advice) and file notes is the firm's most time-consuming knowledge work. Today each adviser/paraplanner rebuilds standard sections from scratch, tone and structure vary, and the review burden is high because drafts arrive inconsistent.

## Objective

Cut the drafting time for a standard advice document by producing a **firm-standard first draft** from structured inputs, while making the adviser's best-interests review **stronger**, not weaker.

## Current-state (summary, see `diagrams/`)

Adviser gathers inputs → opens last similar SoA → copies and reworks sections → drafts strategy rationale → assembles projections and disclosures → self-reviews → compliance/peer review → finalise. Duplicated effort concentrated in reworking boilerplate and re-writing rationale prose.

## Future-state (with the operating system)

Adviser completes a short **structured input** (client goals, risk profile, recommended strategy, products, fees, with identifiers as placeholders) → **Advice-Prep Claude Project** produces a first draft in the firm's SoA structure with standard disclosures and a plain-English rationale → adviser reviews against the file and best-interests duty using the built-in review checklist → reinstates client details in-system → compliance/peer review → finalise.

The AI removes the *blank-page and boilerplate* cost. The adviser keeps the *judgement*, and gets a more consistent draft to review, which speeds review too.

## What's built (in this repo)

- `claude-project/advice-prep-project-config.md`, Project instructions, knowledge to attach (SoA skeleton, disclosure library, tone guide), and connector notes.
- `prompts/advice-prep/`, the reusable prompts: SoA first draft, strategy-rationale paragraph, file note from a meeting, scope/needs summary, each with inputs, guardrails and quality checks.
- `sops/SOP_AI_Advice_Preparation.md`, the step-by-step SOP with the review gate.

## Test plan (controlled, scenario)

- **Sample:** 6 representative de-identified cases spanning simple (single-issue RoA) to complex (multi-goal SoA).
- **Method:** measure end-to-end drafting time and reviewer-returned-for-rework rate, baseline vs AI-assisted, same advisers.
- **Primary metric:** drafting cycle-time reduction (target ≥20%).
- **Guardrail metrics:** review pass-rate not worse than baseline; zero instances of unreviewed AI text reaching a client file; adviser-rated draft quality (1-5).
- **Success:** ≥20% cycle-time reduction with review quality maintained or improved.

## Risks & mitigations

- *Over-reliance / automation bias* → review checklist forces file-based verification of every figure and recommendation; training emphasises the adviser owns the output.
- *Client data exposure* → placeholder de-identification pattern; approved tools only.
- *Hallucinated figures or citations* → prompts prohibit invented numbers; projections and product facts come from the file/system, not the model.
