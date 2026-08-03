# Executive Dashboard Specification

*Vertex Engineering. The one page the Executive Team was missing: is AI adopted, is it paying off, is it safe.*

Today leadership cannot see or steer AI use. This spec defines a single dashboard that answers the three questions an executive actually has, on four numbers that are few enough to maintain and honest enough to trust. It is deliberately not a analytics platform. It is a page the governance forum updates monthly from the adoption log and the licence admin consoles.

## The three questions, four measures

**Is it being adopted?**

- **Active adoption rate.** Share of staff, per role family, who have completed baseline training and use an approved workflow at least weekly. Target trajectory: baseline by day 30, 60% of pilot families by day 90, firm-wide majority by 12 months. Source: the adoption log plus a light monthly self-report, owned by the AI Champions.

**Is it paying off?**

- **Cycle-time improvement on the pilots.** Measured before/after time on the three pilot workflows, against the 15% bar. This is the headline benefit measure because it is directly measurable and does not depend on rate or volume assumptions. Source: the Adoption log sheet in the benefits tracker (real actuals replacing scenario estimates).
- **Licence value.** Active users per platform against licences held, so managers can finally justify, reallocate or reclaim spend. Source: the Copilot, ChatGPT Enterprise and Claude Team admin consoles. This is the measure that answers the "spend disconnected from benefit" problem directly.

**Is it safe?**

- **Assurance health.** Incidents logged and closed, and time-to-close, from the governance forum's incident log. Low is good; a persistent zero usually means under-reporting rather than perfection, so the forum reads it alongside adoption. Source: the incident log in `05_governance_and_assurance.md`.

## Layout (one page)

```
  +---------------------------------------------------------------+
  |  VERTEX AI OPERATING MODEL  ·  Executive Dashboard  ·  [month] |
  +---------------------------------------------------------------+
  |  ADOPTED?              PAYING OFF?            SAFE?            |
  |  Active adoption       Pilot cycle-time       Assurance health |
  |  [ 58% ]               [ +29% avg vs 15% bar] [ 2 open · 5d ]  |
  |  by family: bar        by pilot: bar vs bar   incidents trend  |
  +---------------------------------------------------------------+
  |  LICENCE VALUE                                                |
  |  Copilot  84% active  |  ChatGPT  61%  |  Claude Team  47%    |
  |  (active users / licences held, this month)                   |
  +---------------------------------------------------------------+
  |  THIS MONTH: 2-3 lines from the governance forum:            |
  |  what moved, what needs a decision, what is next.            |
  +---------------------------------------------------------------+
```

The numbers in the sketch are illustrative placeholders, not results.

## Design rules

- **Four measures, not forty.** Every measure here answers an executive question. If a metric does not change a decision, it does not go on the page.
- **Honest by construction.** Cycle-time is the headline because it is measurable; the dollar figure lives in the benefits tracker as context, not on the executive page as a headline, so the dashboard never over-claims.
- **Traffic-light restraint.** Status is shown against the 15% bar and adoption trajectory, in the brand's restrained palette, not loud red-amber-green everywhere. The point is steer-ability, not alarm.
- **One owner, monthly cadence.** The governance forum owns the page and updates it monthly for the first six months, then quarterly. It takes minutes because the sources (adoption log, admin consoles, incident log) already exist.

## How it connects to everything else

The dashboard is the top of the measurement layer in `06_capability_matrix_and_champions.md`. It reads from the benefits tracker (`tools/benefits_tracker.py` output), the licence admin consoles, and the governance incident log. Nothing on it is a new data-collection burden; it is a monthly readout of records the operating model already keeps. That is what makes it sustainable, and sustainability is what makes leadership able to steer AI at Vertex instead of guessing.

*Targets and any figures shown are scenario placeholders under stated assumptions.*
