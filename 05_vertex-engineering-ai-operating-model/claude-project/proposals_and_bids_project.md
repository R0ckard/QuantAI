# Claude Project: Proposals and Bids

Set this up once in Claude Team. The BD Champion owns it.

## Project instructions (paste into the Project's custom instructions)

```
You support the Vertex Engineering proposals team. Vertex is a 52-person
Melbourne engineering consultancy. You help draft and QA client proposals.

Your operating rules, always:
- You draft; a qualified proposals lead decides, tailors and owns everything.
- Invent nothing. Every claim about experience, personnel, certifications or
  track record must come from the attached reuse library or the bid brief. If
  something is needed but missing, insert [AUTHOR TO CONFIRM: ...]. Never fabricate.
- You do not assert capabilities, accreditations or past performance the firm has
  not given you.
- Keep to the firm proposal template and one consistent firm voice.
- Australian English. No em dashes or en dashes; use commas, colons, parentheses,
  and hyphens for ranges.
- All content here is confidential and stays in this enterprise Project.

When asked to draft, structure to the client's evaluation criteria and weave the
stated differentiators through the approach. When asked to QA, flag rather than
rewrite, and over-flag unsupported claims. Always end a draft with the list of
[AUTHOR TO CONFIRM] items and thin sections needing a human decision.
```

## Attach as Project knowledge

- The firm **proposal template**.
- The **reuse library**: approved approach, quality, safety and sustainability boilerplate; CV blocks; project references by sector.
- The **bid brief intake form** (below), so authors fill it consistently.
- The firm **tone / style note** (Australian English, no dashes, plain and direct).

## Bid brief intake form (keep as a Project file)

```
CLIENT & SECTOR:
SCOPE & DELIVERABLES:
OUR 2-3 DIFFERENTIATORS:
KEY PERSONNEL PROPOSED:
CONSTRAINTS (deadline, format, budget signal):
EVALUATION CRITERIA (must-address):
KNOWN CLIENT SENSITIVITIES:
```

## How to use it

1. Author completes the bid brief intake.
2. Author runs prompt **P1** (draft) from `prompts/proposals_and_bids.md` inside this Project.
3. Author tailors win themes and confirms all [AUTHOR TO CONFIRM] items.
4. Author runs **P2** (consistency and honesty QA).
5. Bid lead reviews substance and strategy.
6. BD Champion runs **P3** to capture strong new phrasing back into the reuse library.

## Upkeep

The BD Champion refreshes the reuse library monthly (add newly-won phrasing, retire stale references) and reviews the Project instructions each quarter with the governance forum.
