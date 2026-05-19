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

## Resume here (last paused 2026-05-19, polish wave 1 + gallery wave landed)

Two waves shipped on `main`:
- **Polish wave 1**: modularity refactor (`VerticalData.sections`), About section, Hours block in Contact, Service Area section, real review snippets in Trust, Lead schema extended with optional polish fields.
- **Gallery wave**: 21st.dev `interactive-bento-gallery` (anurag-mishra22) installed via shadcn registry, forked in place at `src/components/blocks/interactive-bento-gallery.tsx` (trade-trust palette, drag-rearrange stripped from grid tiles, built-in header removed). `<Gallery />` section wraps it. `framer-motion` added. 6 Unsplash placeholder photos wired into `plumberVertical.gallery`.

Fixture lead populated; renders fully-loaded at `localhost:3000/ChIJ_HOT_001`. Section order: hero → trust → services → gallery → about → serviceArea → contact.

**Next wave (queued):**

1. **Visual review pass** — user opens the page in browser, lists every specific thing to change (palette, type weight/scale, spacing, copy, section order, photo curation).
2. **Working contact form** — Server Action + Resend. v1 hardcoded `to:` address; later per-lead via Sheet column. Adds `RESEND_API_KEY` env var and `resend` dep.
3. **scraper-dashboard mirror** — add the optional polish columns to scraper-dashboard's `lead.ts` + Sheet so populated leads flow through. List below.
4. **Curate the 6 gallery photos** — current set is placeholder; user pastes 6 final Unsplash URLs whenever, I swap.

Deferred indefinitely: `VerticalKey` widening (waits on vertical #2), homepage cleanup bug (cosmetic, `/[slug]` is the real route), 21st.dev hover-slider for Services (dropped 2026-05-19 — Services keeps current 6-icon grid).

## In Progress

_(nothing right now — pick from "Next wave" above.)_

## Polish & enhancement

### Active queue
- [ ] **Visual review pass** — user opens `localhost:3000/ChIJ_HOT_001` (fully-loaded with all polish + gallery) and lists every specific thing to change (palette, type weight/scale, spacing, copy, section order, photo curation).
- [ ] **Curate gallery photos** — replace the 6 placeholder Unsplash URLs in `plumberVertical.gallery.items` with hand-picked final shots. Showpiece slot (id=1) is the largest tile — give it the strongest single photo.
- [ ] **Working contact form** — replace dead form in `Contact.tsx` with a Server Action calling Resend. Adds `RESEND_API_KEY` env var, one dep, no API route. v1: hardcoded `to:` address; later: pull per-lead `contact_email` from Sheet.
- [ ] **Hero upgrade** — current Hero is CSS-only (navy gradient + dot pattern + warm glow). May get replaced by a 21st.dev hero or a real photo from the gallery set.
- [ ] **Vertical asset convention SOP** — formalize `public/verticals/<key>/gallery/*` and `public/verticals/<key>/hero.jpg` paths in `docs/verticals.md`. (Note: gallery v1 uses external Unsplash URLs, not self-hosted — SOP should cover both modes.)
- [ ] **VerticalKey + dispatch generalization** — `VerticalKey` is currently `'plumber'` only. When vertical #2 is added, widen the union and add a real dispatch from `lead.query` keywords or a new `lead.vertical` column. (`TODO` in `lib/verticals/index.ts`.)

### Schema extensions — mirror in scraper-dashboard

These columns are optional in this repo's `leadSchema`. They render no-op until scraper-dashboard mirrors them and the Sheet has the columns.

- [ ] Add to scraper-dashboard's `lead.ts` (identical optional shape): `place_review_snippet_1`, `place_review_snippet_2`, `place_review_author_1`, `place_review_author_2`, `years_in_business` (number), `license_number`, `owner_name`, `service_areas` (CSV), `business_hours`.
- [ ] Add the same columns to the shared Google Sheet.
- [ ] Populate values for current hot leads (manual for now; n8n later).

### Done 2026-05-19 (gallery wave)

- [x] **Photo gallery / carousel** — 21st.dev `interactive-bento-gallery` (anurag-mishra22) installed via shadcn registry, forked in place. Trade-trust palette, drag-rearrange stripped from grid tiles (still kept on the modal dock), `max-w-4xl` widened to `max-w-6xl`, built-in title/description removed in favor of our own section header. `framer-motion` added as dep. `<Gallery />` wraps it; `VerticalData.gallery?: GalleryData` optional per vertical. 6 placeholder Unsplash photos wired with bento spans.
- [x] **21st.dev hover-slider — dropped from queue** — initially considered for Services section upgrade, but not committed to in this polish phase. Services keeps the current 6-icon-tile grid.

### Done 2026-05-18 (polish wave 1)

- [x] **Modularity refactor** — `VerticalData.sections: SectionKey[]`, optional `serviceArea`, `SkeletonSite` dispatches over the array.
- [x] **About / Our Story section** — `<About />` with `vertical.about = { eyebrow, heading, copy, claims }`; weaves `owner_name` + `years_in_business` + `license_number` when present.
- [x] **Real review snippets** — `<Trust />` renders up to 2 quote cards from `place_review_snippet_1/2`; no-op when absent.
- [x] **Service Area section** — `<ServiceArea />`, conditional on `vertical.serviceArea`. Lead `service_areas` CSV overrides vertical defaults.
- [x] **Hours of operation block** — folded into `<Contact />` as a third info card; `vertical.hours = { schedule, emergencyNote? }`.
- [x] **Lead schema extensions** — all optional polish fields added in this repo (mirror still owed in scraper-dashboard, see above).
- [x] **Fixture populated** — `SAMPLE_LEADS[0]` carries realistic Austin plumber data for every new field.

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
