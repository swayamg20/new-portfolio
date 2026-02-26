# Design Language

This document defines the visual and content system for the portfolio.

## Brand Intent

- Calm, premium, and technical.
- High signal density with low visual noise.
- Minimal motion and deliberate emphasis.

## Visual Principles

- Strong hierarchy: title first, summary second, metadata third.
- Spacious but tight rhythm: avoid random gaps.
- Editorial layout over app-dashboard layout.
- Use contrast for meaning, not decoration.

## Tone and Copy System

- Voice: technical, direct, low-fluff.
- Prefer outcome-first statements over feature-first statements.
- Keep claims concrete and credible.
- Avoid exaggerated adjectives unless backed by data.

## Typography

- Display/headings: serif (`--heading-font`) for editorial character.
- Meta/navigation: monospace (`.mono`) for structure and scanability.
- Body: system sans with comfortable line-height.

## Color and Surface

- Background: warm neutral gradients.
- Text:
  - Primary: deep near-black.
  - Secondary: softer neutral alpha.
- Surfaces: subtle translucency, low-contrast borders.
- Accent usage is restrained and reserved for calls-to-action.

## Spacing Rhythm

- Section boundaries are explicit with divider lines.
- Internal spacing should follow small-step increments.
- Cards and rows keep compact vertical density.

## Interaction

- Hover/focus feedback should be visible but subtle.
- Motion durations should stay short and non-distracting.
- Focus states must remain keyboard-visible.

## Component Behavior

- Hero carries first impression and should not be crowded.
- Project rows prioritize title + summary; meta stays peripheral.
- Article rows should remain scannable in two lines before expansion.
- Contact cards remain simple and utility-first.

## Responsive Rules

- Mobile keeps single-column flow with preserved hierarchy.
- Avoid wrapping patterns that break semantic grouping.
- Preserve CTA visibility above fold where possible.

## Article Content Format

Articles should be authored in markdown under `src/content/articles/`.

Each article requires frontmatter:

- `title`
- `date`
- `readTime`
- `summary`
- `coverImage` (optional but recommended)
- `draft` (optional)

Body supports:

- `##` headings
- `###` subheadings
- images
- links
- lists
- tables
- fenced code blocks

Editorial article style should use:

- hero label + strong longform title + optional subtitle
- lead paragraph opening
- numbered section headers (`01`, `02`, ...)
- pull quotes, insight boxes, and dividers for pacing
- optional inline SVG illustration blocks
- closing note with tags

Typography restriction:

- Use only `Signifier` and `IBM Plex Mono`.

## Design Review Contract

Any design review should evaluate:

- hierarchy
- spacing rhythm
- typography fit
- responsive integrity
- copy-language fit with this document

All findings should include exact file targets and patch-level fixes.
