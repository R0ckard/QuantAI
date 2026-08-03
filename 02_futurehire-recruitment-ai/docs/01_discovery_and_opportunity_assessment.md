# Discovery Summary & Opportunity Assessment

*FutureHire Recruitment. Findings are constructed from the brief to demonstrate the method, not from live interviews.*

## 1. Method (as scoped)

A real engagement would interview recruiters, team leaders and operations staff, review the end-to-end permanent-placement workflow (job intake → placement → early follow-up), and baseline where recruiter time actually goes. This demonstration reconstructs the likely findings from the brief so the rest of the solution has something concrete to design against.

## 2. Where FutureHire is today

FutureHire has grown quickly, but **recruiter productivity has plateaued**, not for lack of effort, but because admin has crept up to fill the day. Consultants report spending more time updating Bullhorn and drafting routine material than talking to candidates and hiring managers. Critically, a *previous* automation push failed: tools were introduced without redesigning the workflow or supporting adoption, so staff now **distrust automation** and keep private workarounds. That trust deficit is as important a finding as the time cost, it shapes how this solution must be introduced.

Five themes:

**Manual drafting, every time.** Candidate emails, job ads and hiring-manager updates are written from scratch. Job ads in particular are inconsistent and need heavy editing before they go live.

**Interview capture is a lottery.** Notes vary wildly in structure and quality by recruiter, which makes candidate summaries hard to reuse and weakens the shortlist story told to clients.

**Rekeying between systems.** The same information is copied between email, notes and Bullhorn, pure duplicated effort and a source of errors.

**Scheduling and follow-up drag.** Coordinating interviews and chasing follow-ups eats recruiter time that should go to relationships.

**Knowledge walks out the door.** When an experienced recruiter leaves, their judgement and their best phrasings leave with them; nothing is captured for reuse.

## 3. What the pattern tells us

The time is being lost in **high-frequency, low-judgement drafting and documentation**, exactly the work AI assists well, *if* the workflow is redesigned around it and recruiters trust it. The three workflows the brief names for prototyping (job-ad drafting, interview summarisation, hiring-manager updates) are precisely the biggest, most repeated drains, and all three produce a firm-standard artefact that today is reinvented every time. They are the right pilots.

## 4. Constraints that shape the design

- **Fairness is non-negotiable.** Anything touching candidates must be free of bias and must never screen, rank or decide. This is both an ethical and a legal constraint (anti-discrimination, and candidate privacy under the Privacy Act / APPs). The design makes the recruiter the decision-maker and the AI a drafting assistant only.
- **Adoption is the real risk, not technology.** Because staff distrust past automation, the solution must be visibly *recruiter-controlled*, easy, and better than their workaround on day one, or it won't be used. A six-person pilot and AI Champions are the trust-building mechanism.
- **Work within the stack.** Bullhorn ATS/CRM, LinkedIn Recruiter, Teams/Outlook, Calendly, Typeform, and the two AI Team products already licensed. Bullhorn changes are **configuration recommendations only** (no custom API build); no LinkedIn scraping.

## 5. Implication

Redesign the three highest-drain workflows around a **recruiter-in-control AI assistant**, give recruiters shared prompts and templates so quality stops depending on who's at the desk, wrap it in fairness-and-privacy governance, and introduce it through a pilot that earns back trust. That is what the rest of this repository specifies, built out on the three pilots.
