# Document-Request Matrix and Completeness Rules

*Elevate Accounting. The heart of the redesign: ask for exactly the right things, once, and know when you have enough to start.*

Late and incomplete documents are the single biggest cause of delayed first meetings. This document fixes that with two things: a **matrix** that says precisely which documents each service line needs (so nobody over-asks or under-asks), and a set of **completeness rules** that define when an onboarding has enough to proceed. The Client Onboarding Assistant builds every document request from this matrix, so the request is correct and consistent every time.

## The document-request matrix

Legend: ● required · ◐ if applicable · ○ not usually needed. "Core" items are requested for every client.

| Document | Business advisory | Tax compliance | Bookkeeping |
|---|:---:|:---:|:---:|
| **Core: identity of signatory** (per firm AML/KYC control) | ● | ● | ● |
| **Core: entity details** (ABN, structure, registrations) | ● | ● | ● |
| **Core: authority to act / prior accountant contact** | ● | ● | ● |
| **Core: bank account details** (for reporting, not payment) | ● | ● | ● |
| TFN and ATO agent linking | ◐ | ● | ○ |
| Prior-year financial statements | ● | ● | ◐ |
| Prior-year tax returns | ◐ | ● | ○ |
| Current-year management accounts | ● | ◐ | ◐ |
| Accounting software access (Xero and similar) | ● | ◐ | ● |
| Bank feed authority | ◐ | ○ | ● |
| Chart-of-accounts preferences | ◐ | ○ | ● |
| Entity structure diagram | ● | ◐ | ○ |
| Advisory goals / pre-meeting note | ● | ○ | ○ |
| Other advisers (planner, lawyer, banker) | ◐ | ○ | ○ |

The matrix is the single source of truth for "what do we ask this client for." When a service line's needs change, the matrix changes once, and every future request follows, because the assistant reads from it rather than from whatever an individual remembers.

## Completeness rules (when can we start?)

"Complete enough to proceed" is defined, not guessed. Each service line has a **must-have set** (onboarding cannot proceed to setup without these) and a **nice-to-have set** (chased, but do not block a start).

| Service line | Must-have to proceed (step 6) | Chased, but not blocking |
|---|---|---|
| Business advisory | All Core items; prior-year financials; software access; advisory goals note | Management accounts; structure diagram; other advisers |
| Tax compliance | All Core items; TFN and ATO linking; prior-year returns | Prior-year financials; management accounts |
| Bookkeeping | All Core items; software access; bank feed authority | Chart-of-accounts preferences |

**The 95% rule (the brief's success target).** The firm's target is that at least 95% of required documents are in before the first advisory meeting. Operationally that means: an onboarding is not booked for its first advisory meeting until its **must-have set is complete**, and the tracker shows the must-have completeness for every onboarding so nobody schedules a meeting that will be spent chasing paperwork.

## Reminder cadence (consistent, never duplicated)

Reminders were manual and sometimes doubled up. Now they are a defined, gentle cadence, drafted by the assistant and sent by the owner, and the tracker records the last reminder so two people never chase the same client:

1. **Day 0:** document request sent (warm, clear, with the list and how to upload).
2. **Day 3:** a light "just checking these reached you" nudge, only for outstanding must-have items.
3. **Day 7:** a short "anything we can help with?" that offers to walk the client through it.
4. **Day 10:** the tracker flags a **stall**; the owner makes a **personal call**, not another email.

The cadence stops as soon as the must-have set is complete. Reminders only ever mention what is actually outstanding, so a client is never asked for something they already sent, which was one of the most damaging small failures in the current process.

## How this connects to the rest of the build

The assistant's **document-request prompt** (`prompts/`) reads this matrix to build a correct, warm request for the client's service line. The **tracker** (`tracker/`) shows must-have completeness and the reminder state for every onboarding, and raises the stall flag at day 10. The **completeness rule** is the gate the tracker uses to say an onboarding is ready for its first meeting. One matrix, one set of rules, applied the same way to every client.
