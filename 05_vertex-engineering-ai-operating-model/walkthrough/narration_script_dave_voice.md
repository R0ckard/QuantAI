# Loom Walkthrough, Narration Script (Dave's voice)

*~6-8 minutes. Open `walkthrough/demo.html` full-screen and advance with → / Next as you speak. Written in Dave's spoken voice (profile v0.2). Say it, don't read it.*

**Setup:** full-screen the demo; have `case-study/index.html`, `diagrams/workflow-diagrams.html` and the GitHub repo ready to alt-tab to at the end.

---

### Slide 1 · Title (0:00-0:35)

"Hi, I'm Dave from QuantAI. So this is a quick walkthrough of an AI operating model that I built for a mid-sized engineering consultancy. Fair warning first: it's a demo, built on a representative scenario rather than real client work, so the numbers are modelled. What I actually want to show you is the method, the working assets, and the way I handle the assurance side, which in an engineering firm is basically the whole ballgame."

### Slide 2 · The problem (0:35-1:35)

"So Vertex is a 52-person Melbourne firm, and here's what makes it interesting: they'd already done the hard part. They'd bought three capable AI platforms, Copilot, Claude Team and ChatGPT Enterprise. So their problem was the opposite of scarcity. There were no decision rules for which tool to use when, no shared workflows, no governance, and no way to connect licence spend to benefit. Adoption was split, right, a few enthusiasts using the tools privately, and a lot of cautious staff avoiding them, because their technical people were rightly worried about accuracy, confidentiality and professional liability. So the job wasn't more technology as such. What it needed was an operating model, built so a qualified professional owns and signs every technical output."

### Slide 3 · The model on a page (1:35-2:30)

"So here's the whole model on one page: four layers, and each one answers a question. Governance and assurance sits on top, deliberately, because in an engineering firm professional accountability is the constraint everything else respects. Below that: tool selection, which AI for which task. Then firm-standard workflows. Then capability and people, the Champions and the training that make it stick. And running through all four layers is one sentence: AI assists, a qualified professional decides and signs, and every improvement gets captured once and reused by the firm. If a use of AI can't pass that test, it doesn't go in the model."

### Slide 4 · Which AI for which task (2:30-3:25)

"So this layer's the piece Vertex was missing most, and it's my signature deliverable. They didn't need another tool, they needed a rule for the three they'd already got. So: Copilot for work that lives inside your Microsoft files and meetings, because it's already got the context in your tenant. Claude for careful drafting and review of long, important documents. ChatGPT for open-ended thinking and quick generation. It's a ten-second decision path, four questions. And sitting above every choice is one rule: anything confidential or client-related goes into approved enterprise tools only, never a personal account. And that single framework, right, that turns three overlapping licences into one deliberate toolkit."

### Slide 5 · Live AI in action, the assurance guard (3:25-4:55)

"Right, now the one I really want to show you, because this is where AI in an engineering firm usually goes wrong: technical report drafting. So the critical design choice is that the engineer does and owns all the technical work first, without AI. Then they hand the finished, fixed numbers to the AI to draft the report around. Watch what happens when the input's got a tempting instruction in it, 'draft the report and confirm it complies with the AS code.' The system drafts the report to template and reproduces the engineer's figures exactly, but look, it refuses to recompute or check them, and it won't add a 'complies with' statement. It says, in writing, that verification and code compliance are the engineer's professional judgement to state and sign, not the AI's. It even strips the implied compliance claim out and hands it back with an 'engineer to confirm' marker. So the AI takes away the drafting and formatting drudgery and leaves every gram of professional judgement exactly where it belongs. And that guardrail, that's the difference between AI an engineering firm can adopt and AI it can't."

### Slide 6 · Results (4:55-5:50)

"So, on the numbers. The three pilots model at 27, 30 and 33% less cycle time, all comfortably past the brief's 15% bar. Tick, tick, tick. That's around 1,410 hours a year, roughly 3.8 times the engagement fee on the modelled assumptions. Two honesty notes. First, on the technical report, none of that saving comes from the engineering work, it's all drafting, formatting and QA, and none of the engineer's time gets taken. Second, the percentages are the robust part, because they only depend on per-task time, which you can measure directly in the pilot. The dollar figure scales with volume, so I treat it as sizing, not a promise. And it all sits in one editable tracker that turns into a real dashboard as the pilot produces the actuals."

### Slide 7 · Governance and package (5:50-6:55)

"And the governance, which for an engineering firm I lead with rather than bury: the AI never performs, checks, verifies or certifies engineering work, and never says anything complies with a standard, a qualified engineer owns every technical output and signs everything a client sees. And framed well, that's not a brake, right, it's the reason the most cautious engineers say yes. Everything you've seen, the operating model, the tool-selection framework, the governance and assurance layer, the prompt library, the Project configs, the playbook, the SOPs, the benefits tracker, it all ships as a GitHub repo. Doesn't matter if you don't know what GitHub is. And the rollout's sequenced deliberately, a safe, visible quick win on status reporting first, to earn the trust you need for the high-stakes technical-report pilot. Happy to walk your team through adapting it. Thanks for watching."

---

## Quick 90-second cut

Slides 1, 5 (the assurance guard), 6 (results), 7 (close). The assurance-guard demo is the strongest 90 seconds, lead with it if time's tight.
