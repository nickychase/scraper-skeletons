---
name: add-vertical
description: Scaffold a new trade vertical (e.g. electrician, hvac, landscaping) end-to-end — type union, vertical data bundle, dispatcher rule, CSS palette, fixture lead, and visual verification. Use when the user asks to "add a vertical," "scaffold a new trade," or names a specific trade like "add HVAC."
---

# Skill: add-vertical

Codifies the [`docs/adding-a-vertical.md`](../../../docs/adding-a-vertical.md) walkthrough as an executable checklist.

## Inputs to collect from the user

Before starting, confirm:

1. **Vertical key** (kebab-or-single-word, e.g. `electrician`, `hvac`, `landscaping`). This becomes the union member, the file name, the dispatcher keyword, the CSS class suffix.
2. **Dispatcher keyword** (the substring that should appear in `lead.query` to route to this vertical, e.g. `"electric"` for electricians). If a single keyword doesn't work, ask whether to add multiple `q.includes()` rules or convert the dispatcher to a `lead.vertical` column now.
3. **Palette intent** (warm/cool/dark/bright, accent color direction). One sentence is enough — Claude picks specific OKLCH values, the user reviews.
4. **Fixture lead** (one realistic business — name, city, owner, years in business, two review snippets). If the user doesn't have a real prospect in mind, use plausible fictional values.

## Process

Work through these in order. Each step has a verifiable artifact.

### 1. Add the key to the type

Edit `src/lib/types/vertical.ts`. Add the key to the `VerticalKey` union.

**Verify:** `tsc --noEmit` should now fail in `src/lib/verticals/index.ts` because the `VERTICALS` record is missing the new key. That's expected — fix it in step 3.

### 2. Create the vertical bundle

Copy `src/lib/verticals/plumber.ts` to `src/lib/verticals/<key>.ts`. Rewrite:

- Export name: `<key>Vertical`
- `key: "<key>"`
- `heroEyebrow`, `heroSubhead`, `primaryCtaLabel` — trade-appropriate copy
- `trustClaims` — 3 claims, trade-relevant `lucide-react` icons
- `services` — 6 services with icons + 1-line blurbs
- `about.heading`, `about.copy`, `about.claims` — copy that uses `lead.owner_name`, `lead.city`, `lead.years_in_business` with sensible fallbacks
- `hours.schedule` — sensible default hours; include `emergencyNote` if relevant
- `gallery.items` — 6 placeholder Unsplash images (real curation comes later); copy the `span` values from `plumber.ts` for the bento layout
- `serviceArea.defaultCities` — 6–8 cities near a plausible base city for the trade

Pick `lucide-react` icons from [lucide.dev/icons](https://lucide.dev/icons/). Don't use icons that already appear in `plumber.ts` or `detailing.ts` unless the meaning genuinely transfers.

**Verify:** `tsc --noEmit` should pass after step 3 (the bundle satisfies `VerticalData`).

### 3. Register and dispatch

Edit `src/lib/verticals/index.ts`:

- Import the new vertical bundle.
- Add it to the `VERTICALS` record.
- Add a dispatcher rule using `q.includes("<keyword>")` placed **before** the plumber default but **after** more-specific existing keywords if there's any ambiguity.

If this is the **third vertical**, also convert the dispatcher to use a dedicated `lead.vertical` Sheet column instead of keyword sniffing. See [`.claude/rules/vertical-conventions.md`](../../rules/vertical-conventions.md) for the v1 → column promotion plan. Don't skip this conversion — keyword sniffing doesn't scale past 2 verticals.

**Verify:** `tsc --noEmit` should now pass cleanly.

### 4. Add the palette

In `src/app/globals.css`, add a `.vertical-<key>` block alongside the existing ones. Define **all 7** brand tokens in OKLCH:

```css
.vertical-<key> {
  --brand-bg: oklch(...);
  --brand-fg: oklch(...);
  --brand-card: oklch(...);
  --brand-hero: oklch(...);
  --brand-hero-deep: oklch(...);
  --brand-hero-fg: oklch(...);
  --brand-accent: oklch(...);
}
```

Pick values that match the user's stated palette intent. Sanity-check contrast: `--brand-fg` on `--brand-bg` and `--brand-hero-fg` on `--brand-hero` should be readable (aim WCAG AA).

**Verify:** Visually inspect after step 6.

### 5. Add a fixture lead

In `src/fixtures/leads.sample.ts`, append a new `Lead` to `SAMPLE_LEADS`:

- `place_id` — a memorable string (e.g. `"ChIJ_ELEC_001"`); becomes the URL slug
- `query` — must match the dispatcher keyword from step 3
- All `Lead` required fields populated with plausible values
- Optional polish fields (`owner_name`, `years_in_business`, `license_number`, `place_review_snippet_*`, etc.) populated so the About and Trust sections have content to show

**Verify:** Hit the fixture URL — see step 6.

### 6. Visual verification (screenshot loop)

Apply [`.claude/rules/screenshot-loop.md`](../../rules/screenshot-loop.md):

1. `npm run dev`
2. Open `http://localhost:3000/<fixture-place-id>`
3. Screenshot the page (Chrome DevTools MCP if available, otherwise ask the user to screenshot and paste)
4. Compare to a sibling vertical at the same polish level (plumber if the new vertical leans light/warm, detailing if it leans dark/premium)
5. Close gaps in the palette, copy, or fixture data over 2–4 iterations
6. Stop when the new vertical reads as a peer of the existing two

Also verify:

- The `vertical-<key>` class is actually applied on the `<SkeletonSite>` root (confirms dispatcher routed correctly)
- All sections render in order: PhoneBar → Hero → Trust → Services → Gallery → About → ServiceArea → Contact → footer
- City-conditional copy renders both with and without a city (temporarily blank the fixture's city to test)

### 7. Update BACKLOG.md

If this vertical was listed in `BACKLOG.md`, check it off or move it to a "shipped" section. If not listed, add a one-line entry recording the ship date and the example prospect.

### 8. Open the PR

- Branch from `main`, not from another contributor's branch
- One vertical per PR
- Fill in the PR template checklist honestly
- CI must pass before merge

## Stop conditions

- If `tsc --noEmit` fails after step 3, don't proceed — the type or registration is wrong. Fix before adding CSS.
- If visual verification takes more than ~4 iterations, stop and ask the user what specifically they want different. Don't iterate blindly past 4.
- If the lead schema needs a new field for this vertical, that's a [`dashboard-sync`](../../rules/dashboard-sync.md) trigger — surface to the user before adding the field.

## Out of scope

- Curated gallery photos — use Unsplash placeholders. Real photo curation is its own pass, after the vertical structure is approved.
- Sheet schema changes — handle separately via the `sync-dashboard-schema` skill if needed.
- Production deploy — Vercel handles that on merge to `main`.
