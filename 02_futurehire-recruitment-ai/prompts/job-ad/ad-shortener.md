# Prompt, Ad shortener (channel fit)

**Purpose.** Cut a full job ad down to a channel-appropriate length (LinkedIn/Seek snippet, or a short social post) without losing the essentials or the inclusive framing.
**Inputs.** The full ad; target channel/length.

---

## Prompt

```
Shorten this job ad for [CHANNEL] to about [LENGTH] words. Keep: the hook,
the 3-4 most important "what you'll do" points, the must-haves (tight), the
package range, and a clear apply step. Preserve inclusive, non-discriminatory
language. Do not add new facts. Return the shortened version only.
```

## Guardrails
- No new facts; preserves inclusive language; keeps the apply step and salary range.

## Quality & fairness checks
Firm-wide checks; confirm the shortened version didn't drop the salary range or reintroduce exclusionary phrasing.

**Version:** 1.0
