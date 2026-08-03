# Vertex Engineering: AI Ways of Working

*The one-page firm playbook. If you read nothing else, read this.*

This is how everyone at Vertex uses AI: the same principle, the same bright line, the same tool rules, whatever your role. It is deliberately short. The detail sits in the `docs/` folder; this is the part everyone carries in their head.

## The principle

> AI assists. A qualified professional decides and signs. Every improvement is captured once and reused by the firm.

If a use of AI cannot keep a named human in charge of the output, it does not happen here.

## The bright line (engineering)

AI at Vertex **never** performs, checks, verifies or certifies engineering design or calculations, and never states that anything meets or complies with a code or standard. A qualified, registered engineer owns all of that, unaided by AI on the technical content. AI helps with the words and admin around finished, human-owned technical work. This line is not negotiable and not a matter of judgement.

## Which tool (the ten-second version)

- **Copilot** for work inside your Microsoft files, email and meetings.
- **Claude** for careful drafting, structure and review of long or important documents.
- **ChatGPT** for open-ended thinking, research framing and quick generation.
- **Unsure, or it is confidential?** Enterprise tier only, and if still unsure, ask an AI Champion. Full rules in `docs/04_tool_selection_and_approved_use.md`.

## Confidentiality (always)

Client names, project detail, commercial terms and personal information go **only** into the firm's approved enterprise tools (Copilot in the tenant, ChatGPT Enterprise, Claude Team). Never a personal or free account. Share the least you need to. When in doubt, treat it as sensitive.

## The three workflows we have made standard

- **Proposals and bids** (Claude): draft from a structured bid brief and the reuse library; you own the win strategy and every claim.
- **Technical report drafting and QA** (Claude): AI drafts structure and prose around your fixed, human-owned technical content; you confirm and sign.
- **Project status reporting** (Copilot): draft the update from project data; you own the honest RAG status and the risks.

Prompts and setup are in `prompts/` and `claude-project/`.

## Your five habits

1. **Check the tool.** Ten-second rule, or ask.
2. **Keep it in-tenant.** Enterprise tools only for anything real.
3. **Own the output.** You review, you decide, you sign. AI never does.
4. **Respect the bright line.** Never AI for design, calc, verification or certification.
5. **Capture what works.** Good new phrasing goes back to the reuse library so the firm gets better, not just you.

## If something goes wrong

Notice it, stop, and flag it to an AI Champion or the governance forum. Honest, early flagging is good professional practice and is treated that way. See the incident path in `docs/05_governance_and_assurance.md`.

## Who to ask

Your role-family **AI Champion** is your first port of call for "which tool, is this okay, how do I." The **governance forum** owns the rules and keeps them current. You are never expected to work this out alone.
