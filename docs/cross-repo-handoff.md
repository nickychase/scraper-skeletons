# Cross-repo handoff: scraper-skeletons → scraper-dashboard

A paste-ready brief for applying the same team-workflow patterns to [`scraper-dashboard`](https://github.com/nickychase/scraper-dashboard). Generated 2026-05-19 from a Claude Code tutorial review + team scope-up.

**How to use:** In a fresh Claude Code session inside the scraper-dashboard repo, paste (or reference) this file with the prompt:

> Read `docs/cross-repo-handoff.md` from scraper-skeletons. Apply the same patterns here, adapted to this repo's structure. User-level changes are already done — only do repo-specific work here.

---

## What was done in scraper-skeletons (so you don't re-do it)

User-level (`~/.claude/`) — **already applied; don't touch from scraper-dashboard:**

- `~/.claude/CLAUDE.md` created with cross-project workflow tips (plan mode default, context hygiene, screenshot loop, skills > MCP, etc.)
- No global hooks added (chime hook explicitly declined).

Memory — **partially mirrored manually below; do not paste these as-is** because memory is project-scoped (each repo has its own `~/.claude/projects/<hash>/memory/`).

In scraper-skeletons, two new feedback memories were created that apply to both repos. The scraper-dashboard session should re-create equivalent entries in its own memory:

- **`feedback_screenshot_loop.md`** — for visual/UI work, screenshot the output and iterate against a target until match
- **`feedback_rule_on_repeat_mistakes.md`** — when making the same mistake 2× in a project, codify the correction into `.claude/rules/`

Recommended action in scraper-dashboard's session: create equivalent memory entries (same content, adjusted file paths). The text of both is reproduced at the bottom of this doc for copy-paste.

## What to apply in scraper-dashboard

Goal: bring scraper-dashboard up to the same team-workflow bar as scraper-skeletons. Each item below should be evaluated against scraper-dashboard's actual structure — don't blindly copy file paths.

### 1. Verify collaborator picture

Run `gh api repos/nickychase/scraper-dashboard/collaborators --jq '.[] | {login, permissions}'` to confirm who has push. If the team is the same 3 (or different), update the equivalent of [`collaborators.md`](../../../.claude/projects/-Users-nicholasstermer-Desktop-scraper-skeletons/memory/collaborators.md) in scraper-dashboard's memory.

### 2. CI workflow

Add `.github/workflows/ci.yml` running:

- `npm ci`
- `npm run lint` (or the lint command this repo uses)
- `npx tsc --noEmit` (typecheck)
- `npm run build` (if applicable; dashboards may have a build step distinct from the skeletons repo)

Trigger on `pull_request: { branches: [main] }` and `push: { branches: [main] }`. Name the job `ci` so the status check name is predictable.

**Surface any pre-existing lint or build errors** that surface only when CI is wired up. Fix them in the same PR — don't ship CI that fails on its first run.

### 3. PR template

`.github/pull_request_template.md` with a checklist tied to the rules that exist (or will exist) in scraper-dashboard. The scraper-skeletons version is checklist-style with rule-file links — mirror that pattern, swap out the rules.

### 4. CODEOWNERS

`/CODEOWNERS` auto-requesting `@nickychase` on shared surface. In scraper-dashboard, "shared surface" likely includes:

- `/src/lib/types/lead.ts` (the schema mirror anchor)
- Any sheets-client equivalent
- `/.github/`
- `/.claude/`
- `/AGENTS.md`, `/CLAUDE.md`, `/docs/`

Adapt to whatever the actual file layout is.

### 5. Branch protection on `main`

Option A (CI required, no review required, admins exempt). Set via:

```bash
gh api -X PUT repos/nickychase/scraper-dashboard/branches/main/protection --input - <<'EOF'
{
  "required_status_checks": { "strict": false, "contexts": ["ci"] },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
```

Enable **after** the first CI run on a PR registers the `ci` status check — otherwise the rule references a check name GitHub doesn't yet know about. The cleanest path: open the setup PR, wait for CI to pass, then enable protection.

### 6. Project-shared Claude permission allowlist

`.claude/settings.json` with a project-shared allowlist for read-only ops and safe build commands. Add `.claude/settings.local.json` to `.gitignore` if not already there.

Use scraper-skeletons' [`.claude/settings.json`](../../.claude/settings.json) as the template; adjust to the commands scraper-dashboard actually uses (it likely has different `npm run` scripts).

### 7. Split CLAUDE.md / AGENTS.md into `.claude/rules/`

If scraper-dashboard's `AGENTS.md` or `CLAUDE.md` is over ~300 lines or covers multiple domains, split it. Domain candidates likely specific to scraper-dashboard:

- `lead-schema.md` — the same duplication-policy story from the other side
- `sheets-client.md` — how the dashboard reads/writes the shared Sheet
- Whatever domain-specific patterns exist (auth, charts, design system, etc.)

Use scraper-skeletons' `.claude/rules/` as a structural template. Don't copy content; the content is project-specific.

The `dashboard-sync.md` rule in scraper-skeletons has a sibling section that should exist in scraper-dashboard, framed from this repo's perspective. The 9-field mirror is owed from the dashboard side as much as from the skeletons side.

### 8. Onboarding doc

`docs/<something>.md` walking a new contributor (Sid hasn't pushed in either repo yet — this is high-leverage now) through the equivalent of "add a vertical." For scraper-dashboard, the most common new-contributor task is probably "add a chart" or "add a lead-pipeline-stage page" — adapt to what's actually true.

### 9. Skills

For repeated tasks specific to scraper-dashboard, codify as skills under `.claude/skills/`. Likely candidates:

- A skill for `sync-with-skeletons` (the other side of `sync-dashboard-schema` in scraper-skeletons)
- A skill for any common dashboard task that's done >1×/quarter

Don't write skills speculatively — wait until the task has actually recurred at least once.

### 10. Subagents

`.claude/agents/code-reviewer.md` adapted to scraper-dashboard's conventions. The `vertical-check` subagent from scraper-skeletons is too specific to transfer; design scraper-dashboard's review subagents around whatever its high-leverage drift surfaces are (schema drift, design system drift, etc.).

## Decisions already made (don't re-decide)

These were settled during the scraper-skeletons scope and should carry over:

- **Branch protection policy: Option A** (CI required, no review required). At team-of-3 with a fast-moving portfolio project, mandatory review adds friction without proportionate safety. Revisit if the team grows past ~5 or a quality incident surfaces.
- **Per-developer Claude settings: `.local.json`, gitignored.** Project-shared settings: `settings.json`, committed.
- **Commit attribution: no `Co-Authored-By: Claude` trailer** on Nick's commits. This is a standing rule across every repo. The rule applies to Nick's commits only — Joshua and Sid sign their own commits however they prefer.
- **Sequencing: commit + PR first, branch protection second** (so the `ci` status check is known to GitHub when protection is enabled).

## Schema-mirror status (the existing backlog item)

scraper-skeletons memory tracks 9 optional polish fields on `Lead` that need to land in scraper-dashboard's `lead.ts` and the shared Sheet's headers. This handoff doesn't fix that — it just makes the workflow infrastructure ready for it.

When the mirror is actually paid down, the `.claude/skills/sync-dashboard-schema/SKILL.md` in scraper-skeletons codifies the step-by-step. Invoke it from either side; the steps are symmetric.

---

## Memory entries to recreate in scraper-dashboard's session

Memory is project-scoped, so these don't auto-transfer. The Claude session in scraper-dashboard should re-create equivalents.

### feedback_screenshot_loop.md (template)

```markdown
---
name: feedback-screenshot-loop
description: For visual/UI work, screenshot the output and iterate against a target until match. Don't ship visual changes without verifying them visually.
metadata:
  type: feedback
---

**For any visual or UI work, screenshot the result and iterate against a target before declaring done.** Type checks and tests verify code correctness; they don't verify that the rendered page looks right.

**Why:** Highest-ROI Claude Code workflow pattern. Without a verify loop, agents declare visual work "done" when code compiles, even if layout is broken. With the loop, output converges in 2–3 iterations.

**How to apply:**
- For dashboard UI: render the route locally, screenshot, compare to the design target, fix gaps, repeat.
- For purely backend changes (route handlers, types, sheet schema): no screenshot loop needed.
- Stop at 3–4 iterations — ask instead of guessing past that point.
```

### feedback_rule_on_repeat_mistakes.md (template)

```markdown
---
name: feedback-rule-on-repeat-mistakes
description: When Claude makes the same mistake twice in a project, write a durable rule into .claude/rules/ so future sessions don't repeat it.
metadata:
  type: feedback
---

**When you (Claude) make the same mistake twice in a project, codify the correction into the appropriate `.claude/rules/` file.** Don't just fix-and-forget — fix, then codify.

**Why:** Without codifying, every fresh session repeats the same mistake. Codifying converts one-off corrections into project knowledge that compounds — especially important with multiple contributors using Claude.

**How to apply:**
- "Same mistake twice" = the literal same correction, not any recurring annoyance.
- Put rules in the most specific `.claude/rules/<file>.md` that applies. Don't dump into one file.
- Include the *why* — future readers need it to judge edge cases.
- Surface the new rule to the user in the session that creates it.
```

---

## When you're done

Update this file (or its scraper-dashboard equivalent) with what actually got applied vs. deferred. Future-Nick and future-collaborators will read it to understand the state of cross-repo parity.
