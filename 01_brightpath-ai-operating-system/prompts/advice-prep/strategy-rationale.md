# Prompt, Strategy rationale paragraph

**Purpose.** Turn an adviser's bullet-point reasoning into a plain-English "why this is in your interest" paragraph for an advice document.
**When to use.** When the strategy is decided and needs client-ready prose. **Not** for generating the strategy itself.
**Inputs.** The recommendation, the client goal(s) it serves, and the adviser's key reasons (placeholders for specifics).

---

## Prompt

```
Write a plain-English rationale paragraph for a BrightPath advice document,
explaining why the recommendation below is in the client's interest. Use ONLY
my reasons, do not add benefits, figures or claims I haven't given you.

Recommendation: <e.g. consolidate super into [FUND]>
Client goal(s) it serves: [GOAL]
Adviser's reasons: <bullets>
Trade-offs / things to consider: <bullets>

Requirements:
- Link the recommendation explicitly to the client's stated goal(s).
- Include the trade-offs honestly (no one-sided selling).
- Warm, clear, professional; explain any technical term.
- 1-2 short paragraphs. No guarantees or performance promises.
```

## Guardrails
- Adds no benefits or figures beyond the adviser's inputs. States trade-offs. No performance guarantees.

## Quality checks
Firm-wide standard, plus: the paragraph must connect recommendation → client goal (best-interests linkage) and must not overstate.

**Version:** 1.0
