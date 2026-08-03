# Prompt, Inclusive-language check

**Purpose.** Review any job ad (AI- or human-written) for language that could deter or exclude, and suggest neutral alternatives.
**When to use.** Before any ad is posted.
**Inputs.** The ad text.

---

## Prompt

```
Review this job ad for inclusive language. For each issue, quote the phrase,
say why it may deter or exclude applicants, and suggest a neutral rewrite.
Check for:
- gendered wording ("he", "salesman", coded terms like "aggressive")
- ageist signals ("young", "digital native", "recent graduate" when not required)
- ableist wording or unnecessary physical requirements
- culturally exclusionary phrasing or idioms
- "requirements" that aren't truly essential and narrow the pool
- degree/years-of-experience gates that could be outcomes-based instead

Return a short table: Phrase | Issue | Suggested rewrite. If the ad is clean,
say so. Do not rewrite the whole ad unless asked, flag and suggest.
```

## Guardrails
- Flags and suggests; the recruiter decides. Does not add requirements.

## Quality & fairness checks
Firm-wide checks. This prompt *is* a fairness control, its output feeds the recruiter's review.

**Version:** 1.0
