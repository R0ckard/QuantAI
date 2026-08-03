# Prompt, Structured candidate summary

**Purpose.** Turn rough interview notes into a structured, **evidence-based** candidate summary against the role's requirements.
**When to use.** After an interview, from the recruiter's notes. **Not** to decide or recommend whether the candidate progresses.
**Inputs (de-identify where practical).** Role requirements, rough interview notes.

---

## Prompt

```
Summarise this interview into FutureHire's structured candidate summary, for
a recruiter to verify and own. You summarise evidence, you do NOT decide,
rank, score or recommend whether the candidate should progress.

INPUTS
- Role & key requirements: <list>
- My rough interview notes: <paste, de-identified where practical>

PRODUCE, using ONLY what's in my notes:
1. Summary (2-3 sentences, factual)
2. Evidence against each key requirement (what the candidate demonstrated,
   quote/paraphrase from the notes; if there's no evidence for a requirement,
   say "not covered", don't infer)
3. Strengths shown (evidence-based)
4. Areas to explore further (gaps or things to probe next round)
5. Practical matters noted (notice period, location, salary expectation, only
   if in my notes)

STRICT FAIRNESS RULES:
- Use ONLY job-relevant evidence from my notes.
- Do NOT mention or infer age, gender, ethnicity, accent, appearance, family
  status, health, or any protected attribute, or proxies for them.
- Do NOT make "culture fit" or personality judgements.
- Do NOT invent or embellish. If my notes don't say it, it isn't in the summary.

END with a recruiter check: reflects the interview? · evidence-only? · no
protected attributes? · decision remains mine?
```

## Guardrails
- Evidence-only, job-relevant; omits protected attributes and proxies; no scoring/ranking/recommendation; no invention.

## Quality & fairness checks
Firm-wide checks, plus: every requirement is backed by evidence or marked "not covered"; zero protected-attribute content; the summary informs the recruiter's decision but does not make it.

**Version:** 1.0
