# Prompts: Actions, Decisions, Risks, and Carry-Forward

Platform: **Claude Team**, inside the Meeting Intelligence Assistant Project. A reviewer approves before anything is published.

These focused prompts are for when a reviewer wants just the accountability parts, or to run the carry-forward check on a recurring meeting.

---

## A1. Extract actions with owners and due dates

```
From the transcript below (NorthStar Consulting meeting), extract ONLY the
actions. For each action produce: the action (specific and outcome-focused), the
NAMED OWNER, and the DUE DATE.

GUARDRAILS
- Never invent an owner or a due date. If not clearly stated, write
  [OWNER TO CONFIRM] or [DUE DATE TO CONFIRM].
- A vague intention ("we should look into this") is not an action unless the
  transcript makes it specific and assigned. If it is genuinely an action but
  unassigned, capture it and flag the owner.
- Do not judge whether an action matters; capture what was agreed.

OUTPUT
A table: Action | Owner | Due date | Flag (if any). End with the count of actions
and how many are fully owner-and-date complete versus flagged, so the reviewer can
see the completeness at a glance.

TRANSCRIPT:
[paste]
```

## A2. Extract decisions and risks

```
From the transcript below, extract the DECISIONS and the RISKS/ISSUES separately.

Decisions: each decision stated clearly, with the rationale where given, and who
had the authority to make it if stated.
Risks/issues: each risk or issue raised, with a severity (high/medium/low) where
the transcript supports one, and an owner where stated.

GUARDRAILS
- Extract only what is in the transcript. Do not invent a decision or a risk, and
  do not infer a severity the transcript does not support (mark it [SEVERITY TO
  CONFIRM]).
- Do not judge whether a decision was right or a risk acceptable; that is the
  reviewer's and management's call.

OUTPUT
Two short tables (Decisions; Risks/issues), ready for the registers.

TRANSCRIPT:
[paste]
```

## A3. Carry-forward check on a recurring meeting

```
You are helping a reviewer make sure nothing falls through the cracks between
meetings. Compare the OPEN actions from the previous record to this meeting's
transcript.

INPUTS
- The previous record's open actions (with owners and due dates).
- This meeting's transcript.

TASK
For each previously open action, say whether this meeting: completed it, updated
it (new due date or note), or did not mention it. List the "not mentioned, still
open" actions clearly, because those are the ones that quietly die.

GUARDRAILS
- Report only what the transcript supports. Do not assume an action is done
  because it was not discussed; "not mentioned" means still open.

OUTPUT
Three short lists: completed, updated, and still-open-not-mentioned (to carry
forward). The reviewer decides what to carry into the next meeting.
```
