# Backlog

Bugs and outstanding tasks for `scraper-skeletons`. Newest items go to the top of each section.

## Target market & design principles

**Who we're targeting**: small local service-trade business owners — plumbing, electrical, HVAC, landscaping, cleaners, roofers, and similar small-business services. Local to the user's area. They typically have no website, or a 10+-year-old one that hurts more than helps.

**Who the preview is FOR**: the business *owner*, not their customers. The owner is the one opening the outreach email and reacting to the preview. They need to think "yes, that's mine, I want that." Every section choice, copy decision, and palette call is judged against the owner's reaction, not a hypothetical customer's.

**Methodology**: when scoping a new section or planning a new vertical, ask *"thinking like one of these business owners, what would you want to see on your website?"* Run this exercise per vertical — plumbers and salons answer differently, and the section list adapts.

**What trade owners want, in priority order** (surfaced 2026-05-18; codified in `memory/target_market.md`):

1. **Legitimacy signals** — license #, insurance, years in business, family-owned tag, association badges (PHCC / NECA / ACCA / BBB).
2. **Phone number prominence** — sticky, tap-to-call, mobile-first. Separate emergency line for trades.
3. **Real review quotes** — not just count. Schema gap; biggest perception-of-realism unlock.
4. **Photos of their work** — truck with logo, uniformed team, jobsites, before/after. Stock photos make it feel less theirs.
5. **Their story / About** — owner name, family / veteran / multi-generation. Makes it feel like *theirs*.
6. **Service area** — cities served. Per-vertical optional (trades yes, salons no).
7. **Hours of operation** — regular + emergency where applicable. Per-vertical.
8. **Conversion paths beyond the phone** — real form, request-a-quote, optional booking.

The 5 new sections currently in the "Polish & enhancement" queue are the direct output of this exercise. The modularity refactor (`sections: SectionKey[]` on `VerticalData`) exists *because* not every vertical wants every section — salons skip service-area and emergency-hours, restaurants skip service-area and add menu. Plumber is just the first vertical the framework supports.


## Bugs

- [ ] `src/app/page.tsx` (homepage) still has dark-mode classes and references `/[place_id]` — should be cleaned up or rewritten to match the trade-trust aesthetic. Cosmetic only; the live route is `/[slug]`.

## Direction shift 2026-05-19 — localhost-only previews + skill-driven generation

Two big changes shipped on 2026-05-19:

1. **Localhost-only previews.** Skeletons are demoed in-person, not sent via email. Vercel deploy + `skeleton_preview_url` population are deferred. See [[skeleton-generation-workflow]] in memory.
2. **`generate-skeleton` skill is the entry point** for every new prospect site. Research → variant selection → render at `localhost:3000/<place_id>`. Variance comes from palette + structural variants seeded by lead data, not from per-prospect custom builds.

Items previously tied to email outreach (working contact form, scraper-dashboard schema mirror, Vercel deploy, n8n revalidation webhook) are still listed below but **flagged as deferred** under "Deferred (email-previews-only)" until that workflow returns.

## Resume here (last paused 2026-05-19, four waves landed)

Four waves shipped:
- **Polish wave 1**: modularity refactor (`VerticalData.sections`), About section, Hours block in Contact, Service Area section, real review snippets in Trust, Lead schema extended with optional polish fields.
- **Gallery wave**: forked 21st.dev `interactive-bento-gallery` (anurag-mishra22) at `src/components/blocks/interactive-bento-gallery.tsx` — trade-trust palette baked in, drag-rearrange stripped from tiles, built-in header removed. `<Gallery />` wraps it. `framer-motion` added.
- **Multi-vertical wave (2026-05-19)**: forced by adding a second vertical (Riverside Detailing). Original `bg-plumber-*` classes were not actually vertical-agnostic — components hardcoded plumber tokens. Refactored to a 7-role semantic token model (`--brand-bg/fg/card/hero/hero-deep/hero-fg/accent`), per-vertical overrides via `.vertical-<key>` class on the SkeletonSite root. Added `VerticalData.heroImage?` for optional background photo. Riverside Detailing renders dark-purple/grey palette with a real luxury-car hero photo.
- **`generate-skeleton` wave (2026-05-19)**: research-driven per-prospect skeleton generation via the `generate-skeleton` skill. Google Places enrichment, gitignored `prospects.local.json` store, 4 new palette variants (`plumber-cool`, `plumber-modern`, `detailing-luxe`, `detailing-stealth`), Hero/Services/Gallery refactored into image/minimal/split, grid/list, bento/stacked variants respectively. Lead schema extended with optional variant + per-prospect imagery fields (`palette_variant`, `hero_image_url`, `hero_image_alt`, `gallery_items`, `hero_variant`, `services_variant`, `gallery_variant`).

