# The BrightPath AI Operating System, Overview

*One page: the whole model.*

An "AI operating system" here is not software. It is the small set of **standards, configured tools, and rules** that make good AI use the default way work gets done, so quality stops depending on which adviser you ask.

It has four layers. Each layer answers one question.

```
        ┌──────────────────────────────────────────────────────────┐
  WHY   │  1. GOVERNANCE      Acceptable use · human-review gates · │
        │                     data handling · what AI must NOT do   │
        ├──────────────────────────────────────────────────────────┤
  WHAT  │  2. WORKFLOW         Firm-standard steps per workflow ·    │
        │     STANDARDS        where AI helps · where a human signs  │
        ├──────────────────────────────────────────────────────────┤
  HOW   │  3. CONFIGURED       Claude Projects · shared prompt       │
        │     TOOLS            library · knowledge in the right place│
        ├──────────────────────────────────────────────────────────┤
  WHO   │  4. PEOPLE           Role playbooks · AI Champions ·       │
        │                      training · measurement                │
        └──────────────────────────────────────────────────────────┘
```

## Layer 1, Governance (the guardrails)

One short **AI Acceptable-Use & Human-Review Framework** everyone signs: what data may and may not go into which tool, the mandatory human-review gate on anything client-facing or regulated, and a red-line list. Governance sits on top because in a licensed advice firm it is the constraint every other layer must respect. (See `04_governance_acceptable_use.md`.)

## Layer 2, Workflow standards (the method)

For each priority workflow, one agreed sequence: the steps, the point where AI produces a draft, and the point where a named human reviews and owns it. Documented as an **SOP** and a **before/after** map so the change is legible. Built out here for the two pilots.

## Layer 3, Configured tools (the path of least resistance)

The firm already owns Claude Team and ChatGPT Team. The leverage is in **configuration, not new purchases**:

- **Claude Projects** per workflow, each carrying firm-standard instructions and the relevant knowledge (templates, tone, disclaimers), so every adviser starts from the same base.
- A **shared, versioned prompt library** with quality checks, so improvements compound instead of staying private.
- **Knowledge in the right place**, the good templates and examples attached to the Project, not buried in someone's Dropbox.

The design principle: *make the compliant, high-quality path the easiest path.* If the standard route is faster than freelancing a prompt, people use it.

## Layer 4, People (adoption)

Role-based **playbooks** (what AI does and doesn't do in your job), an **AI Champion** per department who owns the local prompts and answers questions, **training**, and a simple **measurement** baseline (time, adoption, quality-review pass rate) so the firm can see whether it's working.

## The operating principle across all four layers

> **AI drafts. A qualified human decides. Every improvement is captured once and reused by everyone.**

That single sentence is the test for any new workflow: if it can't preserve human accountability and shared reuse, it doesn't go in the operating system.

## What "done" looks like (success criteria, from the brief)

Six workflows documented and owner-approved; two pilots showing ≥20% cycle-time improvement in controlled testing; all nominated staff trained; an AI Champion per department; governance and 90-day measures approved by the Steering Group. The two pilots in this repository are built to clear the ≥20% bar on the scenario assumptions in `before_after_comparison.md`.
