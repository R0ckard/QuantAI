# Bullhorn Field & Handoff Recommendations

*Configuration recommendations only, no custom API development (per the brief's exclusions). These reduce the rekeying that eats recruiter time and make the AI-assisted workflows fit cleanly into the ATS.*

The biggest hidden cost surfaced in discovery is **rekeying**, the same information copied between email, notes and Bullhorn. These recommendations reduce that friction using Bullhorn configuration the agency already controls.

## 1. Structured fields to add / standardise

| Field | On | Why |
|---|---|---|
| **Interview summary** (long text) | Candidate / Submission | A home for the structured summary so it's reusable, not buried in notes |
| **Evidence tags** (multi-select: skills demonstrated) | Candidate | Job-relevant, searchable; avoids free-text-only records |
| **Ad status / version** | Job | Track which standard ad version was used; reduces re-drafting |
| **Update last-sent date** | Job / Client | Makes hiring-manager update cadence visible and reliable |
| **Consent flags** (contact / share-with-client) | Candidate | Operationalises confidentiality in client updates |

Keep additions minimal, every new field is a data-entry cost. Add only fields that remove more work than they create.

## 2. Note types & templates

Standardise a small set of **note types** aligned to the templates in `../templates/`: *Interview note*, *Client update sent*, *Candidate comms sent*. Consistent note types make records searchable and make the AI-assisted summaries drop straight into the right place.

## 3. Handoff points (where the workflows meet Bullhorn)

- **Job ad:** approved ad + version stamped on the Job record → single source of truth for reposting.
- **Interview summary:** recruiter pastes the reviewed summary into the Interview-summary field and tags evidence → reusable for shortlisting and client updates.
- **Hiring-manager update:** pipeline snapshot pulled *from* Bullhorn; update last-sent date written *back* → visible cadence.

## 4. What we explicitly did NOT do

- No custom Bullhorn API development (excluded).
- No automated writing to Bullhorn by the AI, the recruiter pastes reviewed content in, preserving the human gate and data control.
- No screening/ranking fields, the ATS is not used to automate candidate decisions.

## 5. Sequence

Configure the fields and note types **before** the pilot, so the pilot measures the real end-to-end workflow (including the paste-into-Bullhorn step), not just the drafting in isolation.
