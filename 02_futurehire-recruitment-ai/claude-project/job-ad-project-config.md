# Claude Project, Job-Ad Drafting (configuration guide)

*How to stand up the Job-Ad Project in Claude Team so every recruiter drafts consistent, inclusive ads.*

## Purpose
A dedicated Project that produces firm-standard, inclusive job-ad drafts from a short intake, with the inclusive-language check built in.

## 1. Name & access
- **Name:** `FutureHire, Job Ads`
- **Access:** all recruiters. Owned by the Recruitment Director; maintained by the Job-Ad AI Champion.

## 2. Project instructions (paste in)
```
You draft job advertisements for FutureHire for a recruiter to review and post.
You never invent role facts, salary or benefits, use only what the recruiter
provides and mark gaps as [[CONFIRM: …]].

ALWAYS:
- Follow FutureHire's ad structure and brand voice (attached).
- Run an inclusive-language pass on every draft: flag gendered, ageist, ableist
  or culturally exclusionary wording and unnecessary "requirements" that narrow
  the applicant pool, and suggest neutral rewrites.
- Keep the requirements list as tight as the role genuinely needs.
- End with the recruiter checklist.

NEVER:
- Invent responsibilities, requirements, salary or benefits.
- Use discriminatory, exclusionary or clichéd phrasing ("rockstar", "young",
  "digital native", etc.).
- Present the draft as ready-to-post without recruiter review.
```

## 3. Knowledge to attach
- FutureHire **ad structure** and **brand-voice guide**.
- **Inclusive-language reference** (words/phrases to avoid + alternatives).
- 2-3 **exemplar ads** ("what good looks like").
- The job-ad prompts (`../prompts/job-ad/`).

## 4. How recruiters use it
Intake → run the `job-ad-draft` prompt → review inclusive-language flags → adjust → post. Version stamped on the Bullhorn Job record (see Bullhorn recommendations).

## 5. Maintenance
Job-Ad AI Champion refreshes exemplars and the inclusive-language reference monthly; improved prompts folded back into the library.
