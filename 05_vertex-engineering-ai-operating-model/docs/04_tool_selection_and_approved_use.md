# Tool Selection and Approved Use (Which AI for Which Task)

*Vertex Engineering. The framework the firm is missing most.*

Vertex already pays for three capable platforms: Microsoft Copilot, Claude Team and ChatGPT Enterprise. The contracts stay (per the brief). The problem is not the tools, it is that nobody can say when to reach for which one, so effort is duplicated, quality is uneven, and leadership cannot connect licence spend to benefit. This is the piece that turns three overlapping licences into one deliberate toolkit.

The framework has four parts: a one-line rule of thumb, a decision path anyone can follow in ten seconds, an approved-use matrix by task and platform, and the confidentiality rule that overrides all of it.

## The rule of thumb

> Copilot for work that lives inside your Microsoft files and inbox. Claude for careful drafting, structure and review of long documents. ChatGPT for open-ended thinking, research framing and quick generation.

That single line resolves most day-to-day choices. The rest of this document is for the cases where it does not, and for the confidentiality and assurance rules that sit above the choice.

## The decision path

Four questions, in order. Stop at the first one that gives an answer.

```
  1. Is the material confidential, client-identifying, or commercially sensitive?
        -> Yes: approved enterprise tier only (Copilot or ChatGPT Enterprise or
                Claude Team), inside the firm tenant. Never a personal or free account.
                Then continue to question 2 to choose which.
        -> No:  continue to question 2.

  2. Does the task work ON your Microsoft content (an email, a Teams thread,
     a Word or Excel file, a meeting you attended)?
        -> Yes: Copilot. It has the context already and keeps data in the tenant.
        -> No:  continue to question 3.

  3. Is it a long or high-stakes document that needs careful structure,
     consistency and review (a report, a proposal, a governance paper)?
        -> Yes: Claude. Strongest at long-form structure, careful reasoning
                and review-style work.
        -> No:  continue to question 4.

  4. Is it open-ended (brainstorming, research framing, first-draft
     generation, quick reformatting)?
        -> Yes: ChatGPT. Fast, flexible, broad general knowledge.
        -> Still unsure: default to the rule of thumb, or ask an AI Champion.
```

The path is deliberately short. Staff should not have to think hard about tool choice: they should get to a defensible answer in seconds and spend their judgement on the work itself.

## Approved-use matrix

Read this as "for this kind of task, start here." "Primary" is the default. "Also fine" is a reasonable second choice. "Avoid" means another tool is clearly better or the platform is not approved for that data.

| Task | Copilot | Claude | ChatGPT | Primary choice and why |
|---|---|---|---|---|
| Summarise a Teams meeting you attended | Primary | Avoid | Avoid | Copilot has the transcript and stays in-tenant |
| Draft a reply inside Outlook | Primary | Also fine | Also fine | Copilot has the thread; others need copy-paste |
| Turn a messy Excel export into a status narrative | Primary | Also fine | Also fine | Copilot reads the sheet directly |
| Draft a long technical report section from an engineer's notes | Also fine | Primary | Also fine | Claude is strongest at long, structured, careful drafting |
| QA a report draft for structure, clarity and consistency | Avoid | Primary | Also fine | Review-style work with a firm checklist; a human still signs |
| Draft a proposal from a structured bid brief | Also fine | Primary | Also fine | Long-form, reuse-heavy, consistency matters |
| Brainstorm approaches to a client problem | Also fine | Also fine | Primary | Open-ended generation, breadth of angles |
| Research framing and background reading structure | Avoid | Also fine | Primary | Fast, broad, good for scoping (verify all facts) |
| Rewrite text to a firm tone or shorter length | Also fine | Primary | Also fine | Claude holds voice and structure well |
| Draft internal policy or process documentation | Also fine | Primary | Also fine | Structured, reusable, review-bound |
| Anything touching engineering design, calculation, verification or certification | Avoid | Avoid | Avoid | Out of bounds for every tool. A qualified engineer owns it, unaided by AI on the technical content |

The last row is the one that matters most in an engineering firm. No platform is approved to perform, check or certify engineering work. That is not a tool-selection question, it is the assurance line in `05_governance_and_assurance.md`.

## The confidentiality rule that overrides everything

Tool choice never overrides data handling. Three rules sit above the whole framework:

1. **Enterprise tier only for anything real.** Client names, project details, commercial terms, personal information and any internal document go only into the firm's approved enterprise instances (Copilot in the tenant, ChatGPT Enterprise, Claude Team). Personal accounts and free tiers are never used for firm or client material, because their data handling is not governed by the firm's contracts.
2. **Least exposure.** If a task can be done without pasting client-identifying detail, do it that way. Anonymise where the AI does not need the identity to help.
3. **When in doubt, up a level.** If you are unsure whether something is sensitive, treat it as sensitive and check with an AI Champion or the governance forum. The cost of asking is minutes; the cost of a leak is the client relationship.

## Why not just standardise on one tool?

Because each platform has a genuine strength and the firm already owns all three. Copilot's advantage is context: it already sees your mail, files and meetings. Claude's advantage is careful long-form structure and review. ChatGPT's advantage is open-ended breadth and speed. Forcing everything through one tool would waste licence value the firm is already paying for and push people back to private, ungoverned use. The operating-model move is not fewer tools, it is clear rules for the tools you have.

## How this stays current

Platforms change fast. The matrix is owned by the governance forum and reviewed each quarter, or sooner if a platform ships a material change. The AI Champions feed real examples back in ("Copilot now does X well," "Claude changed Y"), so the rules track reality instead of freezing on the day they were written. The decision path, though, is designed to be stable: it is about the shape of the task, not the current feature list, so it should rarely need to change.