Routes:
- `localhost:3000/ChIJ_HOT_001` — Patel Family Plumbing (navy/cream/yellow)
- `localhost:3000/ChIJ_DETAIL_001` — Riverside Detailing (dark grey-purple + electric purple)

Section order applies to both verticals: hero → trust → services → gallery → about → serviceArea → contact.

**Next wave (queued):**

1. **Set up `GOOGLE_PLACES_API_KEY`** — wire it into `.env.local` so the `generate-skeleton` skill produces full research (real photos, real reviews) instead of falling back to minimal leads.
2. **Field-test `generate-skeleton`** — generate a real prospect site, demo locally, iterate variant selection rules in the skill body based on what looks right.
3. **Visual review pass on the two example verticals** — open `/ChIJ_HOT_001` and `/ChIJ_DETAIL_001` in browser, then open palette variants by setting `palette_variant` in `prospects.local.json` for each, and list what to change.
4. **Curate gallery photos per vertical** — placeholder Unsplash URLs in both `plumberVertical.gallery.items` and `detailingVertical.gallery.items` still ship as the fallback when Places gives no photos. Hand-pick final shots for both.
5. **3rd vertical when ready** — when adding (electrician / HVAC / landscaping / salon / etc.), use the `add-vertical` skill. Bring 7 token values for `.vertical-<key>` in `globals.css`, plus 2 palette variants (`-<variant>` blocks) so the new vertical participates in `generate-skeleton`'s variant selection.

Deferred (email-previews-only):

- **Working contact form** — Server Action + Resend. Only matters when previews ship via email; localhost demos don't need a live form. Will return to scope when email previews return.
- **scraper-dashboard schema mirror** (9 optional polish fields + new variant fields) — see [[scraper-dashboard-mirror]]. Useless until Sheet-populated leads flow into a deployed app. `sync-dashboard-schema` skill stays ready.
- **Vercel deploy + `skeleton_preview_url` population + n8n revalidation webhook** — all email-outreach infrastructure. Deferred indefinitely; `BACKLOG.md`'s "After polish lands" section keeps the items for when this returns.

Deferred indefinitely: homepage cleanup bug (cosmetic, `/[slug]` is the real route); 21st.dev hover-slider for Services (dropped 2026-05-19); promoting vertical dispatch from `lead.query` keyword to a dedicated `lead.vertical` Sheet column (waits until query-sniff misfires — `add-vertical` skill will trigger the conversion when the 3rd vertical lands).

## In Progress

_(nothing right now — pick from "Next wave" above.)_

## Polish & enhancement

### Active queue
- [ ] **Visual review pass on the variants** — open `/ChIJ_HOT_001` and `/ChIJ_DETAIL_001` with each palette variant set via `palette_variant` in a local prospect entry. List palette-by-palette what to change (tone, contrast, accent strength). Same for hero/services/gallery variant choices.
- [ ] **Curate gallery photos per vertical** — replace the 6 placeholder Unsplash URLs in `plumberVertical.gallery.items` and `detailingVertical.gallery.items` with hand-picked fallback shots. These render when Places returns no photos for a prospect, so they're still the floor for visual quality.
- [ ] **Plumber hero upgrade** — plumber Hero is CSS-only (navy gradient + dot pattern + warm glow). Could get a real fallback photo via `plumberVertical.heroImage` like detailing has — that field is already wired and falls back to the CSS treatment when undefined. (Note: per-prospect Places photos already override this via `lead.hero_image_url`.)
- [ ] **Vertical asset convention SOP** — formalize `public/verticals/<key>/gallery/*` and `public/verticals/<key>/hero.jpg` paths in `docs/verticals.md`. (Note: per-prospect uses Places API URLs, not self-hosted — SOP should cover both modes.)
- [ ] **Promote vertical dispatch to a sheet column** — current dispatch in `verticals/index.ts` keyword-sniffs `lead.query`. When query strings get fuzzy or a 3rd vertical lands, promote to a `lead.vertical` field with keyword sniff as fallback. The `add-vertical` skill triggers this conversion on the 3rd vertical.

