# Pilot 2: Technical Report Drafting and QA

*Vertex Engineering. Highest-stakes workflow: the one that proves AI can sit next to engineering work safely.*

## Why this pilot

This is the hardest pilot on purpose. Technical reports are core engineering delivery, they carry professional accountability, and they are exactly where the firm's technical staff are (rightly) most cautious. If the operating model can help here without ever crossing the assurance line, it earns trust everywhere else. Get this one right and the sceptics become the advocates.

The tool is **Claude** for drafting and structured review, inside Claude Team. And the defining feature of this pilot is what the AI does **not** do.

## The assurance line, stated before anything else

> The AI helps with structure, clarity, formatting and consistency. A qualified, registered engineer performs, checks, owns and signs every technical statement, number and conclusion. The AI never performs a calculation, never checks a calculation, never verifies a design against a code or standard, and never certifies anything.

Everything below respects that line. If any step ever put AI in the position of producing or checking technical content, that step would be removed. This is not a workflow with a safety note bolted on; the safety line is the design.

## Current state

```
  Engineer produces the technical work (calcs, design, findings)  [HUMAN, no AI]
     |
  Writes the report around it from a blank document
     |
  Wrestles structure, headings, consistency, plain-language sections
     |
  Reformats to the report template by hand
     |
  Discipline lead reviews structure AND technical content together
     |
  Revisions, reformatting, re-review
     |
  Issue (engineer signs)
```

The technical work is fine. The drafting, structuring and formatting around it is slow, inconsistent, and mixes up "is this well written" with "is this technically correct" at review time.

## Target state

```
  Engineer produces and owns the technical work  [HUMAN, no AI, unchanged]
     |
  Engineer gives Claude: the human-owned findings/numbers + the report template
     |
  Claude drafts non-technical structure and prose AROUND the fixed technical content
  (executive summary wording, section scaffolding, plain-language explanation,
   consistency, formatting to template) -- it does not touch the numbers or conclusions
     |
  Claude runs a QA-assist pass: readability, template compliance, internal consistency,
  undefined terms, missing sections -- a checklist, NOT a technical check
     |
  Engineer reviews: confirms every technical statement is theirs and correct,
  accepts or rejects each AI suggestion
     |
  Discipline lead review -- now cleanly split: technical correctness (human, as always)
  is separated from structure/clarity (already handled)
     |
  Issue (engineer signs and owns)
```

The technical content enters the workflow already finished and human-owned, and leaves untouched. The AI only ever works on the words and structure around it.

## The workflow, step by step

1. **Technical work happens first, without AI.** The engineer completes the calculations, design and findings using the firm's normal process. AI is not involved and the bright line is stated in the workflow itself.
2. **Hand the fixed content to Claude.** The engineer provides the finished, human-owned technical results plus the firm report template. The prompt instructs Claude explicitly: treat all numbers, findings and conclusions as fixed and correct; do not alter, recompute, verify or comment on their technical validity.
3. **Draft the surround.** Claude drafts the report structure, the executive summary wording, plain-language explanations of the (human-owned) findings, and formats to template.
4. **QA-assist pass.** A second prompt runs a readability and consistency checklist: template compliance, undefined acronyms, internal inconsistencies in wording, missing standard sections, plain-language quality. It explicitly does **not** assess technical correctness and says so in its output.
5. **Engineer review (the accountable step).** The engineer confirms every technical statement is theirs and unchanged, checks the AI has not drifted into implying a technical judgement, and accepts or rejects each suggestion. Ownership sits here.
6. **Discipline-lead review.** The firm's existing review, now able to focus cleanly on technical correctness because structure and clarity are already sound.
7. **Issue.** The engineer signs. The output is theirs, exactly as it would be without AI, produced faster.

## Guardrails (the strictest in the model)

- **Numbers and conclusions are immutable to the AI.** The prompt fixes all technical content; Claude is instructed never to change, recompute, verify or opine on it. The QA pass is checklist-only and declares its own scope.
- **No verification language.** The AI must never state or imply that anything "meets," "complies with," "satisfies" or "is verified against" any code or standard. Those are human judgements and registered-engineer statements only.
- **Every technical statement is confirmed by the owning engineer** before issue. The review step is mandatory and non-delegable.
- **Provenance note** records that AI assisted with structure and language only, so the firm can always answer how the report was produced.
- **In-tenant only.** All content stays in Claude Team.

## Why this is the hero of the whole model

Because it is the proof. It shows technical staff, in a workflow they own, that the firm is not asking them to trust a machine with their signature. It takes the drafting and formatting drudgery off their desks and leaves every gram of professional judgement exactly where it belongs. When the most cautious engineers see their own reports produced faster with the assurance line visibly intact, the argument about AI at Vertex is over.

## Scenario time model (see `before_after_comparison.md`)

Technical report drafting and QA is the largest saving in the model, roughly 690 hours a year, entirely from drafting, structuring, formatting and QA-assist, none from the technical work itself, at a 25-33% cycle-time reduction on the drafting-and-QA portion. Figures are scenario estimates under stated assumptions.
