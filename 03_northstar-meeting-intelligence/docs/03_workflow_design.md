# Workflow Design: Transcript to Follow-Up

*NorthStar Consulting. The five stages that turn a transcript into a reliable, owned, published record, with a human in control.*

This is the end-to-end workflow the whole system runs on: how a transcript becomes a structured record, gets reviewed by a human, is published to the right place, and drives follow-up that carries forward. It is deliberately the same five stages for every meeting type; only the record standard and confidentiality handling vary.

## The five stages

```
  1. INTAKE        Transcript captured (Teams / Otter.ai) + meeting type set
        |          Owner: meeting owner · in approved tools only
        v
  2. PROCESS       Assistant drafts the record to the standard
        |          Summary · decisions · risks · actions (owner + due) · confidentiality flags
        v
  3. REVIEW        A nominated reviewer checks and corrects (the gate)
        |          Resolves any [OWNER TO CONFIRM] / [DUE DATE TO CONFIRM] flags · nothing auto-publishes
        v
  4. PUBLISH       Approved record published + registers updated
        |          Minutes to SharePoint · actions to Planner/Lists · decisions & risks to registers
        v
  5. FOLLOW-UP     Actions tracked, carried forward, escalated
                   Open/overdue visible to managers · unfinished actions carried into the next meeting
```

## Stage by stage

**1. Intake.** The transcript comes from the firm's existing capture (Teams meetings, Otter.ai) and stays in approved tools. The meeting owner sets the meeting type (one of the five), which determines the record standard and the confidentiality handling. No transcript of a client-confidential meeting is moved into an unapproved tool.

**2. Process.** The Meeting Intelligence Assistant reads the transcript and drafts the record to the minimum standard for that type: a summary, the decisions, the risks, and the actions each with an owner and a due date. Where the transcript does not name an owner or a date, the assistant inserts a clear flag rather than guessing. It also flags any content that needs confidentiality handling. This is the "within five minutes of transcript" step.

**3. Review (the gate).** A nominated reviewer, usually the meeting owner, checks the draft: is the summary accurate, are the decisions right, does every action have the correct owner and due date, and are the flags resolved. This is where the "90% usable with minor or no edits" target lives, and it is mandatory. Nothing is auto-published (a stated exclusion of the brief); a human always approves.

**4. Publish.** The approved record is published to the right places in the existing stack: the minutes to SharePoint (searchable memory), the actions to Planner and Lists (the action register), and the decisions and risks to their registers. The field mapping is defined in `05_registers_and_field_mapping.md` so this is consistent and, in a live build, largely automatic.

**5. Follow-up.** Actions are now live and tracked. Open and overdue actions are visible to managers by team on the dashboard. Unfinished actions are carried forward into the next relevant meeting, so nothing quietly dies. This closing loop, carry-forward and manager visibility, is what turns a set of minutes into organisational accountability.

## Where the human is always in control

Two stages are human by design and never automated:

- **Review (stage 3):** a person checks and approves every record before it is published. The assistant drafts; the reviewer decides.
- **Ownership (stage 5):** the owner and due date on every action are human-confirmed, never invented by the AI.

Everything else (drafting, formatting, publishing to the right place, rolling up to a dashboard) can be assisted or automated, because it does not carry a judgement. That split, automate the admin, keep the judgement human, is the design principle applied to the workflow.

## What changes by meeting type

The five stages do not change. What changes is small and defined:

- **The record standard** (the type-specific fields from `02_...`).
- **The confidentiality handling** (client-confidential meetings get the strictest protocol, see `07_...`).
- **Where it publishes** (a client-delivery record may publish to the engagement's SharePoint area; an internal stand-up to the team's).

One workflow, five stages, applied to every meeting, with the record standard and confidentiality varying by type. That consistency is what makes the system work at 120 meetings a week.
