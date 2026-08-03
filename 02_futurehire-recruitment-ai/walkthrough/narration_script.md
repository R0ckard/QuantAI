# Loom Walkthrough, Narration Script

*~6-8 minutes. Open `walkthrough/demo.html` full-screen and advance with → / Next as you speak. Timings are a guide.*

**Recording setup:** full-screen the demo; have `case-study/index.html`, `diagrams/workflow-diagrams.html` and the GitHub repo ready to alt-tab to at the end.

---

### Slide 1 · Title (0:00-0:35)

"Hi, I'm Dave from QuantAI. This is a short walkthrough of an AI transformation I built for a technology-recruitment agency. It's a demonstration built around a representative client scenario, and the figures are modelled estimates under stated assumptions, what I want to show you is the method, the working assets, and how I handle the fairness side, which in recruitment is everything."

### Slide 2 · The problem (0:35-1:35)

"FutureHire is a Sydney agency where recruiters were drowning in admin, drafting ads, writing up interviews, updating the CRM, instead of talking to people. And here's the important part: they'd *already* tried automation once, and it failed, because tools were dropped in without redesigning the work or bringing people along. So the real problem wasn't technology, it was trust and adoption. Anything I built had to be visibly recruiter-controlled, and better than their workaround on day one."

### Slide 3 · The approach (1:35-2:25)

"I focused on the three workflows draining the most time: job-ad drafting, interview summarisation, and hiring-manager updates. The principle running through all three: AI drafts, a recruiter decides, and it never screens, ranks or selects candidates. The AI removes the typing, not the judgement, and that line is what makes it safe to adopt in recruitment."

### Slide 4 · Pilot 1 (2:25-3:20)

"Quick example of the redesign, job ads. Today it's about 45 minutes: draft from scratch or rework an old ad, edit for tone, and check inclusivity if there's time. In the future state, the recruiter gives a structured intake, a configured Claude Project returns a firm-standard draft, and, this is the bit I like, an inclusive-language check runs automatically, flagging wording or unnecessary 'requirements' that would deter diverse applicants. So we turn a fairness *risk* into a fairness *feature*, and it's about 60% faster."

### Slide 5 · Live demo, the fairness guard (3:20-4:50)

"Now the one I really want to show you, because it's where recruitment AI usually goes wrong: interview summarisation. Here are a recruiter's rough notes. Notice this line, 'bit older, wasn't sure they'd fit our young team culture.' That's an age-based judgement that has no place in an assessment. Watch what the system does. It produces a structured summary of the *job-relevant evidence*, the migration they led, their communication, and it **drops the biased aside entirely**. It even flags that it excluded that remark, and why, and it makes no hire-or-reject decision. So the recruiter gets a faster, cleaner, *fairer* summary, and the candidate and the agency are both protected. That guardrail is the difference between recruitment AI that's an asset and recruitment AI that's a liability."

### Slide 6 · Results (4:50-5:45)

"On the numbers: all three workflows model at around 60% less time, comfortably past the brief's 40% admin target and its 50% candidate-summary-prep target. Across 24 recruiters that's roughly 1.7 hours each per week, about six times the engagement fee on the modelled assumptions. I'm honest about these: the percentages are the robust part, because they only depend on per-task time, which you can measure directly in the pilot. The dollar figure scales with volume, so I treat it as indicative, and it all sits in one editable tracker that becomes a real dashboard as the pilot produces actuals."

### Slide 7 · Governance & package (5:45-6:50)

"And the governance, which for recruitment I lead with, not bury: the AI never screens, ranks or decides on candidates; summaries are evidence-only with no protected attributes; candidate data stays in approved tools; a recruiter reviews and sends everything. That's not a compliance burden, it's something the agency can *show* clients and candidates as a competitive advantage. Everything you've seen, the prompt library, the Project configs, the templates, the SOPs, the benefits tracker, the Bullhorn recommendations, ships as a push-ready GitHub repo, and the rollout is deliberately pilot-led to earn back the trust their last automation lost. [*Alt-tab to the repo / case study.*] Happy to walk your team through adapting this. Thanks for watching."

---

## Optional 90-second cut

Slides 1, 5 (the fairness guard), 6 (results), 7 (close). The fairness-guard demo is the strongest 90 seconds in the whole piece, lead with it if time is tight.
