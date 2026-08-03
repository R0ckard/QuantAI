# Implementation and Training Plan

*Elevate Accounting. From an approved design to the firm's normal way of onboarding, in six weeks.*

The brief runs six weeks and asks for staff guidance, rollout sequencing and performance measures. This plan sequences the rollout so the firm agrees one common process, proves it on real clients, trains staff on the tools, and hands over a standard that holds. It maps to the brief's phases.

## Phase 1: Mobilise and discover (weeks 1-2)

- **Agree the common baseline process.** The partners sign off the common journey and the service-line variants (`03_...`), so there is one agreed way, with named exception owners. This is the decision everything else depends on; without it the old "everyone does it their own way" returns.
- **Confirm the document-request matrix** with each service-line partner, so the firm agrees exactly what to ask each client type for.
- **Baseline the current state:** record current onboarding times and the current document-completeness rate on a handful of recent, de-identified onboardings, so "before" is measured, not assumed.
- **Nominate the process owner** (the Practice Manager) and the exception owners (service-line partners).

## Phase 2: Analyse and design, then configure (weeks 2-4)

- **Stand up the Client Onboarding Assistant** in Claude Team: create the Project, load the matrix, journey, email library and checklist as knowledge, and paste the instructions (`claude-project/`).
- **Set up the tracker** with the firm's stages and the must-have gate, and agree who updates it and when (`06_...`).
- **Populate the knowledge base** in SharePoint per the structure in `07_...`, so there is one home for the standard.
- **Dry-run the five scenarios** (`09_...`) with the Practice Manager to confirm the process, prompts and tracker behave as designed before real clients touch it.

## Phase 3: Prototype and test, live (weeks 4-7, overlapping)

- **Run a live pilot** on the next real onboardings across the three service lines, using the assistant and tracker. Start with a small group of willing staff.
- **Measure against the same tracker and adoption log,** recording real staff time, document-completeness and (where available) client feedback on tone, so the scenario estimates become measured results.
- **Watch the two lines closely:** every client message is reviewed and sent by a person, and the assistant gives no tax, legal or identity advice. Any drift is a priority fix.
- **Tune** the prompts, matrix and email library from what the pilot shows, and log the changes in the knowledge base.

## Phase 4: Enable and hand over (final 1-2 weeks)

- **Train the whole Client Services team** on the two SOPs (`sops/`): running an onboarding with the assistant, and managing the tracker and stalls. Training is short and hands-on: run a real onboarding together.
- **Hand over the standard:** the knowledge base is complete, owned and dated; the SOPs, prompts, email library and checklist are editable and in the agreed location.
- **Agree the ongoing rhythm:** daily tracker checks by owners, a weekly five-minute pipeline glance by the Practice Manager and partners, and a quarterly review of the standard.
- **Acceptance:** the common journey and three variants are documented and signed off, the five scenarios completed without a critical failure, and the tracker and dashboard behave as specified.

## Training pack (what staff get)

- A one-page **"how we onboard now"** orientation (the common journey and the two lines that never move: a person sends every message; no AI advice).
- A hands-on **assistant walkthrough:** run a welcome, a document request, a reminder and a handover, reviewing and sending each.
- A hands-on **tracker walkthrough:** update a row, read the status colours, handle a stall.
- The two **SOPs** as the reference, plus the **email library** and **checklist**.
- A **"who to ask"** note: the Practice Manager owns the process and the tools.

## Performance measures (how success is judged)

The measures are the ones the tracker and benefits model already produce, so measuring adds no new burden:

- **Onboarding time** per service line, before and after, against the 3-hours-to-45-minutes standard.
- **Document completeness** before the first meeting, against the 95% target.
- **Stalls** flagged and time-to-clear, so stalls are caught and closed.
- **Consistency:** every onboarding using the common process and the correct document set.
- **Client tone and usability** approved by pilot users and partners.

## What stays constant

The two lines do not phase in or out. From day one: a person owns the client relationship and sends every message, and the assistant gives no tax, legal or identity-verification advice. Everything above is about spreading a warm, consistent, well-run onboarding, never about taking the person out of it.

*Timings and targets are a scenario plan under stated assumptions; a real rollout would tune them to the firm's calendar and client flow.*
