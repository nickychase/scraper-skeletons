# Backlog

Bugs and outstanding tasks for `scraper-skeletons`. Newest items go to the top of each section.

## Bugs

- [ ] `src/app/page.tsx` (homepage) still has dark-mode classes and references `/[place_id]` — should be cleaned up or rewritten to match the trade-trust aesthetic. Cosmetic only; the live route is `/[slug]`.

## Resume here (last paused 2026-05-18)

The plumber skeleton template is live and committed (commit `42b9ebc`, pushed to `github.com/nickychase/scraper-skeletons`). Dev server runs at `localhost:3000/ChIJ_HOT_001` against the fixture.

**Immediate pending decision**: pick build order for the 5 new sections + modularity refactor under "Polish & enhancement" below. My recommended sequence:

1. **Modularity refactor first** — add `sections: SectionKey[]` to `VerticalData`, make optional fields optional. 1-file change, unblocks the rest.
2. **About section + Hours block** — pure vertical-data adds, no photos/carousel needed.
3. **Service Area section** — first conditionally-rendered section; exercises the refactor.
4. **Gallery / carousel** — needs photo sourcing + carousel component choice (embla vs a 21st.dev pick).
5. **Real review snippets** — gated on schema coordination with scraper-dashboard.

Also unresolved: which 21st.dev components to install (user to paste 2–3 URLs), and what type of carousel (project gallery / services-detail / testimonials).

## In Progress

- [ ] **Polish + enhance the plumber skeleton** — make it look noticeably better than v1 and start adding substance, per the 2026-05-18 direction shift (see Decisions Log).

## Polish & enhancement (current focus)

### Existing items
- [ ] **Visual review pass** — user actually opens `localhost:3000/ChIJ_HOT_001` and lists every specific thing to change (palette, type weight/scale, spacing, copy, section order, missing elements). Has not happened yet.
- [ ] **21st.dev components** — user picks 2–3 specific component URLs to install + adapt (hero variants, service tiles, animated CTAs, etc.). Adding registry support to `components.json` may be needed.
- [ ] **Hero photo or upgrade** — current Hero is CSS-only (navy gradient + dot pattern + warm glow). May get replaced by a 21st.dev hero or a real photo from the gallery set.

### New sections from small-business-owner discovery (2026-05-18)

What a trade owner wants on their preview, mapped to scope. All five additions follow the universal-`<SkeletonSite>`-plus-`VerticalData`-tokens pattern so they generalize to electricians, HVAC, salons, etc.

- [ ] **About / Our Story section** — short paragraph + 3 short claims ("Since 2003", "Family-owned", "Master Plumber #M-12345"). New `<About />` section. Vertical-data: `aboutCopy: (lead) => string`, `aboutClaims: string[]` (generic defaults). Lead-data: real years/owner/license eventually come from schema extensions (see below). Multi-vertical: every business type wants this — copy tone varies (trades vs salon vs restaurant), structure stays the same.

- [ ] **Photo gallery / carousel** — supersedes the earlier "Image carousel" / "Source plumber photos" items in this backlog. New `<Gallery />` section. Vertical-data: `gallery: { src: string; alt: string }[]` pointing at `public/verticals/<key>/gallery/*.jpg`. Plumber set: 4–6 royalty-free Unsplash photos (truck, uniformed worker, jobsite, clean install). Multi-vertical: same shape, different photo folder per vertical. Carousel component decision still open — embla (free, easy) vs a 21st.dev marketing carousel.

- [ ] **Service area section** — list of cities served + simple map placeholder. New `<ServiceArea />` section. Vertical-data: nothing (service areas are inherently per-business). Lead-data v1: derive from `lead.city` + a vertical-default radius list ("Austin + surrounding areas"). Lead-data v2: schema column `service_areas: string[]` once added. Multi-vertical: **optional per vertical** — trades/HVAC/landscaping want this; salons/restaurants don't. First section that's conditionally rendered → drives the modularity refactor below.

- [ ] **Hours of operation block** — integrated into the Contact section rather than its own full section, to avoid stretching the page. Vertical-data: `hours: { schedule: { day: string; hours: string }[]; emergencyNote?: string }`. Multi-vertical: every business has hours; trades have an `emergencyNote` ("24/7 for burst pipes and gas leaks"), salons typically don't.

- [ ] **Real review snippets** — extend `<Trust />` to show 1–2 review quotes when present. Schema extension required, see below. Vertical-data: nothing. Lead-data: from new schema columns. Renders nothing if columns are empty (graceful degradation). Multi-vertical: universal — every vertical benefits.

### Modularity refactor (so the template scales to N business types)

- [ ] **Section composition via `VerticalData`** — add a `sections: SectionKey[]` field to `VerticalData` declaring which sections render and in what order. Replaces the hardcoded composition in `<SkeletonSite>`. Lets future verticals omit sections they don't need (salon = no service area) and add sections others don't (restaurant = menu/hours-prominent).

- [ ] **Optional `VerticalData` fields** — make fields that don't apply universally optional in the type (e.g., `emergencyNote?`, `serviceAreaCities?`). Section components skip rendering when their data is absent.

