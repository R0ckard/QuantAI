# Loom Walkthrough, Narration Script (Dave's voice)

*~6-8 minutes. Open `walkthrough/demo.html` full-screen and advance with → / Next as you speak. Written in Dave's spoken voice (profile v0.2). Say it, don't read it, and change anything that isn't how you'd put it.*

**Setup:** full-screen the demo; have `case-study/index.html`, `diagrams/workflow-diagrams.html` and the GitHub repo ready to alt-tab to at the end.

---

### Slide 1 · Title (0:00-0:35)

"Hi, I'm Dave from QuantAI. So this is a quick walkthrough of an AI operating system that I built for a financial-planning firm, BrightPath. Fair warning first: it's a demo, built on a representative scenario rather than real client work, so the numbers are modelled. What I actually want to show you is the method, and the assets. Let's dig in."

### Slide 2 · The problem (0:35-1:35)

"So here's the thing about BrightPath. It's a 32-person Melbourne firm that grew fast, and this is a situation I see all the time: they're already using Claude and ChatGPT every day, but every adviser's invented their own way of doing it. So emails and advice drafts get rewritten from scratch, everyone's prompts are different so the quality never compounds, and, the bit that really matters in a licensed advice business, some people are pasting client data into tools with no safeguards, while others avoid AI completely. And there's no baseline, so leadership can't even tell if it's helping. I scored their maturity at about 1.6 out of 5. So the fix isn't more tools, right, it's putting standards, configuration and governance around the tools they've already got."

### Slide 3 · The approach (1:35-2:30)

"So I designed a four-layer operating system. Governance on top: acceptable use, the human-review gates, what data can go where. Then workflow standards, one agreed method per workflow, written up as SOPs. Then configured tools, Claude Projects per workflow plus a shared, versioned prompt library, that way a good prompt becomes everyone's, not just one adviser's. And then people: playbooks, an AI Champion in each department, training, and measurement. And the principle running through all of it: AI drafts, a qualified human decides, and every improvement gets captured once and reused."

### Slide 4 · Pilot 1, advice preparation (2:30-3:40)

"So rather than boil the ocean, I built two pilots end to end. First one, advice preparation. Today it's about five hours to draft an advice document, the adviser hunts for the last similar one, rebuilds the boilerplate, writes the rationale from a blank page. In the future state, they give structured inputs, with the client details as placeholders, and a configured Claude Project gives back a firm-standard first draft. Then the critical bit: the adviser reviews it against the file and the best-interests duty, and signs. The AI never issues advice. On the scenario assumptions that's about 34% faster to draft, and the review gets quicker too, because the drafts turn up consistent."

### Slide 5 · Live demo, email triage (3:40-5:00)

"Right, second pilot, client email, and this is the one I really want to show you working. So here's a real-shaped inbound: the client asks two things at once. 'Should I switch my super to cash?', and 'can we move the meeting to Friday?' Watch what it does. It triages: the meeting request is routine, but 'should I switch my super' is a financial-advice question. So it does not answer it. It drafts a warm holding reply, sorts the booking, and flags the advice part to escalate to an adviser, with the client's details as placeholders, for a human to send. And that guardrail, an advice question never getting a casual AI answer, that's the whole point of doing this properly in a regulated business."

### Slide 6 · Results (5:00-6:00)

"So, on the numbers. Advice drafting down about 34%, email handling down about 30%, and both clear the brief's 20% target. Tick, tick. Across the two pilots that's roughly 1,288 hours a year back, and on the modelled assumptions, several times the engagement fee. I'll be straight with you about these numbers though: the percentages only depend on per-item time, which you can measure directly, so that's the robust part. The dollar figures scale with the volume assumptions, so I treat those as indicative. And it's all in one editable spreadsheet, so as the firm measures the real results, the model turns into a live dashboard instead of a projection."

### Slide 7 · Governance and package (6:00-7:00)

"And last thing, the governance, because this is regulated advice. The human-review gate is built to be unavoidable, not optional. Client data stays out of the tools through a placeholder habit, only business-tier tools with training switched off are approved, and there's a short, signed framework that maps to the best-interests duty, ASIC's guidance and the Privacy Act. And everything you've seen, the strategy docs, the prompt library, the Project configs, the diagrams, the benefits tracker, two editable SOPs, it all ships as a GitHub repo. Doesn't matter if you don't know what GitHub is. If you'd like, I can walk your team through adapting this to your stack. Thanks for watching."

---

## Quick 90-second cut

Slides 1, 5 (the live triage demo), 6 (results) and 7 (close). The triage demo and the results are the strongest 90 seconds.
