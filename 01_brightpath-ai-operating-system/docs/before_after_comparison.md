# Before / After Comparison & Time-Savings Model

> **Illustrative model.** Every figure below is a modelled estimate under the stated assumptions shown. It illustrates the *method* for quantifying benefit; a real engagement would replace these inputs with measured baselines from controlled testing.

The brief's success metric is **≥20% cycle-time improvement in controlled testing** on the two pilots. This model shows how each pilot clears that bar and what it implies at the firm level. All inputs live in one place (the assumptions table) and flow through to the benefits tracker spreadsheet (`tools/benefits_tracker.py`) so anyone can change a number and see the effect.

## Shared assumptions

| Assumption | Value | Basis |
|---|---|---|
| Working weeks per year | 46 | Allows leave/public holidays |
| Blended internal cost, advice work | AUD $120 / hour | Adviser + paraplanner blend (scenario) |
| Blended internal cost, client services | AUD $90 / hour | Client-services staff (scenario) |
| Value framing | Cost-of-time reclaimed | Reclaimed hours are redeployed to client-facing work, not headcount cuts |

Cost figures are an **indicative value of reclaimed time**, not a promise of cash savings. The primary, defensible metric is the **% cycle-time reduction** and the **hours reclaimed**.

## Pilot 1, Advice preparation

| | Before | After (AI-assisted) |
|---|---|---|
| Drafting time per advice document (blended adviser+paraplanner) | **5.0 hrs** | **3.3 hrs** |
| Where time goes | Rebuilding boilerplate, re-writing rationale from a blank page, assembling disclosures | Reviewing and correcting a firm-standard first draft; judgement on strategy |
| Consistency | Varies by author | Firm-standard structure every time |
| **Cycle-time reduction** |, | **34%** ✔ (clears ≥20%) |

- Time saved per document: **1.7 hrs**
- Assumed volume: **8 advice documents / week**
- Hours reclaimed: 8 × 1.7 = **13.6 hrs/week** → ~**626 hrs/year**
- Indicative value: 626 × $120 ≈ **AUD $75,000 / year** *(scenario)*

The review step is unchanged or *faster*, because reviewers receive consistent drafts, a guardrail metric in the test plan, not an afterthought.

## Pilot 2, Client communications

| | Before | After (AI-assisted) |
|---|---|---|
| Handle time per composed reply (read → sent) | **6.0 min** | **4.2 min** |
| Triage | By feel | Proposed tag + explicit "possible advice → escalate" |
| Consistency | Varies by author | Firm voice, quality-checked |
| **Cycle-time reduction** |, | **30%** ✔ (clears ≥20%) |

- Time saved per eligible email: **1.8 min**
- Assumed staff doing client email: **16**; composed replies each per day: **15**; share suited to AI assist: **40%**
- Eligible emails/week: 16 × 15 × 5 × 0.40 = **480/week**
- Hours reclaimed: 480 × 1.8 min ÷ 60 = **14.4 hrs/week** → ~**662 hrs/year**
- Indicative value: 662 × $90 ≈ **AUD $60,000 / year** *(scenario)*

100% correct escalation of advice-bearing emails is a **pass/fail guardrail**, the value above is only claimed if that guardrail holds.

## Firm-level scenario summary

| | Hours reclaimed / year | Indicative value / year | Cycle-time reduction |
|---|---|---|---|
| Advice preparation | ~626 | ~AUD $75,000 | 34% |
| Client communications | ~662 | ~AUD $60,000 | 30% |
| **Two-pilot total** | **~1,288 hrs** | **~AUD $135,000** | **both >20%** |

Against the **AUD $18,000** engagement budget, the modelled first-year value of the two pilots alone is a **~7× return on the stated scenario assumptions**, before the remaining four workflows. Stated as a range to respect the uncertainty: even at **half** these assumptions, both pilots still clear the ≥20% bar and return several times the fee.

## Sensitivity (why the conclusion is robust)

The ≥20% cycle-time result does **not** depend on the aggressive volume or dollar assumptions, those only scale the *value*, not the *percentage*. The percentage depends only on per-item drafting/handle-time, which is the most directly measurable input in a real pilot. That is why the recommendation leads with % and hours, and treats dollars as indicative.

## How to reproduce / adjust

Edit the assumptions at the top of `tools/benefits_tracker.py` and re-run it; the spreadsheet in `deliverables/BrightPath_Benefits_Tracker.xlsx` rebuilds with your numbers, including a live opportunity-matrix sheet.
