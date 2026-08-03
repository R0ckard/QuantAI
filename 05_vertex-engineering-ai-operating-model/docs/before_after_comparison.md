# Before and After: Time-Savings Model

*Vertex Engineering. Scenario estimates under stated assumptions, not measured client outcomes.*

The brief asks for three prototypes that show **at least a 15% cycle-time improvement without unacceptable quality loss**, and an adoption and benefits baseline. This document is the model behind that claim. Every number here is reproducible: `tools/benefits_tracker.py` builds the benefits-tracker spreadsheet from exactly these assumptions, so anyone can change an input and see the result move.

## How to read this

The honest, measurable metric is **cycle-time percentage** on each workflow, because it depends only on the time a task takes before and after, which a pilot can measure directly. The hours-per-year and dollar figures are the same percentages scaled by volume and a blended rate; they size the prize but they inherit the uncertainty of the volume and rate assumptions. So the 15% bar is judged on the percentages, and the dollar figure is context, not the headline.

## Assumptions (all editable in the script)

- **Firm:** 52 people. **Blended professional cost of time:** AUD $95 per hour (a mid-point across engineers, PMs and BD staff; deliberately conservative for a consultancy). **Working weeks per year:** 46.
- **Engagement fee benchmark:** AUD $35,000, so the modelled value can be compared to the cost of the work.
- **Per-workflow inputs** (before-hours, after-hours, volume per year) are shown below and in the `Assumptions` sheet of the workbook.

The saving on each workflow is only on the **drafting, formatting, structuring and admin** portion of the task. On technical reports in particular, **none** of the saving comes from the engineering work itself, and none is taken from it. The engineer's technical time is untouched.

## The three pilots

| Pilot | Before (per item) | After (per item) | Cycle-time cut | Volume / yr | Hours saved / yr |
|---|---|---|---|---|---|
| Proposals and bids | 15.0 h | 11.0 h | 27% | 124 | ~496 |
| Technical report drafting and QA | 12.0 h | 8.4 h | 30% | 191 | ~688 |
| Project status reporting | 1.5 h | 1.0 h | 33% | 460 | ~230 |

**All three clear the 15% bar comfortably (27-33%).** The "before" and "after" figures are the author-side effort on drafting and QA, not the whole project.

### Why each reduction is defensible

**Proposals (27%).** The blank-page and boilerplate rebuild is the biggest time sink in a bid, and it is exactly what drafting from a structured brief plus a reuse library removes. The win strategy, tailoring and every client claim stay with the author, so the saving is bounded to the mechanical drafting portion. 27% is a conservative read of removing most of the boilerplate rebuild while leaving judgement untouched.

**Technical reports (30%).** The saving is entirely in structuring, drafting the prose around fixed technical content, formatting to template, and the readability QA-assist pass. The technical work, the engineer's review, and the discipline-lead review are unchanged. Because report writing is a large share of the surrounding effort, a 30% cut on the drafting-and-QA portion is reasonable and still leaves every gram of professional judgement in place.

**Project status reporting (33%).** The gather-and-draft step is highly repetitive and template-shaped, which is where AI drafting from in-tenant data is strongest. The PM's judgement on the honest RAG status and the risks is retained, so the cut lands on the mechanical part. 33% of a 1.5-hour task is half an hour per report, which matches removing the copy-paste-and-format effort.

## The totals (scenario)

On these assumptions the three pilots model to roughly **1,414 hours a year**, about **AUD $134,000** of professional time at the blended rate, which is close to **3.8 times** the $35,000 engagement fee. That multiple is a sizing indication, not a promise: it moves with volume and rate. The point it makes is that even on conservative inputs, the value of getting these three workflows right dwarfs the cost of designing the operating model around them.

## Quality, not just speed

The 15% bar has two halves: cycle-time improvement **and** no unacceptable quality loss. Quality is protected structurally, not hoped for:

- **Human owns every output.** No AI output is used without a named person reviewing and signing.
- **The bright line on technical work.** AI never performs, checks or certifies engineering content, so the one place quality is safety-critical is the one place AI does not touch.
- **QA-assist is checklist-only** and declares its own scope, so it improves consistency without ever masquerading as a technical check.
- **Honesty guardrails** in the prompts (no invented claims, no status inflation) protect the quality of what reaches a client.

The adoption log in the workbook is where the pilot replaces these scenario estimates with measured before/after times and a quality-pass rate, so the firm proves the 15% bar on its own numbers rather than on this model.

## What the workbook contains

`tools/benefits_tracker.py` writes `deliverables/Vertex_Benefits_Tracker.xlsx` with: a Summary of the headline numbers; an editable Assumptions sheet (change an input, re-run); a Pilot models sheet that recomputes hours and value and flags the 15% bar; the ten-workflow Prioritisation matrix as a live sheet; and an Adoption log template for the AI Champions to record real pilot measurements during the first 90 days.

*Figures are scenario estimates under the assumptions above. Vertex Engineering is a representative client scenario used to demonstrate the approach.*
