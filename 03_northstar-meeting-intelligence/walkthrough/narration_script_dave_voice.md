# Loom Walkthrough, Narration Script (Dave's voice, as delivered)

*~6-8 minutes. Open `walkthrough/demo.html` full-screen and advance with → / Next as you speak. This version is locked to how Dave actually read it aloud, so the phrasing, the "right?"s, the "tick tick tick" and the asides are his own. Timings are a guide. Say it, don't read it.*

**Setup:** full-screen the demo; have `dashboard/index.html`, `case-study/index.html` and the repo ready to alt-tab to at the end. Worth opening the live dashboard for real and clicking about in it.

---

### Slide 1 · Title (0:00-0:35)

"Hi, I'm Dave from QuantAI. So this is a quick walkthrough of a meeting-intelligence setup that I put together for a professional services firm. Fair warning first: it's a demo, built on a representative scenario rather than real client work, so the numbers are modelled. What I actually want to really show you is the method that I use, the working bits, and how I keep a person in charge of the parts that matter."

### Slide 2 · The problem (0:35-1:35)

"So here's the thing about NorthStar. It's a 65-person firm doing around 120 meetings a week, and they don't really have a meeting problem as such. What they've got is a memory problem. So the meetings take a couple of hours, and every team does them differently, and actions get written down with no owner and no date, so they're basically unaccountable from the very off. Now, the ones that don't get finished never make it into the next meeting, so they just quietly die. Decisions and risks end up buried in a transcript somewhere. And managers can't see what's overdue across teams. The tools are all there, Teams, Otter, SharePoint, Planner, the lot. What's missing is a consistent way of doing it, and a record people can actually trust."

### Slide 3 · The approach (1:35-2:30)

"So I built three things that work together. First, a taxonomy: right, five meeting types, and one minimum standard for what a record has to contain, that way it's consistent no matter who runs the meeting. Second, an assistant that turns the transcript into that record in minutes. And third, registers and a dashboard, so actions carry forward and managers can finally see what's overdue and what's stuck. The rule running through all of it: the assistant drafts, a human reviews and approves, and every action gets a real owner and a date, or it gets flagged. It never guesses. And that's the line that really makes this safe to use."

### Slide 4 · AI in action, the record (2:30-4:00)

"Okay, so let me show you the assistant, because this is where meeting AI usually cheats. So here's a messy bit of transcript. Priya's got a clear action with a deadline, fine. But then, listen to this one: 'someone needs to chase the vendor on that SLA thing.' No owner. Watch what it does. It pulls out Priya's action with her name and the date. But the vendor one, it won't guess who owns it. It marks it 'owner to confirm' and flags it for the reviewer. And that's the whole game, really, because that refusal to guess is what makes '90% of actions have an owner and a date' an actual number instead of a cosmetic one, right? It grabs the risk James raised too. And absolutely nothing gets published until a human's approved it."

### Slide 5 · AI in action, the dashboard (4:00-5:15)

"Right, so this is the bit the managers will love, because they've never had it. Every action from every meeting, on one screen, with a status the system works out for itself. And look what just twenty meetings surfaced: six actions overdue, and four that have been carried forward two or more times. There's a proposal on there that's been carried forward three times. I mean, those are exactly the things that quietly die today. So the system didn't create that backlog, it just made it visible. And that's the first step to actually clearing it. So managers can filter by team, by owner, whatever they need. And it's your searchable memory too, right? So what did we decide, what risks are open, it's all in the one place."

### Slide 6 · Results (5:15-6:05)

"So, on the numbers. All five of the targets in the brief are met: minutes drafted in under five minutes, over 90% of actions with an owner and a date, 90% of summaries good to go with a light edit at most, managers able to see what's overdue and carried-forward by team, and post-meeting admin down by about 80%. Tick, tick, tick, tick, tick. Across the meetings that actually warrant a formal record, that admin saving comes out around 2,700 hours a year. So I'll be straight with you though: that number depends on how many of the 120 weekly meetings you decide to formally record, so I treat it as a sizing number, not a promise. And I lead with the per-meeting stuff, because that's the bit that you can actually measure directly in a pilot."

### Slide 7 · Governance and what's delivered (6:05-7:00)

"And the governance, which in a firm handling client-confidential stuff I lead with rather than bury. Right, there's three lines we don't cross: nothing gets auto-published, a human approves every record; no owner is ever invented, unassigned actions get flagged, not guessed; and client-confidential content stays inside approved tools under a clear rule. An AI that could publish an unreviewed client record on its own, nobody's going to trust that, and they shouldn't. Everything you've seen, the taxonomy, the assistant, the working dashboard, the registers, the templates, the benefits model, the guides, it all ships as a GitHub repo. Doesn't matter if you don't know what GitHub is. Tested on twenty meetings, with a rollout plan. Anyway, that's the gist. Happy to walk your team through adapting it. Thanks for watching."

---

## Quick 90-second cut

Slides 1, 4 (the assistant refusing to guess an owner), 5 (the dashboard showing the stuck backlog), 7 (governance and close). Four and five are the strongest bits, lead with the dashboard if you're talking to leadership, the assistant if you're talking to the people who write the minutes.
