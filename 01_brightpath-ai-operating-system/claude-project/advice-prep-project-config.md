# Claude Project, Advice Preparation (configuration guide)

*How to stand up the Advice-Prep Project in Claude Team so every adviser starts from the firm standard.*

## Purpose

A dedicated Claude Project that carries BrightPath's advice-drafting standard, so any adviser produces a consistent, review-ready first draft, with the human-review gate built in.

## 1. Project name & access

- **Name:** `BrightPath, Advice Preparation`
- **Access:** Advisers and paraplanners only. Owned by the Head of Advice; maintained by the Advice AI Champion.

## 2. Project instructions (paste into the Project's custom instructions)

```
You support licensed BrightPath advisers by drafting FIRST DRAFTS of advice
documents and related artefacts for the adviser to verify, correct and own.
You are not the adviser and you never issue advice.

ALWAYS:
- Use only information the adviser provides or that is in attached knowledge.
- Never invent figures, projections, product features, or regulatory
  citations. Mark missing details as [[ADVISER TO CONFIRM: …]].
- Follow BrightPath's SoA structure and disclosure standards (attached).
- Write in BrightPath's voice: warm, plain English, honest about trade-offs,
  no guarantees.
- End every advice draft with the mandatory adviser REVIEW CHECKLIST.

NEVER:
- Present drafts as final advice or suggest they can go to a client unreviewed.
- Process real client identifiers if the adviser is working with placeholders,
  respect the [CLIENT]/[BALANCE]/[FUND] convention.
- Give an opinion on strategy the adviser hasn't decided; you assemble, they
  decide.

If a request would breach the above, say so and offer the compliant version.
```

## 3. Knowledge to attach

Attach BrightPath's (de-identified, standard) materials so drafts inherit them:

- SoA / RoA **structure skeleton** (headings and standard order).
- **Disclosure library** (standard disclosure blocks, current versions).
- **Tone & style guide** (plain-English rules, terms to explain, words to avoid).
- 2-3 **exemplar de-identified advice documents** ("what good looks like").
- The **prompt library** (`../prompts/advice-prep/`).

> Keep knowledge **de-identified and versioned**. The Champion updates disclosures when they change; nothing here contains real client data.

## 4. Connectors (optional, phase 2)

Read-only SharePoint access to the templates library can be added so the Project references current templates directly. Keep least-privilege: the Project needs the template folder, not the whole tenant. Advice output is still drafted, reviewed and filed by the adviser.

## 5. How advisers use it

1. Open the Project, choose the relevant prompt from the library.
2. Supply structured inputs with placeholders for client specifics.
3. Receive the first draft + review checklist.
4. Review against the client file and best-interests duty; reinstate details in-system; obtain sign-off.

## 6. Maintenance

The Advice AI Champion reviews the Project monthly: refresh disclosures, add new exemplars, fold improved prompts back into the library (version bump). Changes are announced to advisers.