### Schema extensions — mirror in scraper-dashboard (deferred — localhost-only pivot)

These columns are optional in this repo's `leadSchema`. They were originally meant to flow through Sheets so email-outreach previews would carry real per-prospect data. With the localhost-only pivot, the `generate-skeleton` skill writes them directly to `prospects.local.json` — no Sheet roundtrip needed for in-person demos. Mirror returns to scope when email previews come back.

Owed when mirror resumes (use the `sync-dashboard-schema` skill):

- [ ] Polish-wave fields in scraper-dashboard's `lead.ts`: `place_review_snippet_1`, `place_review_snippet_2`, `place_review_author_1`, `place_review_author_2`, `years_in_business` (number), `license_number`, `owner_name`, `service_areas` (CSV), `business_hours`.
- [ ] Variant + per-prospect imagery fields: `palette_variant`, `hero_image_url`, `hero_image_alt`, `gallery_items` (JSON), `hero_variant`, `services_variant`, `gallery_variant`. All optional; localhost-only fields, so the Sheet doesn't need columns until previews ship publicly.
- [ ] Add the same columns to the shared Google Sheet.
- [ ] Populate values for hot leads.

### Done 2026-05-19 (generate-skeleton wave)

- [x] **Research helper (Google Places)** — `src/lib/research/{places,enrich}.ts`. `enrichLead(name, city?)` returns a populated `Lead`. CLI: `npm run enrich -- "Business" "City" [--save]`. Falls back to minimal placeholder lead when `GOOGLE_PLACES_API_KEY` is absent.
- [x] **Local prospect storage** — `src/fixtures/prospects.local.json` (gitignored). Load/save in `src/lib/local-prospects/store.ts`. `fetchLeadBySlug` now checks local prospects before Sheets / sample fixtures.
- [x] **4 palette variants** — `vertical-plumber-cool`, `vertical-plumber-modern`, `vertical-detailing-luxe`, `vertical-detailing-stealth` in `globals.css`. Applied via `lead.palette_variant`.
- [x] **Structural variants** — Hero (`image` / `minimal` / `split`), Services (`grid` / `list`), Gallery (`bento` / `stacked`). Selected per-prospect via `lead.{hero,services,gallery}_variant`. Lead-level `hero_image_url` and `gallery_items` override vertical defaults.
- [x] **`generate-skeleton` skill** — `.claude/skills/generate-skeleton/SKILL.md`. End-to-end: business name → research → variant selection → save → localhost URL.
- [x] **Schema extended** — Lead gains optional fields: `palette_variant`, `hero_image_url`, `hero_image_alt`, `gallery_items`, `hero_variant`, `services_variant`, `gallery_variant`. Dashboard mirror deferred (localhost-only).
- [x] **Services copy fix** — heading no longer says "Full-service plumbing for X" (plumber-specific copy that was leaking into the detailing site). Generic "Services across {city}" now used across all verticals.

### Done 2026-05-19 (multi-vertical wave)

