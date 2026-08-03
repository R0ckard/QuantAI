# Five-Scenario Pilot Test Report

*Elevate Accounting. Testing the future-state onboarding against five representative clients. Scenario results under stated assumptions.*

The brief asks for the future-state process to be tested against five representative client scenarios. This report is that test: five onboardings, spanning the three service lines and the main exception paths, run through the redesigned process to check that it works, holds the assurance and warmth lines, and clears the success measures. The five scenarios are the same ones loaded in the working tracker (`tracker/index.html`), so the report and the prototype tell one story.

## The test method

Each scenario was walked through the common journey using the assistant prompts, the document-request matrix, and the tracker. For each, three things were checked: does the process produce the right result, does it keep a person in control and the tone warm, and does it hit the two success measures (time cut and document completeness). "Pass" means all three.

## The five scenarios

| # | Client (representative) | Service line | What it tests | Result |
|---|---|---|---|---|
| 1 | Hunter & Co Advisory | Business advisory | The clean, full-complexity path end to end | Pass |
| 2 | Riverbend Cafe | Bookkeeping | The fast path, and a partial must-have set mid-collect | Pass |
| 3 | Marlow Family Trust | Business advisory | The complex-structure exception (partner review before request) | Pass |
| 4 | Delta Freight | Tax compliance | The stall path (day-10 flag, personal call, not another email) | Pass |
| 5 | Nguyen Consulting | Tax compliance | The complete, met, and handed-over path | Pass |

## Scenario detail

**1. Hunter & Co Advisory (business advisory, clean path).** The assistant drafted a warm welcome and the correct advisory document request from the matrix. All must-have items were in by day 4, the tracker showed 100% must-have complete, and a briefing pack was prepared. The first advisory meeting could be booked ready. Time: about one staff hour of admin against a four-hour baseline. **Confirms the full path and the time cut.**

**2. Riverbend Cafe (bookkeeping, partial set).** The assistant produced the bookkeeping request (software access, bank feed authority). Mid-collect the tracker correctly showed one must-have item outstanding (bank feed authority) and one nice-to-have (chart-of-accounts), and queued a day-3 reminder that mentioned only the outstanding item. **Confirms the must-have gate and the no-duplicate-chasing rule.**

**3. Marlow Family Trust (business advisory, exception).** The complex structure (a trust plus two entities) correctly held the onboarding at Scope and routed it to a partner before any document request, so the client is not asked for the wrong things. The tracker showed amber with the reason. **Confirms the exception path works and is visible.**

**4. Delta Freight (tax compliance, stall).** After the full reminder cadence (day 3, day 7), two must-have items were still outstanding at day 10. The tracker flagged a stall, stopped the email cadence, and the next action became a personal call, with prompt R2 preparing the owner (what is outstanding, what was already sent). **Confirms the stall is caught, and that the firm's response is a human call, not another email.**

**5. Nguyen Consulting (tax compliance, complete and handed over).** Full must-have set in by day 5, briefing pack prepared, first meeting held, and a warm handover drafted introducing the client to their ongoing contact. **Confirms the close of the journey and the warm-handover experience.**

## Against the success measures

| Success measure (brief) | Result in the pilot scenarios |
|---|---|
| Standard onboarding falls from 3 staff hours to 45 minutes | Met on the modelled admin time; the tax-compliance standard lands at 45 minutes, all lines at a 75% cut |
| At least 95% of required documents in before the first advisory meeting | Met: the must-have gate means a first meeting is not booked until the must-have set is complete |
| All three service-line variants use the approved common process | Met: all five ran the common journey with the correct variant |
| The tracker identifies stage, owner, missing items and next action | Met: confirmed on every scenario, including the amber exception and the red stall |
| Pilot users and partners approve the client tone and usability | The email library and assistant drafts hold a consistent warm tone; a live pilot would confirm with real staff and, where available, client feedback |

## What the pilot would still confirm live

This is a scenario test. A live pilot at Elevate would add what a demonstration cannot: real staff running it on real clients, actual measured times and completeness rates recorded in the benefits-model adoption log, and genuine client feedback on tone and effort. The design is built so that live pilot slots straight into the same tracker and log, replacing these scenario estimates with measured results.

## Conclusion

All five scenarios pass. The redesigned process produces the right result on the clean, fast, exception, stall and complete paths; it keeps a person in control and the tone warm throughout; and it meets the brief's success measures on the scenario assumptions. The recommendation is to proceed to a live pilot per the implementation plan (`10_implementation_and_training_plan.md`), measuring against the same tracker and log so the firm proves the numbers on its own clients.

*Scenario results under the assumptions in `08_benefits_model.md`. Elevate Accounting is a representative client scenario used to demonstrate the approach.*
