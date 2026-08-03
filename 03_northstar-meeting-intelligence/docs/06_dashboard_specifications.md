# Dashboard Specifications

*NorthStar Consulting. What managers and leaders see, so open, overdue and carried-forward work stops being invisible.*

The working prototype is in `dashboard/index.html`. This document is the specification behind it, and the specification for the Power BI executive view a live build would add. The design goal is that a manager can answer "what is open, overdue and stuck, by team" in one glance, and a leader can see the firm-wide picture, all from the registers that the meeting records already feed.

## The manager dashboard (the prototype)

The piece managers do not have today. It reads the action register and shows, across teams:

- **Summary tiles:** open actions, overdue actions, actions carried forward (stuck), and completion rate.
- **The action register:** every action with owner, due date, team, status, source meeting, and how many times it has been carried forward.
- **Filters:** by team, by status (open / overdue / carried forward / done), and by owner, so a manager can pull "everything overdue in Delivery" or "everything owned by one person" in a click.
- **The stuck list:** actions carried forward two or more times, surfaced explicitly, because repeated slippage is the signal that matters most.

The prototype also carries tabs for the **decision register** and the **risk register**, so the same window gives searchable access to "what did we decide" and "what risks are open."

## Status logic (computed, so it is trusted)

- **Overdue:** an open action past its due date. Computed from the date, never set by hand, so overdue work cannot be quietly reclassified.
- **Carried forward (stuck):** an open action carried forward one or more times; two or more is flagged as stuck.
- **Done:** completed by the owner.
- **On track:** open, not yet due.

Because status is computed from the register data, the dashboard is trustworthy: the colour and the counts always match reality.

## The executive view (Power BI specification)

For leadership, a live build adds a Power BI page over the same registers. It answers the leadership questions:

- **Firm-wide accountability:** total open and overdue actions, and the trend over time (is the backlog growing or shrinking).
- **By team:** open, overdue and carried-forward actions per team, so leadership can see where work is stuck or a team is overloaded.
- **Decisions and risks:** count of decisions recorded and open risks by severity, so the organisational memory is measurable.
- **Adoption and quality:** meetings processed, share of actions with an owner and due date, and reviewer-usable rate, the brief's success measures.

The specification defines the fields (from the registers), the refresh rule (daily from Planner and Lists), and the access model (managers see their teams; leadership sees the firm), so the firm can build it in its own tenant.

## What the dashboards make visible (the success measures)

The dashboards are also how the firm measures the system, using data the records already produce:

- managers can view **open, overdue and carried-forward actions by team** (a brief success criterion, met by the manager dashboard);
- the share of **actions with an owner and due date** (target at least 90%);
- the **reviewer-usable rate** on summaries (target at least 90%);
- **meetings processed** and the **post-meeting admin time** trend (target down at least 80%).

## From prototype to live tool

The prototype holds sample data from the twenty-meeting pilot in the page (no external calls, no stored client data). A live build would read the action, decision and risk registers from Planner and Lists, refresh daily, and apply the access model, with the manager view as an in-tenant page and the executive view in Power BI. The registers stay the source of truth; the dashboards are the window onto them.

One window onto the registers, computed status, and the stuck items surfaced. That is what turns "managers cannot see overdue actions across teams" into "managers can see everything, and act on what is stuck."
