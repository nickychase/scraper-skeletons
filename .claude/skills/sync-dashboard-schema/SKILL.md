---
name: sync-dashboard-schema
description: Mirror Lead schema changes from scraper-skeletons to scraper-dashboard and the shared Google Sheet. Use when the user asks to "sync the schema," "pay down the dashboard mirror," "land the polish fields in scraper-dashboard," or after adding/removing fields on the Lead type here.
---

# Skill: sync-dashboard-schema

Codifies the [`.claude/rules/dashboard-sync.md`](../../rules/dashboard-sync.md) policy as an executable checklist.

## Context (read before starting)

The Lead schema is **duplicated by hand** between scraper-skeletons and scraper-dashboard. Both repos have their own `lead.ts`, their own Sheets client, and the shared Google Sheet sits between them. Schema changes here must be mirrored to land end-to-end.

**Currently owed:** 9 optional polish-wave fields exist in this repo's `src/lib/types/lead.ts` that are not yet in scraper-dashboard's equivalent or in the Sheet's column headers. Until that mirror is paid, populated data can't flow end-to-end (this repo coerces them; the dashboard doesn't know they exist; the Sheet doesn't have columns for them).

## Inputs to collect from the user

1. **Mode** — "pay down the existing 9-field backlog" or "mirror a specific new change I just made"?
2. **Location of scraper-dashboard repo** — usually `~/Desktop/scraper-dashboard`. Confirm it's checked out locally and on a clean branch.
3. **Sheet ID / link** — the Google Sheet that backs both repos. The user will need to manually edit headers; Claude can't currently push to Sheets headers via the existing client.

## Process

### 1. Inventory the diff

Read `src/lib/types/lead.ts` here. Read `src/lib/types/lead.ts` (or wherever the dashboard keeps it) over there. Diff the two.

For each field present here but missing there, record:

- Field name
- TypeScript type (and whether it's optional)
- Whether `sheets-coerce.ts` here applies any non-string coercion (number, boolean, date)
- Sheet column header the user will need to add

Produce this as a checklist before changing anything.

### 2. Mirror the type

In scraper-dashboard's `lead.ts`:

- Add each missing field to the `Lead` type (or whatever the equivalent is named there)
- Match optional/required exactly — almost certainly all should be **optional** (`field?: ...`). Required fields would break the dashboard immediately when reading existing rows that lack the new column.
- Match the type exactly (don't widen `string | undefined` to `string`, etc.)

### 3. Mirror the coercion

If the dashboard has an equivalent of `sheets-coerce.ts`, extend it with the same coercion logic for each new field. If the dashboard parses Sheet rows inline (no central coercion file), surface this to the user as tech debt — recommend extracting a coercion module to mirror this repo's pattern.

### 4. Update the Sheet headers

Claude cannot edit Google Sheet headers via the existing client (it's read-only for `Leads`). Surface the required header changes to the user as a numbered list. Wait for confirmation before proceeding to step 5.

After the user confirms headers are added, the Sheet position of new columns must match the order Claude assumes when reading. Either:

- Append new columns to the right of existing ones (safest — order-stable for existing tooling), or
- Insert at a specific position and update both repos' coercion to match.

Recommend "append to the right" unless the user has a specific reason otherwise.

### 5. Verify end-to-end

- Build both repos: `npm run build` here, the equivalent there.
- If there's a manual test path (run dev server, fetch a real lead, confirm the new fields hydrate), walk it.
- Commit each repo separately with a message referencing the other ("mirrors scraper-skeletons commit `<sha>`" and vice versa).

### 6. Update memory and rules

- Update [[scraper-dashboard-mirror]] memory: subtract the mirrored fields from the "owed" count. If the entire 9-field backlog is paid, mark it resolved and link the two mirror commits.
- Update [`.claude/rules/dashboard-sync.md`](../../rules/dashboard-sync.md): update the "Currently owed" line.
- If the user wants to escalate beyond duplication (>1x/month schema changes, or a mirror bug shipped), surface that — the rule has the escalation path.

## Stop conditions

- If the user can't or won't update Sheet headers, **stop**. The mirror is incomplete without it and the populated data won't flow. Don't pretend the mirror is done.
- If the two `lead.ts` files have diverged in ways beyond just missing fields (different field names, different types for the same field name), surface to the user — that's a real divergence that needs a deliberate reconciliation, not a one-way mirror.
- If you can't access scraper-dashboard locally, surface that — don't attempt to push edits via `gh api` to a repo you don't have checked out.

## Out of scope

- Migrating to a monorepo or shared package — that's the escalation path, but it's a separate, larger initiative. Only surface it if the trigger conditions in the rule are met.
- Backfilling historical Sheet rows with values for new columns — these are optional fields; existing rows will read as `undefined` and that's fine.
