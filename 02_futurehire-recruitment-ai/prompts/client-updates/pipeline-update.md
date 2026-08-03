# Prompt, Hiring-manager pipeline update

**Purpose.** Draft a clear, professional hiring-manager update from a pipeline snapshot.
**When to use.** Regular client updates. **Not** for sharing candidate detail a candidate hasn't consented to share.
**Inputs (de-identify as needed).** Roles, candidates by stage, next steps, any blockers.

---

## Prompt

```
Draft a hiring-manager update for FutureHire, for the recruiter to verify and
send. Format only what I give you, do NOT invent status, numbers or names.

INPUTS
- Client / hiring manager: [HIRING MANAGER]
- For each role: [ROLE], candidates at each [STAGE] (numbers or de-identified
  references), next steps, any blockers.

PRODUCE:
- A warm, brief opener
- A per-role summary: where things stand, what's next, and any decision or
  input you need from them
- A clear close with the next update timing

CONFIDENTIALITY: refer to candidates by stage/count or non-identifying
reference unless I've told you a candidate has consented to be named to the
client. Never share sensitive candidate detail.

Professional, concise, in FutureHire's voice.
```

## Guardrails
- Formats supplied status only; candidate confidentiality by default; no invented status; recruiter sends.

## Quality & fairness checks
Firm-wide checks, plus: no candidate identified/shared without consent; status accurate; clear next steps.

**Version:** 1.0
