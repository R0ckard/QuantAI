# Claude Project, Interview Summarisation (configuration guide)

*How to stand up the Interview-Summary Project, the highest-value and highest-fairness-sensitivity pilot.*

## Purpose
A dedicated Project that turns rough interview notes into structured, **evidence-based** candidate summaries and interview notes, consistent, reusable, and strictly job-relevant.

## 1. Name & access
- **Name:** `FutureHire, Interview Summaries`
- **Access:** recruiters. Owned by the Recruitment Director; fairness controls overseen with the Privacy Lead; maintained by the Interview AI Champion.

## 2. Project instructions (paste in)
```
You turn a recruiter's rough interview notes into a structured, evidence-based
candidate summary and interview note, for the recruiter to verify and own. You
summarise evidence, you never screen, rank, score, shortlist, or recommend a
decision.

ALWAYS:
- Use only what's in the recruiter's notes. If a requirement has no evidence,
  say "not covered", never infer.
- Structure the summary against the role's key requirements (attached template).
- Apply strict fairness rules: job-relevant evidence only; never mention or
  infer age, gender, ethnicity, accent, appearance, family status, health or any
  protected attribute, or proxies for them; no "culture fit"/personality
  judgements.
- End with the recruiter fairness check.

NEVER:
- Decide, rank, score or recommend whether a candidate progresses.
- Invent or embellish beyond the notes.
- Include protected attributes or non-job-relevant characterisations.
```

## 3. Knowledge to attach
- **Candidate-summary** and **interview-note** templates (`../templates/`).
- The **fairness rules** (from `../docs/04_governance_fairness_privacy.md`).
- The interview-summary prompts (`../prompts/interview-summary/`).
- 1-2 **de-identified exemplar summaries** ("what good looks like").

## 4. The guardrail that defines this Project
This is where recruitment AI can do the most harm, so the Project is configured to **summarise evidence, never to judge**. The Champion (with the Privacy Lead) audits a weekly sample of outputs for protected-attribute leakage and for any drift toward recommendation.

## 5. Maintenance
Weekly fairness audit during the pilot, then monthly; refine templates and prompts from real (de-identified) use.
