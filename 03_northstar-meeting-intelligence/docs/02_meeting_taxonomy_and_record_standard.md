# Meeting Taxonomy and Minimum Record Standard

*NorthStar Consulting. Five meeting types, and what a good record contains for each.*

The firm's minutes vary because there is no agreed standard for what a meeting record should contain. This document fixes that. It defines **five meeting types** (the taxonomy) and, for each, a **minimum record standard**: the fields that must be captured for the record to be useful and accountable. The assistant produces to this standard, and the registers and dashboards are built from it, so a record is consistent whoever ran the meeting.

## The five meeting types

Every NorthStar meeting maps to one of five types. The type sets the minimum record standard and the confidentiality handling.

| # | Meeting type | Typical purpose | Confidentiality |
|---|---|---|---|
| 1 | **Client delivery / project** | Progress, decisions and actions on a client engagement | Client-confidential (highest care) |
| 2 | **Leadership / decision** | Executive decisions, direction, approvals | Commercially sensitive |
| 3 | **Internal team / status** | Team updates, coordination, internal actions | Internal |
| 4 | **Sales / pursuit** | Business development, proposals, pipeline | Commercially sensitive |
| 5 | **Governance / risk / PMO** | Portfolio, risk, assurance, compliance | Internal, sometimes client-confidential |

Five is deliberately few. The point is that any meeting owner can classify their meeting in seconds, and the record standard follows automatically.

## The minimum record standard

Every record, regardless of type, must contain the **core five**:

1. **Meeting metadata:** type, date, owner, attendees (or count), and the source transcript reference.
2. **Summary:** a short, plain-language account of what the meeting covered.
3. **Decisions:** each decision made, stated clearly, with the rationale where given.
4. **Risks and issues:** each risk or issue raised, with a severity and an owner where stated.
5. **Actions:** each action, and this is the accountability core, with a **named owner** and a **due date**. If either is missing from the transcript, the record flags it for the reviewer rather than guessing.

On top of the core five, each type adds a small number of type-specific fields.

| Type | Adds to the core five |
|---|---|
| Client delivery / project | Client and engagement reference; client-facing vs internal split; anything requiring client sign-off |
| Leadership / decision | Decision authority (who approved); any decision needing wider communication |
| Internal team / status | Carried-forward actions from the last team meeting (explicitly reviewed) |
| Sales / pursuit | Opportunity reference; next step and owner; commercial sensitivity flag |
| Governance / risk / PMO | Risk register links; escalations; assurance or compliance items |

The core five are what make the record useful and accountable. The type-specific fields are what make it fit the meeting. Nothing more is required, because a standard nobody can meet is not a standard.

## The rule that carries the whole system: every action is owned and dated

The single most important field is the **action with an owner and a due date**. It is the difference between a record that drives work and a record that gets filed and forgotten. So it has its own rule, applied everywhere:

> Every action has a named owner and a due date, or it is flagged for the reviewer. The assistant never invents an owner or a date. "The team will follow up" is not an action; "Priya to send the revised scope by Friday 8 August" is.

This rule is why the brief's "90% of actions have an owner and due date" target is achievable: the standard requires it, the assistant enforces it by flagging gaps, and the reviewer resolves the flags before publishing.

## Why a taxonomy, not just a template

A single template would still leave people guessing what belongs in a client meeting versus an internal stand-up, and would over-ask on simple meetings. Five types with a shared core and a few type-specific fields gives consistency where it matters (the core five, every time) and fit where it helps (the type-specific bits), while keeping classification a two-second decision. It is also what lets the registers and dashboards aggregate cleanly: because every record shares the core five, actions, decisions and risks from a client meeting and an internal stand-up land in the same registers and roll up to the same manager view.

## How this connects to the rest of the build

The assistant's prompts (`prompts/`) produce to this standard. The **standard minutes template** (`templates/`) is the core five plus the type-specific fields. The **registers** (`docs/05_...`) are built from the decisions, risks and actions. The **dashboards** (`docs/06_...` and `dashboard/`) roll up the actions by team and status. One standard, applied to every meeting, is what turns 120 meetings a week into one searchable, accountable memory.
