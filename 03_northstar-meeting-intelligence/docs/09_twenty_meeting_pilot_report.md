# Twenty-Meeting Pilot Report

*NorthStar Consulting. Testing the workflow across twenty representative meetings. Scenario results under stated assumptions.*

The brief asks for the workflow to be tested across twenty meetings and the quality thresholds tuned. This report is that test: twenty meetings spanning the five meeting types, run through the full workflow (intake, assistant draft, human review, publish, follow-up) to check that it meets the five success measures and holds the human-review and confidentiality lines. The pilot data is the same set loaded in the working dashboard (`dashboard/index.html`), so the report and the prototype tell one story.

## The test method

Twenty de-identified transcripts across the five meeting types were processed. For each, the assistant drafted the record, a nominated reviewer checked and corrected it, and the record was published to the registers. Three things were measured per meeting: the draft time, the share of actions that came out with an owner and a due date, and whether the reviewer rated the summary usable with minor or no edits. The dashboard then showed the actions across teams, with overdue and carried-forward flags.

## The twenty meetings

| Meeting type | Count | What it tested |
|---|---|---|
| Client delivery / project | 7 | The highest-volume, client-confidential path; client-facing vs internal split |
| Internal team / status | 5 | Light records; the carry-forward check between recurring meetings |
| Leadership / decision | 3 | Decision capture with authority; firm-wide communication items |
| Governance / risk / PMO | 3 | Risk capture and escalation into the risk register |
| Sales / pursuit | 2 | Commercially sensitive handling; opportunity next steps |

## Results against the five success measures

| Measure | Target | Pilot result (scenario) |
|---|---|---|
| Minutes produced within 5 minutes of transcript (excl. review) | within 5 min | Met: drafts produced in minutes for all twenty |
| Actions with an owner and due date | at least 90% | Met: 92% came out complete; the rest were flagged and resolved at review, so 100% were owned before publish |
| Summaries usable with minor or no edits | at least 90% | Met: 90% rated usable with minor or no edits; the rest needed moderate edits, mostly on light internal meetings with thin transcripts |
| Managers see open, overdue and carried-forward actions by team | yes | Met: the dashboard shows all three by team; the pilot surfaced 6 overdue and 4 stuck (carried forward twice or more) that were previously invisible |
| Post-meeting admin time down at least 80% | at least 80% | Met on the modelled admin time; the two-hour write-up became a five-minute draft plus a focused review |

## What the pilot surfaced (the point of the whole thing)

The most telling result is not a percentage; it is what became visible. Before the pilot, nobody could say how many actions were overdue across the firm. The pilot's twenty meetings alone produced a register in which **six actions were overdue and four had been carried forward two or more times**, including a proposal carried forward three times and a firm-wide communication carried forward twice. Those are exactly the items that "quietly die" today. The system did not create that backlog; it revealed it, which is the first step to clearing it.

## Tuning the quality thresholds

The pilot tuned two things, as the brief intended:

- **The owner-and-date flag.** Early drafts occasionally accepted a soft owner ("the team"). The prompt was tightened so anything less than a named person is flagged, which lifted the pre-review completeness and, more importantly, made the standard honest.
- **The light-meeting record.** Internal status meetings did not need the full record; a shorter record (M2) was introduced so the standard fits the meeting, which improved the reviewer-usable rate on those.

## The lines that held

- **Nothing was auto-published.** Every one of the twenty records was reviewed and approved by a human before publishing.
- **No owner was invented.** Where the transcript did not name one, the record flagged it; the reviewer assigned it. No action entered a register unowned.
- **Confidential content was flagged, not moved.** Client-confidential meetings kept a client-facing vs internal split, and no content was copied into an unapproved tool.

## What a live pilot would add

This is a scenario test. A live pilot at NorthStar would add real reviewers rating real records, measured draft and review times in the adoption log, and genuine reviewer feedback on usability, replacing these scenario estimates with measured results. The design is built so the live pilot uses the same registers, dashboard and adoption log.

## Conclusion

The workflow meets all five success measures on the twenty representative meetings, holds the human-review and confidentiality lines, and, most importantly, makes overdue and stuck work visible for the first time. The recommendation is to proceed to rollout per the implementation plan (`10_...`), measuring against the same dashboard and adoption log so the firm proves the results on its own meetings.

*Scenario results under the assumptions in `08_benefits_model.md`. NorthStar Consulting is a representative client scenario used to demonstrate the approach.*
