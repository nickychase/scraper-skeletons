# Vertical conventions

How verticals are structured and dispatched in this repo. Read before adding, modifying, or reviewing vertical code.

## File layout

- `src/lib/types/vertical.ts` — `VerticalData`, `VerticalKey`, `SectionKey`, section sub-types.
- `src/lib/verticals/<key>.ts` — one file per vertical (e.g. `plumber.ts`, `detailing.ts`). Exports `<key>Vertical: VerticalData`.
- `src/lib/verticals/index.ts` — dispatcher. Maps `VerticalKey` → `VerticalData` and selects a vertical from a `Lead`.
- `src/components/skeleton/SkeletonSite.tsx` — universal renderer. Applies `vertical-<key>` class on the root so CSS variables cascade.
- `src/components/skeleton/<Section>.tsx` — one component per `SectionKey` (Hero, Trust, Services, Gallery, About, ServiceArea, Contact, PhoneBar).
- `src/fixtures/leads.sample.ts` — offline dev fallback leads. Each live vertical should have at least one fixture lead.

## Dispatcher (`src/lib/verticals/index.ts`)

Currently keyword-sniffs `lead.query`:

```ts
if (q.includes("detail")) return VERTICALS.detailing;
return VERTICALS.plumber;
```

This is intentionally v1. When a third vertical lands, **promote to a dedicated `lead.vertical` column on the Sheet** instead of stacking keyword rules. The plumber-default fallback only works while plumber is the catch-all.

## Adding a vertical — checklist

1. Add the new key to `VerticalKey` in `src/lib/types/vertical.ts`.
2. Create `src/lib/verticals/<key>.ts` exporting `<key>Vertical: VerticalData`. Copy a sibling vertical (e.g. `plumber.ts`) as the starting shape, then replace copy/services/about/gallery.
3. Register it in `VERTICALS` in `src/lib/verticals/index.ts`.
4. Add a dispatcher rule (keyword sniff for now; convert to `lead.vertical` column when third vertical lands).
5. Add a `.vertical-<key>` block to `src/app/globals.css` defining the 7 brand tokens (see [theming](./theming.md)).
6. Add a fixture lead in `src/fixtures/leads.sample.ts` so offline dev works for the new vertical.
7. Render `/<fixture-place-id>` locally and run a [screenshot loop](./screenshot-loop.md) against the design intent.

## Section composition

`VerticalData.sections: SectionKey[]` is the **only** source of truth for which sections render in what order. Don't conditionally render sections inside section components themselves — the section order is data-driven. `gallery` and `serviceArea` are optional (the types reflect this); other sections are required.

Current convention for both live verticals:

```
PhoneBar (sticky) → Hero → Trust → Services → Gallery → About → ServiceArea → Contact → footer
```

Diverge from this only with a deliberate reason in the PR description.

## Fields with `(lead) =>` signatures

Many `VerticalData` fields are functions taking `Lead`, not static strings, so per-prospect data can flow into the copy (city, owner name, years in business, etc.). When a field is a function, fallback to a sensible default when the lead lacks data — see `plumber.ts` for the `FALLBACK_OWNER` / `FALLBACK_YEARS` pattern.

## What goes in shared section components vs. vertical data

- **Shared component (`src/components/skeleton/<Section>.tsx`):** layout, structural markup, Tailwind classes that reference `var(--brand-*)` tokens. Stays vertical-agnostic.
- **Vertical data (`src/lib/verticals/<key>.ts`):** all copy, icons (from `lucide-react`), service lists, gallery items, ordering choices.

If you find yourself adding vertical-specific layout to a section component, stop — push the difference into `VerticalData` instead, or extend the type if the shape needs to change.

## Don't fork section components per vertical

The whole point of the universal `<SkeletonSite>` model is one renderer + per-vertical data. A `HeroPlumber.tsx` or `ServicesDetailing.tsx` is a smell. If a vertical needs a meaningfully different section, extend `SectionKey` and `VerticalData` so the difference is expressible in data.
