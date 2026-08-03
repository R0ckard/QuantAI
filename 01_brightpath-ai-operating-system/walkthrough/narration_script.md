# Loom Walkthrough, Narration Script

*~6-8 minutes. Open `walkthrough/demo.html` full-screen and advance with → / Next as you speak. Timings are a guide.*

**Recording setup (30 sec before you hit record):** full-screen the demo, have `case-study/index.html`, `diagrams/workflow-diagrams.html` and the GitHub repo tab ready to alt-tab to at the end. Speak conversationally; the slides carry the structure.

---

### Slide 1 · Title (0:00-0:35)

"Hi, I'm Dave from QuantAI. This is a short walkthrough of an AI operating system I built for a financial-planning firm, BrightPath. It's a demonstration built around a representative client scenario, and the figures you'll see are modelled estimates under stated assumptions, what I really want to show you is the method and the assets. Let's dig in."

*(If asked, be upfront that BrightPath is an illustrative scenario rather than a live client, just no need to lead with it.)*

### Slide 2 · The problem (0:35-1:35)

"BrightPath is a 32-person Melbourne firm that grew fast. Here's the situation I see constantly: they're *already* using Claude and ChatGPT every day, but every adviser has invented their own way of doing it. Emails and advice drafts get rewritten from scratch, prompts are all different so quality never compounds, and, the part that matters in a licensed advice business, some people are pasting client data into tools with no safeguards, while others avoid AI completely. And there's no baseline, so leadership can't even tell if it's helping. I scored their maturity at about 1.6 out of 5. The fix isn't more tools, it's putting standards, configuration and governance around the tools they already own."

### Slide 3 · The approach (1:35-2:30)

"So I designed a four-layer operating system. Governance on top, acceptable use, the human-review gates, what data can go where. Then workflow standards, one agreed method per workflow, written as SOPs. Then configured tools, Claude Projects per workflow plus a shared, versioned prompt library, so a good prompt becomes everyone's, not just one adviser's. And people, playbooks, an AI Champion in each department, training, and measurement. The principle running through all of it: AI drafts, a qualified human decides, and every improvement is captured once and reused."

### Slide 4 · Pilot 1 diagrams (2:30-3:40)

"Rather than boil the ocean, I built two pilots end-to-end. First, advice preparation. Today it's about five hours to draft an advice document, advisers hunt for the last similar one, rebuild boilerplate, write the rationale from a blank page. In the future state, they give structured inputs, with client details as placeholders, and a configured Claude Project returns a firm-standard first draft. Then the critical step: the adviser reviews it against the file and the best-interests duty, and signs. The AI never issues advice. On the scenario assumptions that's about 34% faster to draft, *and* review gets faster too, because drafts arrive consistent."

### Slide 5 · Pilot 2 live demo (3:40-5:00)

"Second pilot, client email, and this is the one I want to actually show working. Here's a real-shaped inbound: the client asks two things at once. 'Should I switch my super to cash?', and 'can we move the meeting to Friday?' Watch what the system does. It triages: the meeting request is routine, but 'should I switch my super' is a financial-advice question. So it does *not* answer it. It drafts a warm holding reply, handles the booking, and flags the advice part to escalate to an adviser, with the client's details as placeholders, for a human to send. That guardrail, an advice question never getting a casual AI answer, is the whole point of doing this properly in a regulated business."

### Slide 6 · Results (5:00-6:00)

"Here's the scenario impact. Advice drafting down about 34%, email handling down about 30%, both clear the brief's 20% target. Across the two pilots that's roughly 1,288 hours a year reclaimed, and on the modelled assumptions, several times the engagement fee. I want to be honest about these numbers: the *percentages* only depend on per-item time, which is directly measurable, so they're the robust part. The dollar figures scale with volume assumptions, so I treat those as indicative. And it's all in one editable spreadsheet, so as the firm measures real results, the model becomes a live dashboard instead of a projection."

### Slide 7 · Governance & package (6:00-7:00)

"Last thing, governance, because this is regulated advice. The human-review gate is designed to be unavoidable, not optional. Client data stays out of the tools through a placeholder habit, only business-tier tools with training switched off are approved, and there's a short, signed framework that maps to the best-interests duty, ASIC's guidance and the Privacy Act. And everything you've seen, the strategy docs, the prompt library, the Project configs, the diagrams, the benefits tracker, two editable SOPs, ships as a push-ready GitHub repo. [*Alt-tab to the repo / case study.*] If you'd like, I can walk your team through adapting this to your stack. Thanks for watching."

---

## Optional 90-second cut

For a shorter version, use slides 1, 5 (the live demo), 6 (results) and 7 (close) only, the live triage demo and the results are the strongest 90 seconds.
