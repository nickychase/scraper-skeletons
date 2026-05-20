# Adding a vertical

A walkthrough for adding a new trade vertical (e.g. `electrician`, `hvac`, `landscaping`) to scraper-skeletons. Written assuming you're new to the repo.

## What is a "vertical"?

A vertical is a per-trade design and copy bundle. Every prospect's preview site is rendered by **one universal component** (`<SkeletonSite>`) with a **vertical-specific data bundle**. Adding a new trade = adding a new bundle, not building a new page.

Two are live today: `plumber` (Patel Family Plumbing) and `detailing` (Riverside Detailing). Their layouts are identical; their colors, icons, copy, and gallery are not.

## Before you start

- Clone the repo and run `npm install`.
- Copy `.env.example` to `.env.local` (you can leave the values blank — the app falls back to `src/fixtures/leads.sample.ts` when env vars are unset).
- `npm run dev` and open `http://localhost:3000/ChIJ_HOT_001` to confirm the plumber fixture renders. If it does, you're set.
- Read [`.claude/rules/vertical-conventions.md`](../.claude/rules/vertical-conventions.md) and [`.claude/rules/theming.md`](../.claude/rules/theming.md). They're short — 5 min each.

## The seven files you'll touch

| File | What you do |
| --- | --- |
| `src/lib/types/vertical.ts` | Add your key to the `VerticalKey` union |
| `src/lib/verticals/<key>.ts` | **New file.** Your vertical's `VerticalData` bundle |
| `src/lib/verticals/index.ts` | Register the bundle in `VERTICALS` and add a dispatcher rule |
| `src/app/globals.css` | Add a `.vertical-<key>` block with 7 brand tokens |
| `src/fixtures/leads.sample.ts` | Add a fixture lead for offline development |
| `docs/adding-a-vertical.md` | (this file — no changes needed) |
| `BACKLOG.md` | Move/check off the vertical from the backlog |

That's it. No new components, no new routes.

## Walkthrough

### 1. Add the key to the type

In `src/lib/types/vertical.ts`:

```ts
export type VerticalKey = "plumber" | "detailing" | "electrician";
```

### 2. Create the vertical bundle

Copy `src/lib/verticals/plumber.ts` to `src/lib/verticals/electrician.ts` as your starting shape. Then:

- Rename the export: `export const electricianVertical: VerticalData = { ... }`
- Change `key: "plumber"` → `key: "electrician"`.
- Rewrite `heroEyebrow`, `heroSubhead`, `primaryCtaLabel`, `trustClaims`, `services`, `about`, `hours`, `gallery`, `serviceArea` for the new trade.
- Pick icons from [`lucide-react`](https://lucide.dev/icons/) — search for trade-relevant ones. Plumber uses `Wrench`, `Droplets`, `Flame`, etc. Electrician would use `Zap`, `Lightbulb`, `Plug`, `BatteryCharging`, etc.
- The `(lead) => ...` function fields let you personalize copy with the prospect's city, owner name, years in business. Always include a fallback string for when those fields are missing on a lead.

### 3. Register and dispatch

In `src/lib/verticals/index.ts`:

```ts
import { electricianVertical } from "./electrician";

const VERTICALS: Record<VerticalKey, VerticalData> = {
  plumber: plumberVertical,
  detailing: detailingVertical,
  electrician: electricianVertical,
};

export function getVerticalForLead(lead: Lead): VerticalData {
  const q = lead.query.toLowerCase();
  if (q.includes("detail")) return VERTICALS.detailing;
  if (q.includes("electric")) return VERTICALS.electrician;
  return VERTICALS.plumber;
}
```

Note: keyword sniffing is the v1 dispatch strategy. When a third vertical lands, we promote dispatch to a dedicated `lead.vertical` Sheet column. If you're the one landing the third, do that conversion in the same PR.

### 4. Add the palette

In `src/app/globals.css`, alongside `.vertical-plumber` and `.vertical-detailing`:

```css
.vertical-electrician {
  --brand-bg: oklch(...);
  --brand-fg: oklch(...);
  --brand-card: oklch(...);
  --brand-hero: oklch(...);
  --brand-hero-deep: oklch(...);
  --brand-hero-fg: oklch(...);
  --brand-accent: oklch(...);
}
```

All 7 tokens. Use [oklch.com](https://oklch.com/) to pick colors. Check contrast: `--brand-fg` on `--brand-bg`, `--brand-hero-fg` on `--brand-hero`.

### 5. Add a fixture lead

In `src/fixtures/leads.sample.ts`, add a new `Lead` entry. Copy an existing one as the shape — most fields are required by the `Lead` type. Set:

- `place_id` to something memorable like `"ChIJ_ELEC_001"` (it becomes the URL slug — `/ChIJ_ELEC_001`).
- `query` to a phrase that triggers your dispatcher rule (e.g. `"electricians in dallas tx"`).
- `business_name`, `city`, `owner_name`, `years_in_business`, etc. to plausible values for the trade.
- The `place_review_snippet_*` fields to realistic reviews — these surface in the Trust section.

### 6. Verify visually

Start the dev server and open your fixture URL:

```
npm run dev
# → open http://localhost:3000/ChIJ_ELEC_001
```

Run a screenshot loop against the existing verticals' polish level (see [`.claude/rules/screenshot-loop.md`](../.claude/rules/screenshot-loop.md)). Compare hero, services, trust, gallery, contact at the same viewport.

Specifically check:

- The vertical's palette is actually applied (the `vertical-<key>` class should be on the `<SkeletonSite>` root).
- All 7 sections render in the expected order: PhoneBar → Hero → Trust → Services → Gallery → About → ServiceArea → Contact → footer.
- City-conditional copy renders correctly with both a city present and absent (test by temporarily editing the fixture).

### 7. Open a PR

- Branch from `main` (not from another contributor's branch).
- One vertical per PR — don't bundle multiple verticals.
- The PR template has a checklist tied to these rules. Fill it in honestly.
- CI must pass before merge (lint + typecheck + build).

## Common pitfalls

- **Forgetting the dispatcher rule.** You'll add the file and the palette, the build will pass, but `/your-fixture` will still render the plumber palette because the keyword sniff hasn't been updated.
- **Hardcoding colors.** Use `bg-brand-*` / `text-brand-*` / `border-brand-*` utilities (or `var(--brand-*)`), never raw color values in section components.
- **Forking a section component for your vertical.** If a section needs to look meaningfully different, extend `SectionKey` and `VerticalData` so the difference is expressible in data — don't create `HeroElectrician.tsx`.
- **Skipping the fixture.** Without a fixture, offline dev for your vertical is impossible. Other contributors will hit it.
- **Mirroring `lead.ts` changes.** If your vertical needs a new field on `Lead`, you also owe the mirror to scraper-dashboard. See [`.claude/rules/dashboard-sync.md`](../.claude/rules/dashboard-sync.md).

## When you're stuck

- The plumber vertical is the canonical reference — when in doubt, mirror its structure.
- The detailing vertical shows what changes when a vertical needs a dark palette + hero image override.
- Ping Nick (`nickychase` on GitHub) for design intent questions.
