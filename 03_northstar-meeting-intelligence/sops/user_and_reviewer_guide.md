---
title: "User and Reviewer Guide, Meeting Intelligence"
---

# User and Reviewer Guide, Meeting Intelligence

**NorthStar Consulting**
Document owner: PMO Manager · For: meeting owners and reviewers
Version: 1.0 · Review cycle: quarterly

> **Demonstration guide.** A real deployment would be confirmed against the firm's information-governance controls. This is a practitioner-level operating guide, not legal or records-management advice.

## 1. What this system does

It turns a meeting transcript into a reliable, structured record (summary, decisions, risks, and actions with owners and due dates), so the firm has a searchable memory and clear accountability. The assistant drafts; you review and approve. Nothing is published until a human approves it.

## 2. The one rule

> The assistant drafts the record. You review and approve before anything is published. Every action gets a named owner and a due date, or it is flagged, never guessed.

## 3. If you are a meeting owner

**Step 1, Intake.** Have the transcript (from Teams or Otter.ai) ready and decide the meeting type: client delivery/project, leadership/decision, internal team/status, sales/pursuit, or governance/risk/PMO. The type sets the record standard and the confidentiality handling.

**Step 2, Draft.** In the Meeting Intelligence Assistant Project (Claude Team), run the record prompt (M1, or M2 for a light meeting). The assistant produces the record to the standard for your meeting type, and ends with a reviewer checklist of anything it flagged (missing owners or dates, ambiguities, confidentiality).

**Step 3, Hand to review.** If you are also the reviewer, go to section 4. Otherwise pass the draft and the checklist to the nominated reviewer.

## 4. If you are a reviewer (the accountable role)

You are the gate. Nothing is published until you approve it. Check:

- the **summary** is accurate and usable;
- the **decisions** are correct and complete;
- **every action has the right owner and a real due date** (resolve every [OWNER TO CONFIRM] and [DUE DATE TO CONFIRM]; never publish with one left);
- the **risks** are captured with sensible severity and owners;
- **confidentiality** flags are handled, and the client-facing vs internal split is right for the meeting type.

Then approve. On publishing, the record's actions, decisions and risks flow to the registers, and the actions appear on the dashboard.

## 5. The carry-forward habit (recurring meetings)

Before a recurring meeting, run the carry-forward check (prompt A3) against the previous record. It tells you which previous actions were completed, updated, or still open and not mentioned. Carry the still-open ones into this meeting's record so nothing quietly dies. The dashboard counts carry-forwards, so an item carried forward twice or more is flagged as stuck.

## 6. Confidentiality

- Keep transcripts and records in approved tools only (Teams, Otter.ai, SharePoint, Lists, Claude Team). Never copy client-confidential content into a personal or unapproved tool.
- For client-delivery meetings, keep the client-facing vs internal split. The assistant flags sensitive content; you decide the handling.

## 7. What the assistant will not do (by design)

- It will not publish anything itself.
- It will not invent an owner, a due date, a decision, a risk or an action.
- It will not make a management judgement (whether an action matters, whether a risk is acceptable). That is yours.

## 8. Getting a better result

- Set the meeting type correctly; it changes the record standard.
- If the transcript is poor, the assistant will say so rather than guess; work from what is reliable and note what is missing.
- Tighten a vague action into a specific, assigned one at review; that is what makes the record drive work.

## 9. Records and version control

| Version | Date | Change | Author |
|---|---|---|---|
| 1.0 | 2026 | Initial guide | QuantAI (portfolio) |
