# Benefits Model

*NorthStar Consulting. Scenario estimates under stated assumptions, not measured client outcomes.*

The brief sets five success measures, and most of them are per-meeting quality and speed targets, not a dollar figure. This document models the time saving behind the "post-meeting admin down at least 80%" target, and sets out how the other four measures are met. It is reproducible: `tools/benefits_tracker.py` builds the spreadsheet from exactly these assumptions.

## How to read this

The honest headline is the **five success measures**, which the pilot verifies directly. The aggregate hours and dollar figure are the admin saving scaled across the meetings that warrant a formal record; they size the prize but depend heavily on one assumption (how many of the 120 weekly meetings get a formal record), which is stated plainly and kept conservative.

## The five success measures (the real targets)

| Measure (brief) | Target | How it is met |
|---|---|---|
| Standard minutes produced quickly | within 5 minutes of transcript, excluding review | The assistant drafts the full record in minutes (process stage); review is separate |
| Actions have an owner and a due date | at least 90% | The record standard requires it; the assistant flags gaps rather than guessing; the reviewer resolves them before publish |
| Summaries usable with minor or no edits | at least 90% | The assistant drafts to the standard template for the meeting type; the reviewer confirms |
| Managers see open, overdue and carried-forward actions by team | yes | The manager dashboard, over the action register |
| Post-meeting administration time | down at least 80% | The time model below |

The first four are quality and capability targets, met by design and confirmed in the twenty-meeting pilot. The fifth is the time model.

## The time model (the 80% admin cut)

### Assumptions (all editable in the script)

- **Firm:** 65 people, about 120 meetings a week. **Crucially, not every meeting warrants a formal record.** This model counts only the meetings that do (client delivery, leadership, governance, and the internal and sales meetings that produce actions), a deliberately conservative **43 records a week**, about 36% of all meetings. This is the single most important assumption and the main lever on the aggregate figure.
- **Blended cost of the time spent writing up meetings:** AUD $80 per hour. **Working weeks:** 46.
- **Engagement fee benchmark:** AUD $15,000.

### Per meeting type

| Meeting type | Before (admin per meeting) | After (incl review) | Cut | Records / week |
|---|---|---|---|---|
| Client delivery / project | 2.0 h | 0.4 h | 80% | 18 |
| Leadership / decision | 2.0 h | 0.4 h | 80% | 4 |
| Internal team / status | 1.0 h | 0.2 h | 80% | 12 |
| Sales / pursuit | 1.5 h | 0.3 h | 80% | 5 |
| Governance / risk / PMO | 2.5 h | 0.5 h | 80% | 4 |

The 80% cut is the brief's target and is what the workflow delivers: the two-hour manual write-up becomes a five-minute assistant draft plus a focused human review. The "after" figure deliberately includes the review time, because review is mandatory and never removed; the saving is on the drafting and structuring, not the human check.

### Why 80% is defensible

The saving is the removal of the manual write-up, not the removal of the human. Today someone reads back through a transcript or their notes and composes minutes from scratch, up to two hours. In the future state the assistant produces a structured, on-standard draft in minutes, and the human spends a focused block reviewing and correcting rather than authoring. The 20% that remains is exactly the part that must stay human: the review, the confirmation of owners and dates, and the confidentiality check.

## The aggregate (scenario, and sensitive to the record-count assumption)

On these assumptions the admin saving is roughly **2,700 hours a year**, about **AUD $216,000** of staff time at the blended rate. That is a large number because the firm runs a lot of meetings, and it is **sensitive to the 43-records-a-week assumption**: halve the number of meetings that get a formal record and the aggregate halves. So the aggregate is presented as sizing, not a promise, and the per-meeting measures (the 80% cut, the 5-minute draft, the 90% quality targets) are the robust, directly measurable results the pilot confirms.

## What the workbook contains

`tools/benefits_tracker.py` writes `deliverables/NorthStar_Benefits_Model.xlsx` with: a Summary; an editable Assumptions sheet (including the record-count lever); a Meeting-type models sheet that recomputes the admin saving and confirms the 80% cut; a Success-measures sheet listing all five targets and how each is met; and an Adoption log template for the pilot to record real times, action-completeness and reviewer-usable rates.

*Figures are scenario estimates under the assumptions above. NorthStar Consulting is a representative client scenario used to demonstrate the approach.*
