# AI Acceptable-Use & Human-Review Framework

*BrightPath Financial Services. Practitioner-level governance; **not** legal, compliance or cybersecurity assurance, a real deployment would be reviewed by the firm's licensee/compliance function.*

This is the one-page rule set every staff member reads and signs before using AI on client work. It is deliberately short, a rule nobody remembers is not a control.

## 1. The three rules that matter most

1. **A qualified human owns every client-facing and regulated output.** AI produces drafts. A licensed adviser (for advice) or the responsible staff member (for communications) reviews, corrects and approves before anything reaches a client or a file. The reviewer, not the tool, is accountable.
2. **Client-identifying data only goes into approved, business-tier tools with training turned off.** Claude Team and ChatGPT Team (business tiers, data excluded from model training) are approved. Personal/free AI accounts are not. Where practical, de-identify before drafting (see §3).
3. **If you wouldn't put it in a client file, don't ship it.** AI output is a starting point, not a source of truth. Every factual claim, figure, product name and regulatory statement is the reviewer's responsibility to verify.

## 2. Data-handling tiers

| Data type | Example | May use with AI? | How |
|---|---|---|---|
| **Public / generic** | Explaining a concept, generic email tone | Yes | Freely, in approved tools |
| **Business-confidential, non-personal** | Internal process text, de-identified templates | Yes | Approved Team tools only |
| **Client personal information** | Name, DOB, TFN, balances, health | Restricted | De-identify first, or use only within approved tools with training off; never in personal accounts |
| **Sensitive / special-category** | Health, biometric, government IDs (TFN) | Avoid | Do not paste into any AI tool; reference by placeholder |

Alignment: Australian **Privacy Act 1988** and the Australian Privacy Principles (APPs) govern personal information handling; treat Tax File Numbers under their specific protections. This table is the practitioner rule that operationalises that.

## 3. De-identification pattern (the default habit)

Before drafting advice or analysis, replace identifiers with placeholders: `[CLIENT]`, `[SPOUSE]`, `[BALANCE]`, `[FUND]`. The adviser reinstates real details at the review step, inside the firm's systems. This keeps the highest-risk data out of the tool while still getting the drafting leverage. The pilot prompts are written to expect placeholders.

## 4. Mandatory human-review gate

Nothing in the two pilots, and nothing in any future workflow, distributes without passing the gate:

- **Advice preparation:** licensed adviser reviews the AI first draft against the client's file and best-interests duty, corrects, and signs. The AI never issues advice.
- **Client communications:** the responsible staff member reads every AI-drafted message for accuracy and tone before sending; anything containing advice is escalated to an adviser.

The gate is designed into the tools (the Project instructions end every draft with a review checklist) so it is the path of least resistance, not an afterthought.

## 5. Red lines, AI must not

- Generate or send **personal financial advice** without adviser review and sign-off.
- Fabricate figures, product features, performance, or regulatory citations.
- Process client personal data in **personal or free** AI accounts.
- Make decisions that affect a client (approvals, recommendations, transactions) autonomously.
- Be represented to clients as a human, or its drafts passed off as independently verified without review.

## 6. Roles

- **IT & Risk Manager**, owns this framework, approves tools, reviews data settings.
- **Head of Advice**, owns the advice human-review standard.
- **AI Champions**, first line for "can I use AI for this?" questions; escalate edge cases.
- **All staff**, read, sign, and apply; when in doubt, don't paste, ask.

## 7. Australian regulatory context (practitioner summary)

This framework is written to sit comfortably under: the **Corporations Act** best-interests duty for financial advice (advice remains a qualified-human act); **ASIC RG 175** expectations on advice quality and record-keeping; and the **Privacy Act 1988 / APPs** for personal information. It is a working practitioner control set, and is **not** a substitute for the licensee's own compliance sign-off.

## 8. Sign-off

Approved by the IT & Risk Manager and the executive sponsor; reviewed at each quarterly Steering Group. Staff acknowledge annually and on material change.