- [ ] **Vertical asset convention** — formalize `public/verticals/<key>/gallery/*` and `public/verticals/<key>/hero.jpg` paths in the SOP. SOP doc (`docs/verticals.md`) is the right place to land this.

- [ ] **VerticalKey + dispatch generalization** — `VerticalKey` is currently `'plumber'` only. When vertical #2 is added, widen to `'plumber' | 'electrician' | ...` and add a real dispatch from `lead.query` keywords or a new `lead.vertical` column. (Already noted with a `TODO` in `lib/verticals/index.ts`.)

### Schema extensions needed (coordinate with scraper-dashboard)

These require duplicated changes in both repos' `lead.ts` plus a Sheets column add.

- [ ] `place_review_snippet_1`, `place_review_snippet_2` — string, optional. Quote text from Google reviews.
- [ ] `place_review_author_1`, `place_review_author_2` — string, optional. Author first name + last initial.
- [ ] `years_in_business` — number, optional. Powers About claims ("Serving since {year}").
- [ ] `license_number` — string, optional. Powers About claims, varies per vertical (Master Plumber #, Master Electrician #, etc.).
- [ ] `owner_name` — string, optional. Powers About story.
- [ ] `service_areas` — string (CSV or JSON), optional. List of cities/ZIPs served. v1 can fall back to `city` + vertical default.
- [ ] `business_hours` — string (structured), optional. v1 can use vertical defaults.

Note: every column is **optional**. Skeleton renders fine without them (graceful fallback to vertical defaults or generic copy). This means we can ship the sections and add the columns incrementally.

## After polish lands

- [ ] Vercel project pointed at `nickychase/scraper-skeletons`. Env vars: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `REVALIDATE_SECRET`.
- [ ] Verify `/ChIJ_HOT_001` renders in prod after deploy.
- [ ] Populate `skeleton_preview_url` in the Leads sheet for current hot leads (manual for now).
- [ ] Wire the n8n → `POST /api/revalidate` webhook so new leads appear without a redeploy. Webhook header: `x-revalidate-secret: <value>`; body: `{ "slug": "<place_id>" }`.
- [ ] Write SOP at `docs/verticals.md` — how to add a new vertical (type, data file, dispatch in `verticals/index.ts`, copy guidelines, image conventions).

## Future extensions (skeleton-as-seed-of-real-site)

Built only after a prospect converts and they become real work. Schema extensions for the polish wave are listed above under "Schema extensions needed."

- [ ] **Real contact form** — replace the dead form in `Contact.tsx` with a working submit (Server Action → email forward, Resend, or a Sheets-append).
- [ ] **Per-business overrides** — single optional `vertical_overrides_json` column on the Leads sheet, merged on top of vertical defaults at render time. Avoids per-vertical schema sprawl beyond the columns listed above.
- [ ] **Sub-pages** — `/services/<slug>`, `/about`, etc. for prospects who want a fuller site after biting.
- [ ] **CMS / editing surface** — only relevant once multiple converted prospects exist and we need a non-engineer way to edit copy.
- [ ] **Booking / scheduling integration** — Calendly embed or similar, vertical-dependent.
- [ ] **Vertical #2** — first non-plumber vertical (electrician? HVAC? landscaping?). First real test of the modularity refactor. Trigger to extract a shared shell only if the universal `<SkeletonSite>` proves too rigid.

## Decisions log

### 2026-05-18 — direction shift: skeleton-as-seed-of-real-site

Earlier on 2026-05-18 we treated skeletons as inert visual teasers — "prospect bites → separate real build." That's evolved: skeletons are now the *seed* of the real site. Same codebase grows progressively (dead form → real form, static reviews → real reviews, more sections added as engagements convert). Architecture supports this without rework. Future extensions (see above) layer in one engagement at a time. The earlier "inert teaser" framing in `architecture_decisions` memory needs a note about this evolution.

### 2026-05-18 — skeleton template architecture

- **Skeleton purpose**: visual teaser with seed-of-real-site potential (see direction shift above).
- **Q2 (per-vertical data location)**: hardcoded in `lib/verticals/<vertical>.ts`. Sheet schema stays clean. Future per-prospect overrides via one optional sheet column if needed.
- **Q3 (rendering)**: static generation via `generateStaticParams` over the Leads sheet + on-demand `revalidatePath` triggered by n8n when a new lead lands.
- **Q4 (style direction)**: trade-trust aesthetic, not SaaS-minimal. Plumber palette = navy + warm yellow accent + cream. Body type via Geist (already loaded).
- **Architecture pivot**: single universal `<SkeletonSite>` component driven by `VerticalData` tokens, NOT per-vertical React templates. Adding a vertical = adding a data file.
- **Visual foundation**: Tailwind v4 (in place) + shadcn/ui `base-nova` primitives (uses `@base-ui/react`, not Radix). Hand-build all marketing sections.
- **Sections**: PhoneBar (sticky) → Hero → Trust → Services → Contact. No reviews-with-quotes (no review text in schema). No nav beyond PhoneBar. Thin footer.
- **Imagery (v1)**: CSS treatment (gradient + dot pattern + warm glow) for Hero. Stock photos deferred until polish pass — may be replaced by gallery carousel.
- **Review surface (v1)**: rating + count only (`place_rating`, `place_review_count`). No quote text until schema is extended.
