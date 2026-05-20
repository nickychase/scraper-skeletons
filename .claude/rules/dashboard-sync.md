# Dashboard sync — sheet schema policy

How the Lead schema stays in sync with the sibling [`scraper-dashboard`](https://github.com/nickychase/scraper-dashboard) repo. Read before touching `src/lib/types/lead.ts` or `src/lib/sheets/`.

## Current policy: duplicate by hand

The Lead schema is **duplicated**, not shared via monorepo or npm package. Both repos define their own `lead.ts` and Sheets client. The shared surface is small (~2 files) and the UI/auth/charts/design language don't transfer — the cost of duplication is judged lower than the cost of a monorepo.

This is a deliberate decision. See [[architecture-decisions]] in user memory for the rationale.

## The drift tax

Every schema change incurs a manual mirror step:

1. Edit `src/lib/types/lead.ts` here (and `sheets-coerce.ts` if the field needs coercion from raw Sheet rows).
2. Edit the equivalent file in scraper-dashboard.
3. Update the shared Google Sheet's column headers if you've added/removed columns.
4. Update fixture leads in `src/fixtures/leads.sample.ts` so offline dev still hydrates the new fields.

**Currently owed:** 9 optional polish-wave fields are in this repo's `lead.ts` but not yet mirrored to scraper-dashboard or the Sheet. Until that lands, populated data can't flow end-to-end.

When the owed mirror is paid down, update this rule with the new status.

## When to mirror

Mirror **at the time of the change**, not later. The "owed mirror" backlog item exists because mirrors were deferred — don't add to it. If you can't do the mirror in the same PR (e.g. you don't have access to scraper-dashboard), open a tracking issue immediately and link it from your PR description.

## When to escalate beyond duplication

If any of these become true, revisit the duplication decision:

- Schema changes happen >1x/month.
- A schema bug ships because the mirror was forgotten or applied inconsistently.
- A third consumer of the schema appears (e.g. a separate analytics service).

The escalation path is: shared TypeScript types package → published npm package → monorepo. Don't jump to monorepo first.

## Optional fields are the safe lever

When in doubt, add new fields as **optional** (`field?: string`) rather than required. Optional fields let the mirror lag temporarily without breaking either repo's build or runtime — the worst case is the new field is `undefined` in the side that hasn't mirrored yet. Required fields break the other side immediately.

The current polish-wave additions are all optional, which is why the mirror is owed-but-not-blocking. Keep this pattern.

## Don't bypass `sheets-coerce.ts`

Raw Sheet values come in as strings (or empty strings, or `"FALSE"`, etc.). The `sheets-coerce.ts` module is the single chokepoint that turns raw row data into a typed `Lead`. Don't parse Sheet values inline elsewhere — extend `sheets-coerce.ts` instead. This keeps the type boundary at one file.
