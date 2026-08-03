# Loom Walkthrough, Narration Script (Dave's voice)

*~6-8 minutes. Open `walkthrough/demo.html` full-screen and advance with → / Next as you speak. Written in Dave's spoken voice (profile v0.2). Say it, don't read it.*

**Setup:** full-screen the demo; have `case-study/index.html`, `diagrams/workflow-diagrams.html` and the GitHub repo ready to alt-tab to at the end.

---

### Slide 1 · Title (0:00-0:35)

"Hi, I'm Dave from QuantAI. So this is a quick walkthrough of an AI transformation that I built for a tech-recruitment agency. Fair warning first: it's a demo, built on a representative scenario rather than real client work, so the numbers are modelled. What I want to show you is the method, the working assets, and how I handle the fairness side, which in recruitment is basically everything."

### Slide 2 · The problem (0:35-1:35)

"So here's the thing about FutureHire. It's a Sydney agency where the recruiters were drowning in admin, drafting ads, writing up interviews, updating the CRM, instead of actually talking to people. And here's the important bit: they'd already tried automation once, and it failed, because the tools got dropped in without redesigning the work or bringing anyone along. So the real problem wasn't technology as such, it was trust and adoption. Anything I built had to be visibly recruiter-controlled, and better than their workaround on day one."

### Slide 3 · The approach (1:35-2:25)

"So I focused on the three workflows draining the most time: job-ad drafting, interview summarisation, and hiring-manager updates. And the principle running through all three: AI drafts, a recruiter decides, and it never screens, ranks or selects candidates. It takes away the typing, not the judgement, and that's the line that makes it safe to adopt in recruitment."

### Slide 4 · Pilot 1, job ads (2:25-3:20)

"Quick example of the redesign, job ads. Today it's about 45 minutes: draft from scratch or rework an old ad, edit for tone, and check inclusivity if there's time. In the future state, the recruiter gives a structured intake, a configured Claude Project gives back a firm-standard draft, and, this is the bit I like, an inclusive-language check runs automatically, flagging wording or unnecessary 'requirements' that'd put diverse applicants off. So we turn a fairness risk into a fairness feature, and it's about 60% faster."

### Slide 5 · Live demo, the fairness guard (3:20-4:50)

"Right, now the one I really want to show you, because this is where recruitment AI usually goes wrong: interview summarisation. So here are a recruiter's rough notes. Notice this line, 'bit older, wasn't sure they'd fit our young team culture.' That's an age-based judgement, and it's got no place in an assessment. Watch what it does. It produces a structured summary of the job-relevant evidence, the migration they led, their communication, and it drops the biased aside entirely. It even flags that it's excluded that remark, and why, and it makes no hire-or-reject call. So the recruiter gets a faster, cleaner, fairer summary, and the candidate and the agency are both protected. And that guardrail, right, that's the difference between recruitment AI that's an asset and recruitment AI that's a liability."

### Slide 6 · Results (4:50-5:45)

"So, on the numbers. All three workflows model at around 60% less time, comfortably past the brief's 40% admin target and its 50% candidate-summary-prep target. Tick, tick, tick. Across 24 recruiters that's roughly 1.7 hours each per week, about six times the engagement fee on the modelled assumptions. I'll be straight with you: the percentages are the robust part, because they only depend on per-task time, which you can measure directly in the pilot. The dollar figure scales with volume, so I treat it as indicative. And it all sits in one editable tracker that turns into a real dashboard as the pilot produces the actuals."

### Slide 7 · Governance and package (5:45-6:50)

"And the governance, which for recruitment I lead with rather than bury: the AI never screens, ranks or decides on candidates; summaries are evidence-only with no protected attributes; candidate data stays in approved tools; a recruiter reviews and sends everything. And that's not a compliance burden, right, it's something the agency can actually show clients and candidates as a competitive advantage. Everything you've seen, the prompt library, the Project configs, the templates, the SOPs, the benefits tracker, the Bullhorn recommendations, it all ships as a GitHub repo. Doesn't matter if you don't know what GitHub is. And the rollout's deliberately pilot-led, to earn back the trust their last automation lost. Happy to walk your team through adapting it. Thanks for watching."

---

## Quick 90-second cut

Slides 1, 5 (the fairness guard), 6 (results), 7 (close). The fairness-guard demo is the strongest 90 seconds, lead with it if time's tight.
