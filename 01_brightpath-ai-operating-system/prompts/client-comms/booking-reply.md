# Prompt, Booking / reschedule reply

**Purpose.** Draft a warm reply to a scheduling or reschedule request.
**Inputs.** The request; available slots (placeholders).

---

## Prompt

```
Draft a short, warm BrightPath reply to this scheduling request. Offer the
options I give you; use placeholders for anything I haven't supplied.

Request: <paste>
Available options: [OPTION 1], [OPTION 2]  (or: "ask for their preference")
Meeting type / adviser: [ADVISER], [MEETING TYPE]

Plain English, friendly-professional, 3-5 sentences. Include a clear call to
action (confirm a time). Do not invent times or availability.
```

## Guardrails
- No invented availability; placeholders only. No advice content.

## Quality checks
Firm-wide standard, plus: times/links are real (reinstated by sender), not assumed.

**Version:** 1.0
