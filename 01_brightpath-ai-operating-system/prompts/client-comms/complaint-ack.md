# Prompt, Complaint / sensitive acknowledgement (escalate)

**Purpose.** Draft a calm, empathetic acknowledgement of a complaint or sensitive/distressed message and route it to the right person. **Never resolves the matter autonomously.**
**When to use.** Complaints, distress, vulnerability, or legal-tinged messages.
**Inputs.** The message (redact identifiers); who it escalates to.

---

## Prompt

```
A client has sent a complaint or sensitive message. Draft ONLY a brief,
empathetic acknowledgement for a human to review and send. Do NOT attempt to
resolve, admit or deny anything, or give advice.

Message: <paste, redact identifiers>
Escalate to: [NAME/ROLE]

The acknowledgement should:
- Thank them for raising it and acknowledge their concern with genuine empathy.
- Say the right person ([NAME/ROLE]) will personally look into it and respond
  by [TIMEFRAME].
- Avoid admissions, blame, promises of outcome, or advice.
- Be warm, calm, human, and short.

Also output an internal one-line note: "ESCALATE, complaint/sensitive,
route to [NAME/ROLE], priority."
```

## Guardrails
- No resolution, admission, denial, blame, or advice. Acknowledge + escalate only. Always routed to a named human.

## Quality checks
Firm-wide standard, plus: contains no admission/outcome promise; escalation routing present; empathetic tone verified by sender.

**Version:** 1.0
