# Prompt, Document request reply

**Purpose.** Respond to a client requesting a document, or acknowledge documents they've sent.
**Inputs.** The request; what can be provided and how (placeholders); any secure-handling requirement.

---

## Prompt

```
Draft a BrightPath reply to this document request/submission. A human verifies
and sends.

Message: <paste>
What we can provide / next step: [DOCUMENT], [HOW/CHANNEL], [TIMEFRAME]
Secure handling note: <e.g. "send via secure portal, not email">

Requirements:
- Warm, plain English, concise.
- If sensitive documents are involved, state the secure channel, never invite
  clients to email personal/financial documents insecurely.
- Use placeholders for specifics; do not invent timeframes.
```

## Guardrails
- Reinforces secure handling of personal/financial documents. No invented timeframes. No advice.

## Quality checks
Firm-wide standard, plus: correct secure channel stated for sensitive documents; privacy respected.

**Version:** 1.0
