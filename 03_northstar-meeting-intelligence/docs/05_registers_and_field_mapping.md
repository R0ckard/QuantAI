# Registers, Field Mapping and Carry-Forward Rules

*NorthStar Consulting. Where actions, decisions and risks live after a meeting, and the rules that keep them alive.*

A record is only useful if its actions, decisions and risks flow into places that are tracked and visible. This document defines the three registers, maps them onto the firm's existing Microsoft tools (Planner and Lists), and sets the update and carry-forward rules that stop open work from quietly dying, which is NorthStar's core failure.

## The three registers

Every published record feeds three registers. Because every record shares the core five (see the record standard), these registers aggregate cleanly across all 120 meetings a week.

### Action register (the important one)

Held in **Microsoft Planner and Lists**. One row per action.

| Field | Source | Notes |
|---|---|---|
| Action | Record | Specific, outcome-focused |
| Owner | Record | A named person. Never blank; if unknown it is [OWNER TO CONFIRM] and resolved at review |
| Due date | Record | A real date. Never blank; resolved at review |
| Status | Tracked | Open / In progress / Done / Overdue / Carried forward |
| Team | Meeting | For the by-team manager view |
| Source meeting | Record | Type, date, link to the minutes |
| Carried forward from | Carry-forward rule | Set when an action rolls into a later meeting |

### Decision register

Held in **Microsoft Lists**. One row per decision: the decision, the date, the meeting, the authority (who approved), and a link to the minutes. This is the searchable "what did we decide, and why" memory.

### Risk and issue register

Held in **Microsoft Lists** (linked to any existing risk register). One row per risk: the risk, severity, owner, the meeting it was raised in, and status. Governance and PMO meetings link their risks here.

## Field mapping (Planner / Lists)

The mapping is defined so publishing is consistent and, in a live build, largely automatic. Illustrative mapping for the action register:

| Record field | Planner field | Lists column |
|---|---|---|
| Action | Task title | Title |
| Owner | Assigned to | Owner (person) |
| Due date | Due date | Due (date) |
| Status | Bucket / progress | Status (choice) |
| Team | Plan / label | Team (choice) |
| Source meeting | Task note / link | Source (link) |
| Carried forward from | Task note | CarriedFrom (text) |

Decisions and risks map to Lists columns in the same explicit way (Title, Date, Meeting, Authority/Severity, Owner, Link). The point of writing the mapping down is that any reviewer or administrator publishes to the same fields every time, so the registers stay clean enough to report from.

## Update rules

- **On publish:** new actions, decisions and risks are written to their registers with status Open.
- **On completion:** the owner marks an action Done; the register and the dashboard update.
- **On due date passing:** an open action automatically becomes Overdue (a computed status, not a manual one), so overdue work cannot hide.
- **Ownership is never blank:** an action with [OWNER TO CONFIRM] cannot be published; it is resolved at review. This is enforced, not hoped for.

## Carry-forward rules (the mechanism that fixes the core problem)

NorthStar's worst failure is that incomplete actions do not make it into the next meeting. The carry-forward rule fixes it explicitly:

1. **Before a recurring meeting,** the open and overdue actions from the previous record are surfaced (the assistant's carry-forward check, prompt A3, does this from the transcript and the previous record).
2. **Any action still open** is either completed, updated with a new due date, or **carried forward**: it stays in the register, its "Carried forward from" is stamped, and it appears in the next meeting's record.
3. **The dashboard counts carry-forwards,** so an action that has been carried forward two or three times is visible as a stuck item, not an invisible one. Repeated carry-forward is a signal, not a hiding place.

This is what turns a set of minutes into accountability: an open action cannot silently disappear, because the rule forces it forward and the dashboard makes repeated slippage obvious.

## Why this matters more than the summary

A good summary is nice; an owned, dated, tracked, carried-forward action is what actually changes behaviour. The registers and these rules are the difference between "we have minutes" and "we have organisational memory and accountability." The dashboard (`06_...` and `dashboard/`) is simply the window onto these registers, and the reason managers will finally be able to see open, overdue and carried-forward work across every team.
