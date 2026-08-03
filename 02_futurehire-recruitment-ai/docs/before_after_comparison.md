# Before / After Comparison & Time-Savings Model

> **Illustrative model.** Every figure below is a modelled estimate under the stated assumptions shown. It illustrates the *method* for quantifying benefit; a real engagement would replace these inputs with measured baselines from the six-person pilot.

The brief sets three success metrics: **≥40% less time on the targeted admin tasks**, **median candidate-response preparation time down 50%**, and **≥90% of templates meeting the quality/tone standard**. This model shows how the three pilots clear those bars and what it means at the agency level. All inputs live in the assumptions table and flow through to `tools/benefits_tracker.py`.

## Shared assumptions

| Assumption | Value | Basis |
|---|---|---|
| Recruiters | 24 | Per the brief |
| Working weeks / year | 46 | Allows leave/public holidays |
| Blended recruiter cost of time | AUD $75 / hour | Scenario |
| Value framing | Cost of reclaimed time | Reclaimed hours go to candidate & client contact, not headcount cuts |

The primary, defensible metrics are the **% time reduction** on each task; the dollar figure is an indicative value of reclaimed time.

## Pilot 1, Job-ad drafting

| | Before | After |
|---|---|---|
| Time per ad (draft → post) | **45 min** | **18 min** |
| Consistency / inclusivity | Varies; inclusivity ad hoc | Firm-standard; inclusive-language checked |
| **Reduction** |, | **60%** ✔ |

Volume: **25 ads/week** · saved 27 min/ad → **11.3 hrs/week** → ~**518 hrs/year**.

## Pilot 2, Interview summarisation

| | Before | After |
|---|---|---|
| Time per write-up | **20 min** | **8 min** |
| Structure / fairness | Variable | Structured, evidence-only |
| **Reduction** |, | **60%** ✔ (clears the 50% candidate-summary-prep target) |

Volume: **90 write-ups/week** · saved 12 min each → **18.0 hrs/week** → ~**828 hrs/year**.

## Pilot 3, Hiring-manager updates

| | Before | After |
|---|---|---|
| Time per update | **15 min** | **6 min** |
| Consistency | Varies; sometimes skipped | Firm-standard, reliable |
| **Reduction** |, | **60%** ✔ |

Volume: **80 updates/week** · saved 9 min each → **12.0 hrs/week** → ~**552 hrs/year**.

## Agency-level scenario summary

| | Hours reclaimed / year | Indicative value / year | Task-time reduction |
|---|---|---|---|
| Job-ad drafting | ~518 | ~AUD $38,800 | 60% |
| Interview summarisation | ~828 | ~AUD $62,100 | 60% |
| Hiring-manager updates | ~552 | ~AUD $41,400 | 60% |
| **Three-pilot total** | **~1,898 hrs** | **~AUD $142,300** | **all >40%** |

That's roughly **1.7 hours per recruiter per week** reclaimed, modest per person, material across 24 recruiters. Against the **AUD $22,000** engagement budget, the modelled first-year value is a **~6× return** on the stated scenario assumptions. Even at half these assumptions, every pilot still clears the ≥40% bar and returns several times the fee.

## Meeting the brief's specific targets

- **≥40% less admin time on targeted tasks:** modelled at ~60% across all three, clears it with margin.
- **Median candidate-response prep down 50%:** interview summarisation (and the candidate-comms templates) model ~60%, clears it.
- **≥90% quality/tone:** a pilot pass/fail acceptance metric, held by the shared prompts, templates and recruiter review, measured, not assumed.

## Why the conclusion is robust

The percentage reductions depend only on **per-task time**, the most directly measurable input in the pilot. Volume and dollar assumptions scale the *value*, not the *percentage*, so the "clears 40%/50%" conclusion holds even if the volumes are optimistic.

## Reproduce / adjust

Edit the assumptions at the top of `tools/benefits_tracker.py` and re-run; `deliverables/FutureHire_Benefits_Tracker.xlsx` rebuilds, including a live prioritisation-matrix sheet and an adoption log for real pilot measurements.
