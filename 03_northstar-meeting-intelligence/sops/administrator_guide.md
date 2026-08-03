---
title: "Administrator Guide, Meeting Intelligence"
---

# Administrator Guide, Meeting Intelligence

**NorthStar Consulting**
Document owner: PMO Manager · For: the Microsoft 365 administrator and the process owner
Version: 1.0 · Review cycle: quarterly

> **Demonstration guide.** A real deployment would be configured with the firm's Microsoft 365 administrator and Information Governance Lead. This is a practitioner-level operating guide, not legal or records-management advice.

## 1. What you own

The plumbing that makes the system reliable: the Claude Project, the registers in Planner and Lists, the field mapping, the dashboard, and the access and confidentiality controls. The goal is that meeting owners and reviewers can run the workflow without touching configuration.

## 2. The Claude Project

- Set up the Meeting Intelligence Assistant Project in Claude Team (see `claude-project/`).
- Attach the taxonomy and record standard, the minutes template, the workflow design, and the confidentiality levels as Project knowledge.
- Do not attach real client-confidential transcripts as permanent knowledge; transcripts are provided per meeting, and the prototype uses de-identified data.
- Review the instructions each quarter and whenever a meeting type or confidentiality rule changes.

## 3. The registers (Planner and Lists)

Build the three registers per the field mapping in `05_registers_and_field_mapping.md`:

- **Action register** (Planner and Lists): action, owner, due date, status, team, source meeting, carried-forward-from.
- **Decision register** (Lists): decision, date, meeting, authority, link.
- **Risk register** (Lists): risk, severity, owner, meeting, status.

Key rules to enforce in configuration:

- **Owner is mandatory** on an action; a record with an unresolved owner flag cannot be published.
- **Overdue is computed** from the due date, not set by hand.
- **Carried-forward-from** is stamped when an action rolls into a later meeting, so the dashboard can count slippage.

## 4. The dashboard

- The manager dashboard reads the action register and shows open, overdue and carried-forward actions by team, with the stuck items surfaced. The prototype (`dashboard/index.html`) shows the intended behaviour and status logic.
- For leadership, build the Power BI executive view over the same registers per the specification in `06_dashboard_specifications.md`: firm-wide accountability, by-team breakdown, decisions and risks, and the adoption and quality measures.
- Refresh daily from Planner and Lists.

## 5. Access and confidentiality controls

- Apply the access model with the Information Governance Lead: teams see their records, managers see their teams, leadership sees the firm.
- Confidentiality levels follow the meeting type; client-delivery records get the strictest handling.
- Keep everything in approved tools; the system never requires content to leave them.

## 6. Health checks

- **Weekly:** confirm records are publishing to the registers and the dashboard is refreshing.
- **Monthly:** check the adoption and quality measures (meetings processed, action-completeness, reviewer-usable rate, admin-time trend) for the monthly report.
- **Quarterly:** review the Project, the field mapping and the access model with the PMO Manager and Information Governance Lead.

## 7. Common issues

- **Actions not appearing on the dashboard:** check the field mapping and that the record was published (approved), not just drafted.
- **A record cannot publish:** an unresolved owner or confidentiality flag; the reviewer resolves it.
- **Overdue not showing:** confirm the due date is populated and the computed-status rule is applied.

## 8. Records and version control

| Version | Date | Change | Author |
|---|---|---|---|
| 1.0 | 2026 | Initial guide | QuantAI (portfolio) |
