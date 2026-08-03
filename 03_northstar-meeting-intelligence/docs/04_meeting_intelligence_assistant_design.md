# The Meeting Intelligence Assistant, Design

*NorthStar Consulting. The prototype that turns a transcript into a structured, owned record, without ever inventing an owner or publishing on its own.*

## What it is

The Meeting Intelligence Assistant is a configured Claude Team assistant (a Claude Project) that reads a meeting transcript and drafts a record to the firm's minimum standard: a summary, the decisions, the risks, and the actions, each action with an owner and a due date. It knows the five meeting types and the record standard, so what it produces is consistent whoever ran the meeting. A nominated reviewer approves every record before it is published.

It is not an auto-publisher and it is not a note-taker that fires minutes into inboxes. It is a drafting and structuring aid that does the two-hour write-up in minutes and leaves the judgement, and the publish button, with a human.

## The design principle

> The assistant drafts the record. A human reviews and approves before anything is published. Every action gets a named owner and a due date, or it is flagged, never guessed.

## What it does, and does not do

**It drafts and structures:**

- a plain-language summary of the meeting;
- the decisions, stated clearly, with rationale where the transcript gives it;
- the risks and issues, with severity and owner where stated;
- the actions, each with an owner and a due date drawn from the transcript;
- a confidentiality flag on anything that needs careful handling;
- carried-forward context when given the previous record.

**It never:**

- publishes anything on its own (a reviewer always approves first);
- invents an owner or a due date. If the transcript does not name one, it writes [OWNER TO CONFIRM] or [DUE DATE TO CONFIRM];
- invents a decision, a risk, or an action that was not in the transcript;
- makes a management judgement (whether an action matters, who should really own it, whether a risk is acceptable), that is the reviewer's call;
- moves client-confidential content outside approved tools.

These limits are written into the assistant's instructions and repeated in the prompts, because the value of the record depends entirely on it being trustworthy: a made-up owner or an auto-published error would do more damage than the manual process it replaces.

## Why "never invent an owner" is the heart of it

The firm's core failure is actions without owners and due dates. It would be easy for an assistant to paper over that by guessing ("assign it to whoever spoke last"), and that would quietly reintroduce the exact problem: unaccountable actions that look accountable. So the assistant does the opposite. When the transcript does not clearly assign an action, it surfaces the gap as a flag for the reviewer to fill. That is what makes the "90% of actions have an owner and due date" target real rather than cosmetic: the standard requires it, the assistant enforces it by refusing to guess, and the human resolves it.

## Where it runs and how data is handled

- Runs in **Claude Team** (already in NorthStar's stack). Transcripts and records stay in approved tools.
- Works from transcripts the firm already captures (Teams, Otter.ai). For the prototype, de-identified, non-production transcripts are used unless access is explicitly granted.
- Client-confidential transcripts are handled under the confidentiality protocol (`07_...`): approved tools only, least exposure, and a confidentiality flag on the record so downstream handling is deliberate.
- Consistent with the Privacy Act 1988 for any personal information in a transcript.

## How it fits the workflow

1. The meeting owner provides the transcript and sets the meeting type (intake).
2. They run the **record prompt**; the assistant drafts the full record to the standard for that type, flagging any missing owners or dates and any confidentiality concerns (process).
3. The reviewer checks and corrects, resolving the flags (review, the gate).
4. The approved record is published, and its actions, decisions and risks flow to the registers (publish).
5. Open and overdue actions are tracked and carried forward (follow-up).

Every step: assistant drafts, human approves, and no action goes out unowned. The prompts and their guardrails are in `prompts/`, and the setup is in `claude-project/`.
