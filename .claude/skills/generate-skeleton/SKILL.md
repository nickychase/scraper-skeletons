---
name: generate-skeleton
description: Build a per-prospect skeleton site on localhost from just a business name. Researches the business via Google Places, picks palette + structural variants based on positioning, persists to the local prospects file, outputs http://localhost:3000/<place_id>. Use when the user asks to "generate a skeleton," "build a preview for X," "make a site for X," or "scaffold a prospect."
---

# Skill: generate-skeleton

End-to-end skill for generating one per-prospect skeleton site that runs on localhost. Designed for in-person prospect demos — no email outreach, no public deploy.

## When to use

- "Generate a skeleton for {business}"
- "Build a preview for {business in city}"
- "Make a site for {business}"
- "Scaffold a prospect"

## When NOT to use

- Adding a new trade vertical → use [`add-vertical`](../add-vertical/SKILL.md)
- Mirroring schema between repos → use [`sync-dashboard-schema`](../sync-dashboard-schema/SKILL.md)
- Refining an existing prospect → edit `src/fixtures/prospects.local.json` directly

## Inputs to collect

1. **Business name** (required) — ask for spelling if uncertain.
2. **City** (required) — disambiguates the Places lookup. Parse it out of the user's message ("the one in Austin") when possible.

Don't ask for anything else upfront. Research fills in the rest.

## Process

### 1. Verify environment

Check `.env.local` for `GOOGLE_PLACES_API_KEY`. If missing, tell the user — research falls back to a minimal placeholder lead, which still produces a renderable skeleton, but loses real photos, real reviews, and accurate address/phone. Ask whether to proceed with minimal or wait for them to add the key.

### 2. Run research + save

```bash
npm run enrich -- "<Business Name>" "<City>" --save
```

- Stdout: full enriched lead JSON
- Stderr: confirmation line with the localhost URL

Capture both. If the enrich call exits non-zero or the JSON shows `"source": "minimal"` despite the API key being set, surface what went wrong before proceeding (likely Places ZERO_RESULTS — ask user for a more specific name or city).

### 3. Pick a palette variant

Inspect the enriched lead. Pick a variant based on positioning, or leave unset for the vertical base palette:

| Signal in research data | `palette_variant` |
| --- | --- |
| Plumber, modern positioning — has slick website, tech-forward language, high rating + many reviews | `"modern"` |
| Plumber, clinical / commercial / HVAC-adjacent | `"cool"` |
| Plumber, family-owned + long tenure (years_in_business ≥ 15) | leave unset (base warm palette) |
| Detailing, luxury / exotic / coachwork specialty | `"luxe"` |
| Detailing, performance / track / aggressive language | `"stealth"` |
| Detailing, broad consumer / mobile | leave unset (base palette) |

Each variant maps to a CSS class (`vertical-plumber-cool`, `vertical-detailing-luxe`, etc.) defined in `src/app/globals.css`.

### 4. Pick structural variants

**Hero (`hero_variant`)**:

- `"image"` (default) — when the lead has a usable hero photo (lead.hero_image_url is set from Places, or vertical default exists). Most prospects.
- `"split"` — when rating ≥ 4.5 AND review_count ≥ 30 AND years_in_business ≥ 10. The right column shows the stats.
- `"minimal"` — when no photo AND thin stats. Text-forward, accent glow.

**Services (`services_variant`)**:

- `"grid"` (default) — six services in a 2x3 grid.
- `"list"` — pick when the vertical's services have particularly long, narrative blurbs (more breathing room helps).

**Gallery (`gallery_variant`)**:

- `"bento"` (default) — interactive bento gallery.
- `"stacked"` — pick when fewer than 4 usable photos came back from Places. Large-format vertical stack reads better with few images.

### 5. Apply variants to the saved lead

The lead is already in `src/fixtures/prospects.local.json` from step 2. To add the variant fields:

1. Read `src/fixtures/prospects.local.json`.
2. Find the entry whose `place_id` matches the one just saved.
3. Add the variant fields you chose (any of `palette_variant`, `hero_variant`, `services_variant`, `gallery_variant`).
4. Write the file back.

The schema accepts these as optional fields — absent means "use default."

### 6. Ensure the dev server is running

Check port 3000:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ || echo "down"
```

If not 200, start it in the background:

```bash
npm run dev
```

(Use `run_in_background: true` on the Bash call so the session doesn't block.) Wait ~5 seconds, then re-check the route returns 200.

### 7. Output the URL

Print plainly:

```
http://localhost:3000/<place_id>
```

Then in 2–3 sentences, tell the user:

- What variants you picked and why (1 sentence)
- Any research gaps (no hero photo, only 1 review found, etc.)
- One thing they might want to manually tweak (e.g. "consider replacing the gallery photos for the demo — Places returned exterior shots only")

## Stop conditions

- **No Places API key**: surface; ask user whether to proceed with minimal lead.
- **No Places result**: ask user for a more specific city / spelling. Don't fall through to minimal silently if Places was configured.
- **Schema validation fails on save**: report which fields failed. Stop. Don't write a partial lead.
- **Dev server can't bind to port 3000**: surface (port likely in use), ask user to stop the conflicting process.
- **Lead's `query` doesn't match any vertical's dispatcher**: the existing dispatcher in `src/lib/verticals/index.ts` is keyword-based; if Places returns a query for a trade we don't have a vertical for yet, surface and ask the user whether to (a) override the query field to match an existing vertical, or (b) stop and add the vertical first via the `add-vertical` skill.

## Determinism

Variant choices are fully data-driven from the enriched lead. Two invocations for the same business produce the same variants. Don't randomize — repeat demos should look the same.

## Out of scope

- Email outreach previews (localhost-only pivot — see [[skeleton-generation-workflow]] in memory)
- Manual photo curation — Places gives what it gives. Replace by hand later if the demo lands.
- New verticals — see [`add-vertical`](../add-vertical/SKILL.md)
- Editing existing prospects — open the JSON file
- Producing the schema mirror — see [`sync-dashboard-schema`](../sync-dashboard-schema/SKILL.md), though it's deferred while previews are local-only
