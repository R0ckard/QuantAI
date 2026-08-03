# Prompt, Job ad: first draft

**Purpose.** Produce a consistent, on-brand, inclusive job-ad draft from a short intake.
**When to use.** After a role intake. **Not** for inventing role facts or salary.
**Inputs (placeholders for specifics).** Role, must-haves, nice-to-haves, team/context, package range, location/work model, standout selling points.

---

## Prompt

```
Draft a job advertisement for FutureHire in the firm's voice. Use ONLY the
details I provide, do NOT invent responsibilities, requirements, salary or
benefits. Mark anything missing as [[CONFIRM: …]].

INPUTS
- Role: [ROLE]           - Location / work model: [LOCATION]
- Must-haves: <list>     - Nice-to-haves: <list>
- Team & context: <...>  - Package: [SALARY range]
- Why it's a great role: <selling points>

PRODUCE:
1. Punchy title
2. Short hook (why this role, why now)
3. About the team / company (from my inputs)
4. What you'll do (clear, specific)
5. What you'll bring (must-haves; keep the list tight, every extra
   "requirement" narrows the pool)
6. What's in it for you (package range + genuine benefits)
7. How to apply (inclusive, clear next step)

INCLUSIVE-LANGUAGE PASS: flag any gendered, ageist, ableist or culturally
exclusionary wording, and any "requirement" likely to deter strong diverse
applicants unnecessarily. Suggest a neutral alternative for each.

STYLE: FutureHire voice, professional, warm, human, concrete. No clichés
("rockstar", "ninja"), no hype, no discriminatory phrasing.

END with a short recruiter checklist: facts verified · inclusive-language
flags resolved · salary range confirmed · brand voice.
```

## Guardrails
- Uses only supplied facts; flags gaps. Runs an inclusive-language pass every time. No discriminatory or exclusionary phrasing.

## Quality & fairness checks
Firm-wide checks, plus: requirement list is as short as the role genuinely needs; inclusive-language flags resolved before posting.

**Version:** 1.0
