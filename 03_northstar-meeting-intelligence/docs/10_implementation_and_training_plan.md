# Implementation, Training and Hypercare Plan

*NorthStar Consulting. From an approved design to the firm's normal way of running meetings, in seven weeks plus two of hypercare.*

The brief runs seven weeks plus two weeks of light hypercare, and asks for meeting owners, reviewers and administrators to be trained. This plan sequences the rollout so the firm agrees the standard, proves it on twenty meetings, trains the three roles, and hands over a system that holds, with a supported settling-in period. It maps to the brief's phases.

## Phase 1: Mobilise and discover (weeks 1-2)

- **Agree the taxonomy and record standard.** The Head of Consulting and PMO Manager sign off the five meeting types and the minimum record standard (`02_...`). This is the decision everything depends on.
- **Confirm the confidentiality model** with the Information Governance Lead: confidentiality levels by meeting type, the access model, and the approved-tools rule (`07_...`).
- **Baseline the current state:** measure current write-up time, action-completeness and reviewer usability on a sample of recent, de-identified meetings, so "before" is measured, not assumed.
- **Nominate the roles:** the PMO Manager as process owner, reviewers for each meeting type, and the Microsoft 365 administrator for the registers and dashboard.

## Phase 2: Analyse and design, then configure (weeks 2-4)

- **Stand up the Meeting Intelligence Assistant** in Claude Team: create the Project, load the taxonomy, record standard, minutes template and confidentiality levels, and paste the instructions (`claude-project/`).
- **Build the registers** in Planner and Lists per the field mapping (`05_...`), and set up the manager dashboard; specify the Power BI executive view for the firm to build in-tenant.
- **Configure the confidentiality and access controls** with the administrator and the Information Governance Lead.
- **Dry-run the workflow** on a few de-identified transcripts to confirm the assistant, review gate and publishing behave as designed.

## Phase 3: Prototype and test (weeks 4-7)

- **Run the twenty-meeting pilot** (`09_...`) across the five meeting types, with a nominated reviewer validating each output.
- **Measure against the adoption log:** draft time, action-completeness, reviewer-usable rate, and the admin-time cut, so the scenario estimates become measured results.
- **Tune the quality thresholds** (the owner-and-date flag, the light-meeting record) from what the pilot shows, and log the changes.
- **Watch the lines:** nothing auto-published, no owner invented, confidential content flagged not moved. Any drift is a priority fix.

## Phase 4: Enable and hand over (final 1-2 weeks)

Training is role-based, because the three roles do different things:

- **Meeting owners:** how to set the meeting type, run the record prompt, and get a good draft. Short and hands-on (run a real meeting through it).
- **Reviewers:** how to review and approve, resolve owner and confidentiality flags, and run the carry-forward check. This is the accountability role, so it gets the most attention.
- **Administrators:** how the registers, field mapping, dashboard and access controls work, and how to keep them healthy.

Handover includes the **user guide** (owners and reviewers), the **administrator guide**, and the training materials, all editable and stored in the agreed location. The taxonomy, record standard, prompts and templates are signed off.

## Hypercare (the two weeks after go-live)

Light, but real. For two weeks after rollout:

- a **daily check-in** on any issues, with a two-week issue log kept (a brief acceptance item);
- the **PMO Manager on hand** to resolve reviewer questions and tune prompts;
- a **watch on the success measures** in the dashboard and adoption log, to confirm they hold on real meetings;
- a **close-out review** at the end of hypercare: are the five measures met on real data, are reviewers confident, is anything still rough.

After hypercare, ongoing monitoring and support beyond the agreed period are out of scope (a stated exclusion); the firm owns the running system, with the PMO Manager as process owner.

## Performance measures (how success is judged)

The measures are the brief's five success criteria, produced by the dashboard and adoption log, so measuring adds no new burden: minutes within five minutes, at least 90% of actions owned and dated, at least 90% of summaries usable, managers able to see open/overdue/carried-forward by team, and admin time down at least 80%.

## What stays constant

The two lines never phase in or out. From day one: a human reviews and approves every record before it is published, and every action is owned and dated by a human, never invented by the AI. Everything above is about spreading a reliable, accountable meeting memory across the firm, never about removing the human from it.

*Timings and targets are a scenario plan under stated assumptions; a real rollout would tune them to the firm's calendar and tenant access.*
