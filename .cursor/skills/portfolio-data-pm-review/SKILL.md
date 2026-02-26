---
name: portfolio-data-pm-review
description: Reviews portfolio content data with a product-manager lens and proposes concrete rewrites. Use when the user asks to review or improve portfolio data, content entries, section copy, project blurbs, article metadata, or text in src/content/data.js.
---

# Portfolio Data PM Review

## Purpose

Review only portfolio data content and return concrete improvements like a strong product manager: sharp positioning, clear user value, credible evidence, and concise copy.

## Scope Guardrails

- In scope: textual/value data in `src/content/data.js` (for example `hero`, `sections`, `articles`, `contactInfo`, `siteMeta`).
- Out of scope: styling, layout, component architecture, animations, build config, infra.
- If the request includes non-data code, ignore it unless it directly blocks data quality feedback.

## Review Workflow

1. Read the data source first (`src/content/data.js`, and any additional data files explicitly mentioned by the user).
2. Evaluate each section with this PM rubric:
   - Positioning clarity: does the copy clearly say what this person/product does?
   - User value: does each item explain outcomes, not just implementation?
   - Proof and credibility: are metrics/specificity present where needed?
   - Prioritization: are strongest projects and claims easy to scan first?
   - Consistency: tone, tense, naming, and detail level are coherent.
   - Decision readiness: if I were hiring/scouting quickly, is this enough to decide?
3. Flag issues by severity:
   - `P0`: unclear or credibility-damaging
   - `P1`: weak positioning or low-conviction copy
   - `P2`: polish and consistency improvements
4. For every issue, provide an exact fix:
   - precise field path
   - why it matters
   - replacement text (ready to paste)

## Output Format

Use this exact structure:

````markdown
## Findings
- [P0|P1|P2] <field-path> - <issue>
  - Why: <PM rationale focused on user/hiring decision impact>
  - Replace with: "<exact rewritten value>"

## Improved Snippets
```js
// minimal patch-style snippet(s) only for changed fields
```

## Quick Wins
- <1-3 highest ROI edits to do first>
````

## Writing Rules

- Be concrete, not generic.
- Prefer measurable language and outcomes over vague adjectives.
- Keep rewrites terse and scannable.
- Do not invent fake metrics; if evidence is missing, suggest wording that stays honest.
- Preserve the user's voice: technical, direct, low-fluff.
- Do not rewrite untouched sections unnecessarily.

## Examples of Good Feedback

- Good: "`sections[0].items[1].summary` is feature-led; outcome is hidden. Replace with outcome-first copy."
- Bad: "Could be better and more impactful."
