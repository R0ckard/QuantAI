# The Client Onboarding Assistant, Design

*Elevate Accounting. The prototype that makes every onboarding touch consistent, warm, and correctly scoped, without taking a person out of the relationship.*

## What it is

The Client Onboarding Assistant is a configured Claude Team assistant (a Claude Project) that drafts every written touch in the onboarding journey: the welcome, the document request, the reminders, and the handover. It reads the firm's standard journey, the document-request matrix and the email library, so what it produces is on-brand, on-process, and asks for exactly the right things for the client's service line. A staff member reviews and sends every message.

It is not a chatbot the client talks to, and it is not an automation that fires emails on its own. It is a drafting and organising aid that removes the blank page and the admin, so staff spend their time on the client, not the checklist.

## The design principle

> The assistant drafts and organises. A staff member owns the client relationship, reviews every message, and presses send. Warmth, judgement and professional advice stay human.

## What it does, and does not do

**It drafts and organises:**

- personalised welcome emails that sound like Elevate, not like a system;
- document requests built from the matrix for the exact service line and variant;
- gentle, non-duplicating reminders that mention only what is still outstanding;
- a first-meeting briefing pack from what was collected;
- warm handover emails and summaries;
- internal status notes for the tracker.

**It never:**

- sends anything to a client on its own (a person always reviews and sends);
- gives tax advice, or takes a tax position;
- gives legal advice or changes engagement-letter terms;
- makes or advises on an identity-verification (AML/KYC) determination;
- decides whether a client is acceptable, or whether an onboarding can proceed past a control;
- invents a client detail, a document, or a fact. If something is unknown it inserts a clearly marked placeholder for staff.

These limits are written into the assistant's instructions and repeated in every prompt, because in a professional services firm the line between "help me write this" and "make a professional judgement" is the line that protects the client and the firm.

## Why it keeps the experience warm (not robotic)

The worry with standardising onboarding is that it feels like a conveyor belt. The design turns that around:

- **The assistant does the admin; the person does the relationship.** By taking drafting and chasing off staff, it frees the exact time that makes onboarding feel personal.
- **Every draft is personalised from real details** (the client's name, situation, service line, and the owner's own sign-off), not a mail-merge.
- **A person reviews and sends,** so the human warmth and judgement are always in the final message. The client is talking to their accountant, helped by a good assistant, not to a machine.
- **The tone is set once, in the email library and the assistant's instructions,** so "warm, clear, and professional" is the default for the whole firm, not a lottery based on who wrote the email.

## Where it runs and how data is handled

- Runs in **Claude Team** (already in Elevate's stack). Client and engagement data stays in approved enterprise tools.
- The assistant works from details staff provide and from the firm's own templates and matrix. Sensitive client records stay in Xero, FYI, HubSpot and SharePoint; only what is needed to draft a message is put in front of the assistant, and identity documents are handled through the firm's existing controls, not pasted in for the AI to assess.
- Consistent with the Privacy Act 1988: least exposure, approved tools, staff in control.

## How it fits the workflow

1. Staff confirm the service line and variant (journey step 3).
2. Staff run the **document-request prompt**; the assistant drafts the correct request from the matrix; staff review and send (step 4).
3. As items come in, staff run the **reminder prompt** for outstanding must-have items; the assistant drafts a gentle, non-duplicating nudge; staff send (step 5).
4. When the must-have set is complete, staff run the **briefing prompt** to prepare the first meeting (step 7 prep).
5. After setup, staff run the **welcome and handover prompts** as needed.

Every step: assistant drafts, person owns and sends. The prompts and their guardrails are in `prompts/`, and the setup is in `claude-project/`.
