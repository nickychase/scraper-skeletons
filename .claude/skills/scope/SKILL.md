---
name: scope
description: Produce a step-by-step implementation plan for a feature, integration, refactor, or new skill — explore the codebase, propose ordered phases, surface decisions, estimate effort. Stops at the plan; waits for greenlight before executing. Use when the user says "scope this," "plan it out," "step-by-step," or describes work and wants to know what it takes before committing.
---

# Skill: scope

Produces a clear, executable plan before any code changes. Honors the scope-then-proceed pattern: full plan upfront, single greenlight gate, then execute without per-step confirmations.

## When to use

- User asks to "scope this," "plan it out," "step-by-step," or "what would it take to..."
- Multi-phase work where dependencies matter and shipping in the wrong order would create rework
- Building a new skill, subagent, integration, or non-trivial feature

## When NOT to use

- Trivial single-file edits
- Pure information requests with no work to scope
- The user already has a plan and just wants execution

## Process

### 1. Restate the goal

Mirror the ask back in one sentence. If anything is genuinely ambiguous, ask **one** focused clarifying question. Don't ask three. Don't ask if the spec is already clear.

### 2. Explore before proposing

Read what's relevant before drafting a plan:

- The project's `CLAUDE.md` / `AGENTS.md`
- Any `.claude/rules/*.md` that apply to the domain
- Existing files the work will touch
- Memory entries that affect scope (collaborators, deferred decisions, in-flight initiatives)
- Sibling skills or subagents whose patterns this work should match

Don't skip this. Plans drafted without exploration silently grow scope at execution time.

### 3. Propose ordered phases

Output a numbered list. Each phase has:

- **One-line goal** — what this phase accomplishes
- **Concrete artifacts** — files, commands, edits. Not "set up the thing."
- **Verifiable end state** — build passes, tsc clean, screenshot matches, PR open

Order by dependency. Group related work so commits make sense (e.g., "memory + README," "rules + docs," "skills + subagents," "team primitives").

### 4. Surface decisions (max 3–4)

For each genuine fork in the road:

- **Plain-English framing** — no jargon-only choices. If the user is less technical, explain the trade in non-coding terms.
- **Recommended default + reasoning** — what you'd pick and why
- **Cost of going the other way** — what they give up

Cap at 3–4. More than that means the scope isn't tight enough — go back and pre-decide the rest.

### 5. Estimate effort and risk

- Rough time: 15 min / 60 min / 2 hr / half-day / multi-day
- Reversibility: flag anything hard to undo (branch protection, force pushes, schema migrations, irreversible deploys)
- Failure modes: CI on first run, missing credentials, irreversible external API calls

### 6. One greenlight gate

End with: "Greenlight, or want to trim/expand the list first?"

Once approved, execute every phase without per-step confirmation. Surface only genuinely blocking issues.

## Output format

```
## Scope: <one-line goal>

### Phase 1 — <name>
- <concrete artifacts>
- <verifiable end state>

### Phase 2 — <name>
- ...

...

### Decisions needed
1. <plain-English question> — default: <X> (because <reason>)
2. ...

### Risk / time
- ~<time>
- <reversibility notes>

---

Greenlight, or want to trim/expand?
```

## Stop conditions

- **Scope is bigger than the user realized.** Surface it. Don't quietly propose a 6-hour plan when they asked for a 30-minute change.
- **Required access is missing.** Sibling repo not checked out, credentials needed, external service unreachable. Flag it as a dependency, don't pretend to plan around it.
- **Conflict with an existing rule or memory entry.** Surface the conflict before proposing a resolution. Don't paper over it.
- **The ask itself looks wrong.** If the proposed work contradicts something more fundamental (architecture decisions, user preferences in memory, recent decisions), push back before scoping — see [[feedback-scope-then-proceed]] for the pattern. The user wants honest pushback at the scope stage, not silent compliance followed by buyer's remorse.

## Out of scope

- Executing the plan. Execution happens after the gate.
- Refining a plan the user already has. Discuss directly without invoking this skill.
- Pure brainstorming with no intent to build. Talk it through; don't formalize until intent is real.
