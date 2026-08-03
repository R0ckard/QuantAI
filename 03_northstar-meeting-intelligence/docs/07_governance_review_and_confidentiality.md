# Governance: Human Review, Exceptions and Confidentiality

*NorthStar Consulting. The controls that make an AI meeting record trustworthy and safe to publish.*

A meeting-intelligence system is only as good as the trust people place in its records. In a professional services firm handling client-confidential material, that trust rests on three things: a human reviews everything before it is published, exceptions are handled consistently, and confidential content follows a clear protocol. This document defines all three.

## The one rule everything rests on

> The assistant drafts the record. A nominated human reviews and approves before anything is published. Nothing is auto-published, ever.

Automated publishing is a stated exclusion of the brief, and for good reason: an unreviewed error in a client meeting record is a professional and client-trust problem. The review gate is not optional.

## Human review: who, what, when

**Who.** A nominated reviewer for each meeting, usually the meeting owner. For client-delivery and leadership meetings the reviewer is the accountable senior person for that engagement or decision.

**What they check** (the review, stage 3 of the workflow):

- the summary is accurate and usable;
- the decisions are correct and complete;
- every action has the right owner and a real due date (no [OWNER TO CONFIRM] or [DUE DATE TO CONFIRM] left);
- the risks are captured with sensible severity and owners;
- confidentiality flags are handled and the client-facing vs internal split is right.

**When.** Before publish, every time. The reviewer checklist is built into the minutes template, and a record cannot be published with unresolved owner or confidentiality flags.

## The RACI for a meeting record

| Role | Responsibility |
|---|---|
| **Meeting owner (Accountable)** | Owns the meeting and, usually, the review. Approves the record for publishing. |
| **Reviewer (Responsible)** | Checks and corrects the draft; resolves the flags. Often the same person as the owner. |
| **Assistant (drafts only)** | Produces the draft record. Never a reviewer, never an approver, never publishes. |
| **PMO Manager (process owner)** | Owns the method, the registers and the standard. Sees adoption and quality, not every record. |
| **Information Governance Lead (Consulted)** | Owns the confidentiality and access rules the system runs under. |

The assistant is never Accountable or Responsible. It drafts; named humans own everything else.

## Exception handling

Exceptions are named so they are handled the same way every time, not improvised:

- **The transcript is poor or incomplete.** The assistant says so and does not fill gaps with assumptions (guaranteed accuracy on poor audio is a stated exclusion). The reviewer works from what is reliable and notes what is missing.
- **An action has no clear owner.** It is published only once the reviewer assigns an owner. An unowned action never goes into the register.
- **A decision or risk is ambiguous.** The reviewer confirms or removes it; the assistant does not guess intent.
- **Confidential content appears.** The confidentiality protocol below applies before publishing.
- **A record is disputed after publishing.** It is corrected through the normal record-correction process, with the change logged, so the memory stays trustworthy.

## Confidentiality protocol

The firm's real exposure is client-confidential content moving between tools without a rule. The protocol closes that.

- **Approved tools only.** Transcripts and records stay in the firm's approved tools (Teams, Otter.ai, SharePoint, Lists, Claude Team). Client-confidential content is never copied into a personal or unapproved tool.
- **Confidentiality by meeting type.** Each meeting type carries a default confidentiality level (client-confidential, commercially sensitive, or internal, see the taxonomy). Client-delivery meetings get the strictest handling.
- **Least exposure.** Only what is needed to produce the record is put in front of the assistant. The assistant flags client-identifying, commercially sensitive and personal content for deliberate handling; it never makes the confidentiality decision.
- **Client-facing vs internal split.** Where a record has both, it is split so the client-facing part can be shared without exposing internal notes.
- **Access model.** Published records and registers follow the firm's access rules: teams see their own records; managers see their teams; leadership sees the firm. The Information Governance Lead owns this.
- **Personal information** is handled consistent with the Privacy Act 1988 (Australian Privacy Principles).

## Practitioner-level, not legal advice

This model is designed to sit inside the expectations NorthStar already works to: client confidentiality obligations, the firm's information-governance and records policies, and the Privacy Act 1988. It is a practitioner-level operating control, not legal or records-management advice; the firm's own information-governance controls remain the authority, and the Information Governance Lead should confirm the model against them before rollout. Enterprise data-retention and records-management redesign are out of scope (a stated exclusion).

## Why the controls are what make it adoptable

An AI that could publish an unreviewed, client-confidential record on its own would never be trusted in a professional services firm, and rightly so. By keeping a named human accountable for every record, refusing to invent owners, and handling confidential content under a clear protocol, the system earns the trust that makes people actually use it. The governance here is not the price of the system; it is what makes the system safe to rely on.
