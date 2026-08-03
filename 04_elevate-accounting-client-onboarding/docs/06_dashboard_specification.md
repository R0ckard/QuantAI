# Onboarding Tracker and Dashboard Specification

*Elevate Accounting. What the tracker shows, how status is decided, and what a live build would connect to.*

The working prototype is in `tracker/index.html`. This document is the specification behind it: the fields, the status logic, the views, and the path from prototype to a live tool that reads the firm's existing systems. It is deliberately simple, because a tracker nobody updates is worse than useless. The design goal is one shared view that is easy to keep current and instantly answers "where is every onboarding, and what needs me."

## What the tracker replaces

Separate spreadsheets and checklists in individual inboxes. One shared view instead, so staff and partners see the same picture, and no two people chase the same client.

## The record: one row per onboarding

| Field | What it holds | Source in a live build |
|---|---|---|
| Client / entity | Name and entity | HubSpot / Xero Practice Manager |
| Service line | Business advisory, tax compliance, bookkeeping | Xero PM |
| Owner | The client owner (a person, always) | Xero PM / HubSpot |
| Stage | Welcome, Scope, Request, Collect, Set up, First meeting | Tracker (updated by staff, assisted by prompt B3) |
| Checklist | The service-line items, each have / outstanding / not applicable | Tracker, from the matrix (doc 04) |
| Must-have completeness | Have / total, as a percentage | Computed from the checklist |
| Reminder history | What was sent and when | Tracker (assistant drafts, staff send) |
| Next action + days in stage | The single next step, and how long here | Tracker |
| Status | Green, amber, red (see logic) | Computed |

## Status logic (how a row is coloured)

The rule is deliberately transparent so the colour is trusted:

- **Red, stalled:** in the Collect stage, at day 10 or more, with must-have items still outstanding. The reminder cadence is exhausted; the next action is a personal call, not another email.
- **Amber, needs attention:** an exception is open (for example a complex structure routed to a partner), or the onboarding has been in stage 7 or more days with must-have items outstanding.
- **Green, on track:** everything else, including complete-and-ready onboardings.

Status is computed from the data, not set by hand, so it cannot drift out of line with reality. The prototype implements exactly this logic.

## The dashboard (the partner view)

Five tiles answer the partner's real questions at a glance:

- **Active onboardings:** how many are in flight.
- **Ready for first meeting:** must-have complete and set up, so meetings can be booked.
- **Need attention:** amber count, the ones to look at today.
- **Stalled (call due):** red count, the ones that need a personal call now.
- **Average must-have complete:** a simple health number for the whole pipeline.

Filters by service line, status and owner let a partner or the Practice Manager slice the list in one click (for example "show me everything stalled" or "show me James's advisory onboardings"). Clicking a row opens the checklist, the reminder history and the next action, so the detail is one click away without cluttering the overview.

## From prototype to live tool

The prototype uses sample data held in the page (no external calls, no stored client data). A live build would:

1. **Read, not re-key.** Pull client, service line and owner from Xero Practice Manager and HubSpot, and document status from FYI and SharePoint, so staff update as little as possible by hand.
2. **Keep the systems as source of truth** (per the brief's exclusions: no custom integration development in this engagement). The tracker is a read-and-coordinate layer, not a new database of client records.
3. **Stay inside approved tools,** so client data controls and the Privacy Act 1988 are respected.
4. **Assist updates, not automate them.** The assistant's prompt B3 turns a quick staff note into a clean status line; the human still decides what the status is.

## Success measures the tracker makes visible

The tracker is also how the firm measures the redesign (see `docs/08_benefits_model.md` and the pilot report):

- must-have completeness before the first meeting, against the 95% target;
- onboardings stalled and time-to-clear, so stalls are caught early;
- time in each stage, so bottlenecks are visible;
- and simple consistency: every onboarding using the common process and the same document sets.

One shared view, honest computed status, and the detail one click away. That is what turns "partners cannot see which onboardings have stalled" into "partners can see everything, and act on the few that need them."
