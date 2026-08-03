# Loom Walkthrough, Narration Script

*~6-8 minutes. Open `walkthrough/demo.html` full-screen and advance with → / Next as you speak. Timings are a guide.*

**Recording setup:** full-screen the demo; have `dashboard/index.html`, `case-study/index.html`, `diagrams/workflow-diagrams.html` and the GitHub repo ready to alt-tab to at the end. The live dashboard is worth showing for real: open it, filter to Overdue, and switch between the Actions, Decisions and Risks tabs.

---

### Slide 1 · Title (0:00-0:35)

"Hi, I'm Dave from QuantAI. This is a short walkthrough of a meeting-intelligence system I built for a professional services consultancy. It's a demonstration built around a representative client scenario, and the figures are modelled estimates under stated assumptions. What I want to show you is the method, the working prototypes, and how I keep a human firmly in control of an AI that touches client-confidential material."

### Slide 2 · The problem (0:35-1:35)

"NorthStar is a 65-person firm running about 120 meetings a week, and here's the key insight: they don't have a meeting problem, they have a memory problem. Minutes take up to two hours and vary by team. Actions get written down without an owner or a due date, so they're unaccountable from the start. Incomplete actions don't carry into the next meeting, so they quietly die. Decisions and risks are buried in transcripts. Managers can't see what's overdue across teams. And client-confidential content gets copied between tools with no protocol. They have all the tools already, Teams, Otter, SharePoint, Planner, Power BI, Claude. What's missing is a consistent method, a shared accountable record, and a human in control of what gets published."

### Slide 3 · The approach (1:35-2:30)

"So I designed three things that work together. A taxonomy: five meeting types with one minimum record standard, so a record is consistent whoever ran the meeting. An assistant that turns a transcript into that structured record in minutes. And registers plus a dashboard, so actions carry forward and managers can finally see overdue and stuck work. The whole thing runs on a five-stage workflow: intake, the assistant drafts, a human reviews, it's published, and then follow-up. And two of those stages are human by design and never automated, the review, and confirming every action's owner and due date. That's the line that makes this safe."

### Slide 4 · AI in action, the record (2:30-4:00)

"Let me show you the assistant, because this is where meeting AI usually cheats. Here's a messy bit of transcript. Priya's got a clear action with a deadline. But then, listen, 'someone needs to chase the vendor on that SLA thing.' No owner. Watch what the assistant does. It pulls out Priya's action with her name and the Friday due date. But the vendor one, it does not guess who owns it, it marks it 'owner to confirm' and flags it for the reviewer. That refusal to guess is the whole game: it's what makes '90% of actions have an owner and a due date' a real number rather than a cosmetic one, because the ones it can't assign are surfaced, not faked. It also pulls the migration risk James raised. And nothing, nothing, gets published until a human approves it."

### Slide 5 · AI in action, the dashboard (4:00-5:15)

"And here's the piece the managers will love, because they've never had it. Every action from every meeting, on one screen, with a status the system computes. Look at what the twenty-meeting pilot alone surfaced: six overdue actions, and four that have been carried forward two or more times, including a proposal that's been carried forward three times. These are exactly the items that quietly die today. The system didn't create that backlog, it revealed it. And that's the first step to clearing it. Managers can filter by team, by status, by owner. [*If showing the live dashboard: filter to Overdue, then click through to the Decisions and Risks tabs.*] This is also your searchable memory: what did we decide, and what risks are open, all in one place."

### Slide 6 · Results (5:15-6:05)

"On the measures, all five of the brief's targets are met: minutes drafted in under five minutes, over 90% of actions owned and dated, 90% of summaries usable with minor or no edits, managers can see overdue and carried-forward work by team, and post-meeting admin down about 80%. Across the meetings that warrant a formal record, that admin saving models to roughly 2,700 hours a year. I'm deliberately honest about that number: it depends on how many of the 120 weekly meetings actually get a formal record, so I treat the aggregate as sizing and I lead with the per-meeting measures, which you can measure directly in a pilot."

### Slide 7 · Governance & package (6:05-7:00)

"And the governance, which in a firm handling client-confidential material I lead with, not bury. Three lines we don't cross: nothing is auto-published, a reviewer approves every record; no owner is ever invented, unassigned actions are flagged, not guessed; and client-confidential content follows a clear protocol inside approved tools. An AI that could publish an unreviewed client record on its own would never be trusted, and rightly so. Everything you've seen, the taxonomy, the assistant, the working dashboard, the registers, the templates, the benefits model, the guides, ships as a push-ready GitHub repo, tested on twenty meetings, with a seven-week-plus-hypercare rollout plan. [*Alt-tab to the dashboard and case study.*] Happy to walk your team through adapting it. Thanks for watching."

---

## Optional 90-second cut

Slides 1, 4 (the assistant refusing to guess an owner), 5 (the dashboard revealing the stuck backlog), 7 (governance and close). Slides 4 and 5 are the two strongest moments; lead with the dashboard if the audience is leadership, with the assistant if the audience is the people who write the minutes.
