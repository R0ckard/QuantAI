# Discovery Summary & AI Maturity Assessment

*BrightPath Financial Services. Findings below are constructed from the brief to demonstrate the method, not from live interviews.*

## 1. Method (as scoped)

A real engagement would run a kickoff, a document review, and discovery workshops with leadership and one representative per department (Advice, Client Services, Finance, Marketing, IT & Risk). This demonstration reconstructs the likely findings from the brief so the rest of the operating system has something concrete to design against.

## 2. Where BrightPath is today

BrightPath has grown from 8 to 32 people in four years. Process has been outpaced by headcount: advisers and client-services staff already use Claude Team and ChatGPT Team daily, but each person has invented their own way of doing it. The result is not "no AI", it is **uneven, ungoverned AI**, which is a harder problem because it carries risk without yet delivering leverage.

Five themes came out of the (reconstructed) discovery:

**Repeated drafting from scratch.** Client emails and advice documents are re-written each time rather than started from a firm-standard base. The same Statement-of-Advice sections are rebuilt weekly by different people.

**Inconsistent meeting capture.** Notes and follow-up actions depend on who was in the room; actions get lost between the meeting and the CRM.

**Dispersed knowledge.** Templates, prior advice, and "how we say things" live across SharePoint, Dropbox and individual inboxes. New staff can't find the good version.

**Prompt divergence.** Advisers use different prompts for the same task, so quality and tone vary and nothing improves cumulatively.

**Two populations, one risk.** Some staff avoid AI (leaving productivity on the table); others use it enthusiastically **without agreed safeguards**, pasting client-identifying information into tools without checking data settings, and shipping AI text without a documented review step. In a licensed advice business that is the material risk.

There is **no baseline** for adoption, quality or time saved, so the firm cannot yet tell whether AI is helping.

## 3. AI maturity assessment

Scored on a simple 1-5 scale across six dimensions (1 = ad hoc, 5 = optimised). Scores are an illustrative baseline for this scenario.

| Dimension | Score (of 5) | Evidence | Target (90 days) |
|---|---|---|---|
| **Strategy & prioritisation** | 2 | AI used opportunistically; no ranked opportunity list | 3 |
| **Workflows & standards** | 1 | Every adviser has a private method | 3 |
| **Tooling & configuration** | 2 | Claude/ChatGPT Team licensed but unconfigured (no Projects, no shared prompts) | 4 |
| **Governance & data handling** | 1 | No acceptable-use rule; client data pasted without checks | 3 |
| **Knowledge & reuse** | 2 | Good material exists but is dispersed and un-versioned | 3 |
| **Adoption & capability** | 2 | Bimodal, champions vs avoiders; no training | 4 |
| **Measurement** | 1 | No baseline for time, quality or adoption | 3 |

**Weighted maturity: ~1.6 / 5, "Emerging."** The firm has tools and appetite but no operating system around them. The highest-leverage moves are not more tools; they are **standards, configuration and governance** on the tools already owned.

## 4. Constraints that shape the design

- **Regulated output.** Advice documents and anything that could be construed as personal advice must stay under qualified human review (best-interests duty). The design must make the human-review step explicit and unavoidable, not optional.
- **Microsoft + Claude/ChatGPT stack.** Solutions must sit on M365 (Outlook/Teams/SharePoint), HubSpot, Xero, Adobe Sign, Dropbox and the two AI Team products already licensed. No custom development (per exclusions).
- **Small firm, no platform team.** Whatever is built must be maintainable by an AI Champion, not an engineer.

## 5. Implication

Design a **lightweight operating system** that (a) standardises the highest-frequency workflows, (b) configures the existing AI tools so the standard is the path of least resistance, and (c) wraps both in governance that a 32-person firm will actually follow. That is what the rest of this repository specifies, proven out on two pilots.
