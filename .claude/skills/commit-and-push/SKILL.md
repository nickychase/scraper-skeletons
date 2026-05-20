---
name: commit-and-push
description: Smart commit + push for the current feature branch. Inspects uncommitted changes, pulls if behind, surfaces any memory / BACKLOG / rules updates the changes imply (one ack covers them), composes clean commit message(s), and pushes to the current branch — never main. Use when the user says "commit and push," "ship this," "let's land this," or "save the work."
---

# Skill: commit-and-push

Smart commit + push flow that respects branch + PR conventions and surfaces project-state updates the changes imply before pushing.

## When to use

- User says "commit and push," "ship this," "let's land this," "save the work"
- A multi-file change is ready and may imply memory / BACKLOG / rules updates
- Working tree has uncommitted changes the user clearly intends to ship

## When NOT to use

- Trivial single-file edits where the user clearly just wants raw `git add && git commit && git push` — do it directly without the full flow
- No remote configured or no feature branch yet — surface, ask
- User is on `main` — surface, refuse, offer to create a feature branch

## Process

### 1. Pre-flight (parallel)

Run together:

- `git status`
- `git branch --show-current`
- `git fetch origin` (see remote state without modifying)
- `git log --oneline @{u}..HEAD` (commits local has that remote doesn't)
- `git log --oneline HEAD..@{u}` (commits remote has that local doesn't)
- `git log --oneline origin/main..HEAD` (if not on main — commits unique to this branch)

**Stop conditions, surface before doing anything:**

- **On `main`**: refuse. Offer `git checkout -b <name>` with a sensible name from the diff.
- **Detached HEAD**: refuse.
- **No remote tracking branch**: ask whether to `git push -u origin <branch>` (first push) or whether to set tracking another way.
- **Local branch is behind remote** (`HEAD..@{u}` non-empty): pull first with `git pull --no-rebase` (preserves any local merge commits). If pull surfaces conflicts → stop, ask the user to resolve.

### 2. Inspect what changed

- `git diff --stat` for the scope at a glance
- `git diff` for content (or read files individually for larger changes)

Categorize each modified path:

- **Source** (`src/`)
- **Configuration / workflow** (`package.json`, `tsconfig.json`, `.github/`, `CODEOWNERS`, `.gitignore`)
- **Project docs / state** (`BACKLOG.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/`)
- **Agent infrastructure** (`.claude/rules/`, `.claude/skills/`, `.claude/agents/`)
- **Secrets-shaped** (`.env*`, `*credentials*`, `*.key`, `*.pem`, `*.local.*`)

**Refuse to commit** if secrets-shaped files appear unless the user has explicitly said to include them (and even then, double-check the contents aren't real credentials).

### 3. Surface implied state updates (if any)

If the inspection reveals changes that imply memory / BACKLOG / rules updates, surface a short numbered list **before staging anything**. Common triggers:

- New collaborator visible in commit metadata or PR refs → propose `collaborators.md` update
- Backlog item shipped (a `- [ ]` task is now actually done) → propose marking it complete and moving to the "Done" section
- Recurring mistake the user corrected during the session → propose codifying into the relevant `.claude/rules/<file>.md` per [[feedback-rule-on-repeat-mistakes]]
- New convention adopted (a pattern repeated 2+ times in this diff) → propose a rule file or extension
- Architecture pivot or deferral → propose a memory entry and a corresponding BACKLOG note
- Skill / subagent / rule added but `MEMORY.md` or `AGENTS.md` index not updated → propose the index entry

Wait for **one ack** that covers all proposed updates. Don't ping per item. If the user overrides any, drop those and proceed with the rest.

If nothing implied, skip this step and go straight to commit.

### 4. Stage and compose commit(s)

Stage relevant files explicitly (`git add <path>`) rather than `git add -A` — avoids silently dragging in things like untracked tmp files. Use `git add -A` only when the diff was already reviewed and every modified path is in scope.

Group into logical commits if the diff spans multiple concerns. Heuristic:

- Single coherent change → 1 commit
- Feature + memory/backlog updates → 2 commits (feature first, then doc/memory; the second commit's body can reference the first's SHA)
- Multiple independent fixes → 1 commit per fix, ordered by dependency

**Commit message style:**

- **Subject** — imperative voice, ≤72 chars, no trailing period
- **Body** (when not trivial) — explain *why*, not *what*. Reference decisions, memory entries, or issues. Wrap at 72 cols
- **No `Co-Authored-By: Claude ...` trailer.** Standing rule per [[no-co-author]]. Strip it if a template auto-appends.

Multi-line messages use a HEREDOC so newlines survive:

```
git commit -m "$(cat <<'EOF'
Subject line here

Body paragraph explaining why this change matters.
EOF
)"
```

### 5. Push to the current branch

- `git push` to the tracking remote of the current branch
- **Never** push directly to `main` — branch protection blocks it anyway, but the skill should respect the intent regardless
- **Never** `git push --force` unless the user explicitly asks AND the target isn't `main`. If a force-push is needed, surface why and confirm

If push is rejected:

- Non-fast-forward → fetch + pull + re-attempt. If still rejected, surface and stop
- Branch protection violation → surface the message verbatim, don't try to bypass
- Network / auth → surface, don't retry blindly

### 6. Report

In two or three lines:

- Branch name + how many commits landed
- A short summary of what shipped
- Whether an open PR exists for this branch (`gh pr list --head <branch>`) — link it if yes; offer to open one if no and the commits look ready

## Stop conditions

- **On `main`** → refuse to push, offer to branch
- **Secrets-shaped staged files** → refuse, list the files
- **Pull conflicts** → stop, ask user to resolve
- **Push rejected** → surface verbatim, don't auto-retry with force
- **Empty diff** → surface "nothing to commit," exit clean
- **Detached HEAD** → refuse

## Recovery

If a commit hook fails (pre-commit, lint, typecheck, etc.):

- Investigate the cause from the hook output
- Fix the underlying issue
- **Re-stage and create a NEW commit** — don't `git commit --amend`. Amending hides the failure-recovery context in git history. Failed-hook commits leave the working tree dirty even though the commit didn't go through, so a fresh commit after fixing is correct.

If the remote moved while we were working (someone else pushed):

- Pull again, then re-attempt push
- If history diverged in a way that needs rebasing, surface the situation — let the user decide between merge and rebase

## Out of scope

- Opening pull requests — offer if commits look ready, but don't auto-open
- Merging PRs
- Rebasing onto main (separate operation, riskier — explicit user request only)
- Cherry-picking, reverting, amending — explicit user request only
- Pushing across forks
