# Meeting Workflow Audit and Current-State Baseline

*NorthStar Consulting. Findings are constructed from the brief to demonstrate the method, not from live interviews.*

## 1. Method (as scoped)

A real engagement would interview meeting owners, reviewers and managers, run a workshop per meeting type, and sample a few weeks of real meetings (de-identified) to baseline how long minutes take, how many actions carry an owner and a due date, and how often decisions and risks are lost. This demonstration reconstructs the likely findings from the brief so the future-state design has something concrete to work against.

## 2. Where NorthStar is today

NorthStar runs about **120 meetings a week** across 65 people, and almost none of that produces a reliable, findable record. The firm does not have a meeting problem; it has a **memory problem**. Decisions get made and then cannot be retrieved. Actions are written down inconsistently, often without an owner or a due date. Incomplete actions are not carried into the next meeting, so they quietly die. Managers cannot see overdue work across teams. And because nothing reliable is written down, the same discussions get repeated, which is the most expensive symptom of all.

Six themes come out of the reconstructed audit.

**Minutes vary by team and are slow.** Every team writes minutes its own way, and preparing them can take up to two hours per meeting. The quality depends entirely on who happened to take notes.

**Actions lack owners and due dates.** Actions are captured as vague statements ("we should follow up with the client") with no named owner and no date, so accountability is weak from the moment the meeting ends.

**Actions do not carry forward.** An incomplete action from last week rarely makes it into this week's meeting. There is no mechanism to carry open work forward, so things fall through the cracks.

**Decisions and risks are buried.** The decision that matters and the risk someone raised are somewhere in a transcript or a personal notebook, effectively unsearchable. Three months later nobody can say what was decided or why.

**Managers are blind across teams.** There is no view of open, overdue or carried-forward actions across the firm, so a manager cannot see where work is stuck or which team is overloaded.

**Confidential content moves without a protocol.** Client-confidential material gets copied between tools (a transcript here, a summary there) without a clear rule for what is allowed where. In a professional services firm that is a real governance exposure.

**The tools are already there.** Teams, Otter.ai, SharePoint, Planner, Lists, Outlook, Power BI and Claude Team are all in place. The gap is not technology. It is a consistent method, a shared and accountable record, and a way for managers to see it.

## 3. What leadership actually wants

From the brief, leadership wants a practical meeting-intelligence system that:

- converts transcripts into useful, consistent meeting records;
- improves visibility and accountability for decisions, risks and actions;
- reduces the administrative effort after meetings;
- establishes a searchable organisational memory and management reporting;
- and maintains human review, access and confidentiality controls.

The through-line is **accountability and memory at scale**. This is not about producing a nicer set of minutes for one meeting; it is about making sure that across 120 meetings a week, decisions are findable, every action has an owner and a due date, open work carries forward, and managers can see it. The human-review and confidentiality controls are non-negotiable because this is a professional services firm handling client-confidential material.

## 4. Baseline the pilot will confirm (scenario)

| Measure | Scenario baseline | Where the brief wants it |
|---|---|---|
| Time to prepare minutes | up to 2 hours per meeting | minutes within 5 minutes of transcript, excluding review |
| Actions with a clear owner and due date | roughly half | at least 90% |
| Summaries usable with minor or no edits | inconsistent | at least 90% |
| Manager visibility of overdue and carried-forward actions | none | by team, on a dashboard |
| Post-meeting administration time | the baseline | down at least 80% |

These are the brief's success criteria, and they are what the twenty-meeting pilot measures.

## 5. Constraints that shape the design

- **Human review before publish.** Nothing is auto-published (a stated exclusion). A nominated reviewer validates each record.
- **Use the existing Microsoft and Claude stack.** Teams, Otter.ai, SharePoint, Planner, Lists, Outlook, Power BI and Claude Team stay; the job is a method and prototypes on top, not new tools or a custom transcription engine.
- **Confidentiality.** Client-confidential content is handled inside approved tools under a clear protocol, consistent with the Privacy Act 1988.
- **De-identified, non-production data** for the prototype unless access is explicitly granted.

## 6. Implication

Design a firm-wide **meeting-intelligence method**: a taxonomy of meeting types with a minimum record standard, an assistant that turns a transcript into a structured, owned record, registers that carry actions forward, dashboards that make it visible to managers, and governance that keeps a human in control and confidential content protected. Prove it on twenty representative meetings. That is what the rest of this repository specifies.
