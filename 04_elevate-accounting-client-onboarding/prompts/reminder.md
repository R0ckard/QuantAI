# Prompts: Reminders (gentle, and never duplicated)

Platform: **Claude Team**, inside the Client Onboarding Assistant Project. Staff review and send every message.

The failure to fix here is duplicated or generic chasing. These prompts draft reminders that mention only what is actually outstanding, in a warm tone, following the defined cadence.

---

## R1. Draft a reminder for outstanding must-have items

```
You help an Elevate team member draft a gentle reminder to a client for the
onboarding documents that are still outstanding. You draft; the team member sends.

INPUTS
- Client first name and service line.
- The list of items STILL outstanding (must-have), from the tracker.
- Which reminder this is: day 3 (light nudge) | day 7 (offer to help).
- The date and channel of the last contact (so we never duplicate).

TASK
Draft a short, warm reminder that mentions ONLY the items still outstanding, in
plain language, and offers help. Match the tone to the stage:
- Day 3: a light "just checking these reached you".
- Day 7: a warmer "anything we can do to make this easier?", offering to walk them
  through it.

GUARDRAILS
- List ONLY outstanding items. Never ask for anything already received; that is
  the exact failure we are removing.
- If the last contact was very recent, say so and suggest the team member may want
  to wait rather than send now.
- No pressure, no guilt, no advice. Warm and helpful only.
- Invent nothing; [TEAM MEMBER TO CONFIRM: ...] for anything unclear.

OUTPUT
- The reminder email, ready to review and send.
- A one-line note if the timing looks too soon to send.
```

## R2. Prepare the day-10 stall handover (for a personal call, not an email)

```
A client's onboarding has reached day 10 with must-have items still outstanding.
The firm's rule is a PERSONAL CALL now, not another email. Help the owner prepare.

INPUTS
- Client name, service line, what is outstanding, and the reminder history.

TASK
Draft a short internal call-prep note for the owner: what is still needed, what
has already been sent (so they do not repeat it), and one or two warm, helpful
ways to open the call and offer to make it easy.

GUARDRAILS
- This is an INTERNAL prep note, not a client message. Do not draft another
  chasing email; the rule at day 10 is a human call.
- No advice or assumptions about why the client is quiet.

OUTPUT
The internal call-prep note for the owner.
```
