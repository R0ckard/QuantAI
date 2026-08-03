---
title: "Standard Operating Procedure, AI-Assisted Job-Ad Drafting"
---

# SOP, AI-Assisted Job-Ad Drafting

**FutureHire Recruitment**
Document owner: Recruitment Director · Maintained by: Job-Ad AI Champion
Version: 1.0 · Review cycle: quarterly

> **Demonstration SOP.** Not legal advice; a real deployment would confirm inclusive-language and advertising standards with the firm's advisers.

## 1. Purpose

To produce consistent, on-brand, **inclusive** job ads quickly from a short intake, with an inclusive-language check applied every time.

## 2. Scope

Applies to recruiters drafting job ads. Does not authorise posting AI text without recruiter review.

## 3. Roles

| Role | Responsibility |
|---|---|
| Recruiter | Supplies intake; reviews inclusive-language flags; posts |
| Job-Ad AI Champion | Maintains the Project, brand voice, inclusive-language reference |
| Recruitment Director | Owns this SOP and brand/service standards |

## 4. Prerequisites

- Access to the `FutureHire, Job Ads` Claude Project (approved Team tool).
- The role intake captured (role, must-haves vs nice-to-haves, package range, location/work model, selling points).

## 5. Procedure

1. **Capture the intake** with the client, keeping the requirements list tight.
2. **Draft**, run the `job-ad-draft` prompt with the intake; the output includes an inclusive-language pass.
3. **Review inclusive-language flags**, resolve each flagged phrase or unnecessary requirement; the goal is the widest suitable applicant pool.
4. **Verify facts**, confirm salary range and role details; resolve any `[[CONFIRM]]` markers.
5. **Personalise & post**, adjust to sound human, then post; stamp the ad version on the Bullhorn Job record.

## 6. The human-review gate (must not be skipped)

No ad is posted without recruiter review of facts and inclusive-language flags. If the tool is unavailable, draft manually to the same standard.

## 7. Fairness standard

Every ad is checked for gendered, ageist, ableist or culturally exclusionary language and for "requirements" that unnecessarily narrow the pool. This is a fairness control, not an optional extra.

## 8. Exceptions & escalation

- Missing role facts → `[[CONFIRM]]`, don't invent.
- Recurrent exclusionary phrasing from a source brief → flag to the Recruitment Director.

## 9. Records & version control

| Version | Date | Change | Author |
|---|---|---|---|
| 1.0 | 2026 | Initial SOP | QuantAI (portfolio) |
