# Prompt, File note from meeting notes

**Purpose.** Convert rough client-meeting notes into a structured, compliant file note.
**When to use.** Straight after a client meeting. **Not** a substitute for the adviser's own record of any advice given.
**Inputs.** Rough notes (de-identified), meeting date, attendees.

---

## Prompt

```
Turn my rough notes from a client meeting into a structured BrightPath file
note. Use ONLY what's in my notes. If something important seems missing (e.g.
no next step recorded), flag it as [[CONFIRM: …]] rather than inventing it.

Meeting date: [DATE]   Attendees: [CLIENT], adviser
Rough notes:
<paste notes>

Produce:
- Summary of discussion (neutral, factual)
- Client circumstances / changes noted
- Any goals or concerns raised
- Decisions made in the meeting
- Actions (who / what / by when)
- Any advice-related matters flagged for follow-up (do NOT record these as
  advice given, flag for the adviser)

Plain English, concise, professional.
```

## Guardrails
- Records only what's in the notes; flags gaps as `[[CONFIRM: …]]`. Does not characterise anything as "advice given", flags for adviser.

## Quality checks
Firm-wide standard, plus: actions have owners and dates; nothing recorded as advice without adviser confirmation.

**Version:** 1.0
