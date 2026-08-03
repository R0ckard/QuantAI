# The AI Operating Model, Current and Target

*Vertex Engineering. One page: the whole model.*

An "AI operating model" is not software. It is the small set of decisions, standards and roles that make good AI use the default across the firm, so value stops depending on which individual you ask and which tool they happen to prefer.

## Current state, in one picture

Three capable platforms, used privately and inconsistently, with nothing joining them up:

```
   Copilot        Claude Team      ChatGPT Enterprise
      |                |                   |
   (used by habit, no decision rules, no shared workflows,
    no governance, no measurement, knowledge trapped in folders)
      |                |                   |
   individual      individual          individual
   effort          effort              effort
```

Everyone is on their own. Effort is duplicated, quality is uneven, and leadership cannot see or steer any of it.

## Target state: four layers

The target model has four layers. Each answers one question.

```
        +----------------------------------------------------------+
  WHY   |  1. GOVERNANCE & ASSURANCE   accountable human review ·  |
        |                              what AI must not do ·       |
        |                              confidentiality             |
        +----------------------------------------------------------+
  WHICH |  2. TOOL SELECTION           which AI for which task ·   |
        |                              approved-use rules for the  |
        |                              three platforms             |
        +----------------------------------------------------------+
  WHAT  |  3. WORKFLOWS & STANDARDS    firm-standard workflows ·   |
        |                              prompt library · reusable   |
        |                              knowledge                    |
        +----------------------------------------------------------+
  WHO   |  4. CAPABILITY & PEOPLE      role-family capability      |
        |                              matrix · AI Champions ·     |
        |                              learning · measurement       |
        +----------------------------------------------------------+
```

**Layer 1, Governance and assurance.** One clear rule set: what a qualified human must own, what AI must never do (design, calculate, verify, certify), how confidential and client data is handled, and a light governance forum that steers. In an engineering firm this layer sits on top because professional accountability is the constraint everything else respects. See `05_governance_and_assurance.md`.

**Layer 2, Tool selection.** The piece Vertex is missing most: clear decision rules for which of the three platforms to use for which kind of task, and where each is approved. This turns three overlapping licences into a deliberate toolkit. See `04_tool_selection_and_approved_use.md`.

**Layer 3, Workflows and standards.** For each priority workflow, one agreed way of working: where AI drafts, where a qualified human reviews and signs, and the shared prompts and reusable content that stop knowledge being trapped. Built out here on three prototypes.

**Layer 4, Capability and people.** A role-family capability matrix (what "good AI use" means for an engineer, a project manager, a proposals lead, a finance or people-operations person), an AI Champions network, a learning pathway, and a simple measurement baseline. See `06_capability_matrix_and_champions.md`.

## The operating principle across all four layers

> AI assists. A qualified professional decides and signs. Every improvement is captured once and reused by the firm.

That single sentence is the test for any new use of AI at Vertex. If it cannot preserve professional accountability and shared reuse, it does not go into the operating model.

## Role families

The firm's work is grouped into five role families, so guidance can be written once per family rather than per person:

- **Engineering delivery**, technical reports, calculations, design documentation, reviews.
- **Business development**, proposals, bids, capability statements.
- **Project management**, status reporting, programmes, actions, client updates.
- **Finance**, forecasting, invoicing narratives, management reporting.
- **People and operations**, recruitment, internal comms, policy and process.

Each family gets a line in the capability matrix and a home in the tool-selection rules. The three prototypes deliberately span the highest-value families.

## What "done" looks like (success criteria, from the brief)

A target operating model and governance structure approved by the Executive Team; ten workflows with documented owners, controls, measures and implementation paths; three prototypes showing at least 15% cycle-time improvement without unacceptable quality loss; an adoption and benefits baseline; and AI Champions appointed with the first 90 days resourced. The three prototypes in this repository are built to clear the 15% bar on the scenario assumptions in `before_after_comparison.md`.
