# Before and After: Benefits Model

*Elevate Accounting. Scenario estimates under stated assumptions, not measured client outcomes.*

The brief sets two hard success measures: standard onboarding time falls from **three staff hours to 45 minutes** in scenario testing, and at least **95% of required documents** are identified before the first advisory meeting. This document is the model behind both, and it is reproducible: `tools/benefits_tracker.py` builds the spreadsheet from exactly these assumptions.

## How to read this

The honest headline is **staff hours per onboarding**, before and after, because that is what the pilot measures directly. The hours-per-year and dollar figures scale those by volume and a blended rate; they size the prize but inherit the uncertainty of the volume and rate assumptions. Document completeness is a separate quality measure, tracked to the 95% target. So the success test is judged on the per-onboarding time cut and the completeness rate; the dollar figure is context.

## Assumptions (all editable in the script)

- **Firm:** 18 people. **Blended cost of staff time on onboarding:** AUD $80 per hour (a mix of admin and accountant time; deliberately mid-range). **Working weeks per year:** 46.
- **Engagement fee benchmark:** AUD $12,500, so the modelled value can be compared to the cost of the work.
- **Per-service-line inputs** (before-hours, after-hours, volume per year) are shown below and in the `Assumptions` sheet.

The saving is only on the **staff administration** of onboarding: drafting, requesting, chasing, tracking and preparing. It does not touch the professional work (the advice, the tax judgement) or the client relationship time. Those are where staff should spend the time the redesign gives back.

## The three service lines

| Service line | Before (per onboarding) | After | Time cut | Volume / yr | Hours saved / yr |
|---|---|---|---|---|---|
| Business advisory | 4.0 h | 1.0 h | 75% | 45 | 135 |
| Tax compliance | 3.0 h | 0.75 h | 75% | 90 | ~203 |
| Bookkeeping | 2.0 h | 0.5 h | 75% | 60 | 90 |

The **tax-compliance line is the brief's "standard" case: 3 staff hours to 45 minutes**, a 75% cut. The other lines carry the same 75% reduction on their own baselines. The reduction is large because onboarding admin is exactly the kind of repetitive, template-shaped work that assisted drafting and one shared tracker remove: the blank-page welcome, the reinvented document list, the manual chasing, and the personal spreadsheet all go.

### Why 75% is defensible

The cut is not "AI does the onboarding." It is the removal of four specific time sinks, with the person kept firmly in the loop:

- **Drafting** every welcome, request, reminder and handover from scratch becomes reviewing a good draft (the assistant drafts from the email library and matrix).
- **Deciding what to ask for** becomes reading the correct list from the matrix, so no time is lost reinventing it or fixing an over- or under-ask.
- **Chasing** becomes a defined, assisted reminder cadence that only mentions outstanding items, instead of manual, sometimes-duplicated follow-up.
- **Tracking** becomes one shared view instead of a personal spreadsheet per staff member.

What is left, the 25%, is the human part that should stay: the personal line in the welcome, the judgement on the client, the review-and-send, and the relationship. The redesign speeds the admin and protects the relationship, which is exactly the brief's intent.

## Document completeness (the second success measure)

Late, incomplete documents are the main cause of unready first meetings. The completeness rules (`04_...`) plus the assistant's correct requests and the tracker's must-have gate are designed to lift completeness before the first meeting from a scenario baseline of about **70%** to the target **95% or better**, by not booking a first meeting until the must-have set is in, and by requesting exactly the right documents the first time.

## The totals (scenario)

On these assumptions the three service lines model to roughly **428 hours a year** of staff time returned, about **AUD $34,000** at the blended rate, close to **2.7 times** the $12,500 engagement fee. That multiple is a sizing indication, not a promise; it moves with volume and rate. The larger point is qualitative and matches what the partners actually asked for: staff get their time back to spend on clients, every client gets the same warm and organised experience, first meetings are ready, and partners can finally see the whole pipeline.

## What the workbook contains

`tools/benefits_tracker.py` writes `deliverables/Elevate_Benefits_Model.xlsx` with: a Summary of the headline numbers; an editable Assumptions sheet; a Service-line models sheet that recomputes hours and value and confirms the 75% cut; a Document-completeness sheet showing the baseline-to-target lift; and an Adoption log template for the pilot to record real before/after times and completeness rates, so the firm proves the numbers on its own data rather than on this model.

*Figures are scenario estimates under the assumptions above. Elevate Accounting is a representative client scenario used to demonstrate the approach.*
