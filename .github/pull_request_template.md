## What

<!-- One or two sentences describing the change. -->

## Why

<!-- Link to the backlog item, issue, or prospect this serves. -->

## Checklist

Tick the ones that apply. Be honest — empty boxes are fine if the category doesn't apply to this PR.

- [ ] CI is green (lint + typecheck + build)
- [ ] If this changes a **vertical** or adds a new one, I followed [`.claude/rules/vertical-conventions.md`](.claude/rules/vertical-conventions.md)
- [ ] If this changes **colors or `globals.css`**, I followed [`.claude/rules/theming.md`](.claude/rules/theming.md) (all 7 brand tokens defined; no hardcoded colors in section components)
- [ ] If this changes the **Lead schema**, I followed [`.claude/rules/dashboard-sync.md`](.claude/rules/dashboard-sync.md) (mirrored to scraper-dashboard + the Sheet, or tracked as an issue)
- [ ] If this is a **visual change**, I ran a screenshot loop per [`.claude/rules/screenshot-loop.md`](.claude/rules/screenshot-loop.md) and the result matches the intended target
- [ ] If this adds a new vertical, the **fixture lead** in `src/fixtures/leads.sample.ts` is included so offline dev works
- [ ] No `console.log`, no new `any` types, no unowned `// TODO`s

## Screenshots

<!-- For visual changes, paste before/after screenshots. -->

## Notes for reviewer

<!-- Anything specific you want a second pair of eyes on. -->
