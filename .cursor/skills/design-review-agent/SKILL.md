---
name: design-review-agent
description: Runs end-to-end UI design reviews for this portfolio by starting the dev server, opening pages in a browser, capturing screenshots, and producing severity-ranked visual/content feedback with concrete code-level fixes. Use when the user asks for design review, UI critique, visual QA, screenshot-based feedback, alignment to design vision/language, or asks for UI/CSS/layout changes where proactive review should be orchestrated.
---

# Design Review Agent

## Purpose

Run a practical design review loop for this portfolio: launch app, capture screenshots across viewports, and return actionable UI feedback tied to design vision and language.

## Inputs

Collect these before reviewing:

- Routes to review (default: `/`)
- Design language source (default: `docs/DESIGN_LANGUAGE.md`)
- Design vision (keywords/intent; example: minimal, high-signal, premium, fast)
- Language/tone rules (default from `src/content/data.js`: technical, direct, low-fluff, outcome-first)
- Optional constraints (brand colors, typography rules, components to ignore)

If design vision/language is missing, infer from `docs/DESIGN_LANGUAGE.md`, `src/content/data.js`, and current UI, then state assumptions explicitly before findings.

## Proactive Orchestration

Default to proactive mode for UI work.

- Auto-trigger this workflow when the request implies visual changes, including terms like `UI`, `design`, `layout`, `CSS`, `spacing`, `responsive`, `typography`, `header`, `hero`, `card`, `theme`, `color`, `polish`, `looks off`.
- Do not wait for a second prompt to run screenshots/review unless the user explicitly says `skip review`, `no screenshots`, or `just patch code`.
- If the task includes implementing UI changes, run a two-pass loop:
  1. Baseline capture (before edits)
  2. Post-change capture + delta review
- If route is not provided, infer from changed components and default to `/`.
- When context is ambiguous, run minimum-safe scope (`/`, desktop + mobile) instead of asking blocking questions.

## Execution Workflow

1. **Start the app**
   - Avoid duplicate servers if one is already running.
   - Start with `npm run dev`.
   - Capture the served URL (usually `http://localhost:5173`).

2. **Browse and capture**
   - Visit each target route.
   - Capture screenshots at these widths:
     - Mobile: `390x844`
     - Tablet: `768x1024`
     - Laptop: `1280x800`
     - Desktop: `1440x900`
   - Capture both:
     - Full page
     - Above-the-fold hero viewport

3. **Evaluate against vision + language**
   - Check visual hierarchy (primary CTA/heading dominance, scan path clarity).
   - Check spacing rhythm and alignment consistency.
   - Check typography scale/readability and line length.
   - Check color/contrast consistency and emphasis usage.
   - Check interaction polish (hover/focus/active states, motion restraint).
   - Check responsive behavior (layout breaks, overflow, awkward wraps).
   - Check language fit:
     - Copy remains technical/direct (not fluffy).
     - Claims are concrete and credible.
     - Headlines/summaries are concise and outcome-focused.

4. **Map issues to concrete fixes**
   - For each issue, include exact target:
     - File path
     - Selector/component
     - Minimal patch snippet
   - Prefer smallest high-impact changes first.

## Output Format

Use this exact structure:

````markdown
## Review Context
- Routes: <...>
- Design vision: <...>
- Language rules: <...>
- Assumptions: <...>

## Orchestration Log
- Trigger reason: <why proactive flow started>
- Server: <reused|started> <url>
- Captures: <route x viewport matrix>
- Pass type: <review-only|baseline+post-change>

## Findings
- [D0|D1|D2|D3] <short issue title>
  - Evidence: <route + viewport + screenshot note>
  - Why it breaks vision/language: <specific mismatch>
  - Fix target: `<file>` / `<selector-or-component>`
  - Patch:
    ```css
    /* or jsx */
    ```
  - Expected outcome: <user-visible result>

## Quick Wins (Top 3)
- <highest ROI change 1>
- <highest ROI change 2>
- <highest ROI change 3>

## Optional Next Pass
- <what to validate after fixes>
````

## Severity Scale

- `D0`: Critical visual/content break harming comprehension or trust.
- `D1`: Strong mismatch with design vision; noticeably hurts quality.
- `D2`: Clear improvement opportunity; moderate quality impact.
- `D3`: Polish-level refinement.

## Guardrails

- Do not give generic advice; every finding needs evidence + exact fix target.
- Do not propose full rewrites when a local fix solves it.
- Keep tone blunt, technical, and concise.
- If screenshots do not load or server fails, report failure point and exact retry command.
