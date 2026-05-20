# Agent rules — scraper-skeletons

Project-specific guidance for Claude Code (and any other coding agent) working in this repo.

## Critical: Next.js version

**This is NOT the Next.js you know.** Next 16 has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code. Heed deprecation notices.

## Domain rules

Detailed conventions live in [`.claude/rules/`](.claude/rules/) so each domain can evolve without churning a single mega-file:

- [`vertical-conventions.md`](.claude/rules/vertical-conventions.md) — how verticals are structured, the dispatcher, section composition, what goes in shared components vs. per-vertical data.
- [`theming.md`](.claude/rules/theming.md) — the 7-role semantic token model, per-vertical palette pattern, what not to do with brand colors.
- [`dashboard-sync.md`](.claude/rules/dashboard-sync.md) — sheet schema duplication policy with scraper-dashboard, the currently-owed mirror, when to escalate beyond duplication.
- [`screenshot-loop.md`](.claude/rules/screenshot-loop.md) — verify-loop pattern for visual/UI work.

Read the rule that applies before working in its domain. Adding a new rule is preferred to extending an unrelated one.

## When you make the same mistake twice

Codify the correction into the relevant `.claude/rules/<file>.md`. One-off corrections don't earn rules; recurring ones do. See the user-memory rule [[feedback-rule-on-repeat-mistakes]] for the policy.

## Skills and subagents

- [`.claude/skills/`](.claude/skills/) — task-flavored checklists Claude can invoke (e.g. `add-vertical`, `sync-dashboard-schema`).
- [`.claude/agents/`](.claude/agents/) — subagent specs (e.g. `code-reviewer`, `vertical-check`).