- [x] **Semantic token model** — replaced the conflated `--brand-dark` / `--brand-bg` pair with 7 distinct CSS variables: `--brand-bg` (section), `--brand-fg` (text on section), `--brand-card` (elevated card), `--brand-hero` (dark hero/footer surface), `--brand-hero-deep` (hover/footer-deeper), `--brand-hero-fg` (text on hero), `--brand-accent`. Each vertical defines all 7 under `.vertical-<key>` in `globals.css`. Components reference them via `bg-brand-bg`, `text-brand-fg`, etc. Plumber rendered output unchanged.
- [x] **Riverside Detailing example vertical** — `VerticalKey` widened to `'plumber' | 'detailing'`. New `src/lib/verticals/detailing.ts` with full content: ceramic-coating trust claims, mobile-detailer About story, M-Sat hours (no emergency note), 8-city Riverside metro service area, 6 verified Unsplash gallery photos. Palette: dark grey-purple sections with electric purple accent.
- [x] **Hero background image (optional)** — `VerticalData.heroImage?: { url; alt }`. When set, `<Hero />` renders an `<img>` background with a left-to-right gradient overlay for text legibility + a bottom fade. Plumber leaves it undefined → falls back to the CSS dot-pattern + warm-glow treatment. Detailing's hero uses a dark luxury car photo.
- [x] **Vertical dispatch upgraded** — `verticals/index.ts` switched from hardcoded plumber to `lead.query.toLowerCase().includes("detail")` → detailing, else plumber.
- [x] **Riverside Detailing sample lead** — `SAMPLE_LEADS[1]` (`ChIJ_DETAIL_001`): Marcus Reyes, IDA #D-4471, 8 years, 4.9/142 reviews, fake (951) phone, 2 fabricated review snippets.

### Done 2026-05-19 (gallery wave)

- [x] **Photo gallery / carousel** — 21st.dev `interactive-bento-gallery` (anurag-mishra22) installed via shadcn registry, forked in place. Drag-rearrange stripped from grid tiles (still kept on the modal dock), `max-w-4xl` widened to `max-w-6xl`, built-in title/description removed in favor of our own section header. `framer-motion` added as dep. `<Gallery />` wraps it; `VerticalData.gallery?: GalleryData` optional per vertical. Originally themed to plumber palette, later re-themed via the semantic token refactor.
- [x] **21st.dev hover-slider — dropped from queue** — initially considered for Services section upgrade, but not committed to in this polish phase. Services keeps the current 6-icon-tile grid.

### Done 2026-05-18 (polish wave 1)

- [x] **Modularity refactor** — `VerticalData.sections: SectionKey[]`, optional `serviceArea`, `SkeletonSite` dispatches over the array.
- [x] **About / Our Story section** — `<About />` with `vertical.about = { eyebrow, heading, copy, claims }`; weaves `owner_name` + `years_in_business` + `license_number` when present.
- [x] **Real review snippets** — `<Trust />` renders up to 2 quote cards from `place_review_snippet_1/2`; no-op when absent.
- [x] **Service Area section** — `<ServiceArea />`, conditional on `vertical.serviceArea`. Lead `service_areas` CSV overrides vertical defaults.
- [x] **Hours of operation block** — folded into `<Contact />` as a third info card; `vertical.hours = { schedule, emergencyNote? }`.
- [x] **Lead schema extensions** — all optional polish fields added in this repo (mirror still owed in scraper-dashboard, see above).
- [x] **Fixture populated** — `SAMPLE_LEADS[0]` carries realistic Austin plumber data for every new field.

## After polish lands (deferred — email-previews-only)

All items in this section assume email outreach previews are live. They were the immediate roadmap before the 2026-05-19 localhost-only pivot. Returns to scope if/when email previews come back.

- [ ] Vercel project pointed at `nickychase/scraper-skeletons`. Env vars: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `REVALIDATE_SECRET`.
- [ ] Verify `/ChIJ_HOT_001` renders in prod after deploy.
- [ ] Populate `skeleton_preview_url` in the Leads sheet for current hot leads.
- [ ] Wire the n8n → `POST /api/revalidate` webhook so new leads appear without a redeploy. Webhook header: `x-revalidate-secret: <value>`; body: `{ "slug": "<place_id>" }`.
- [ ] Write SOP at `docs/verticals.md` — how to add a new vertical (mostly replaced now by `docs/adding-a-vertical.md` + the `add-vertical` skill; revisit when production deploy is wired).

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
