# Backlog

Bugs and outstanding tasks for `scraper-skeletons`. Newest items go to the top of each section.

## Bugs

_None logged yet._

## In Progress

- [ ] Plumber skeleton template — building per the 2026-05-18 scope (universal `<SkeletonSite>` + vertical tokens, static gen + on-demand revalidate, shadcn primitives + hand-built sections, trade-trust aesthetic).

## Backlog

### After template ships

- [ ] Initial git commit of the scaffold + lead schema duplication + placeholder `[slug]` page + plumber template. Was held until real work landed.
- [ ] Create the GitHub repo (`gh repo create scraper-skeletons --public --source . --remote origin`) and push.
- [ ] Wire up a Vercel project pointing at this repo. Add Sheets env vars.
- [ ] Once deployed, populate `skeleton_preview_url` in the Leads sheet (manually or via an n8n step) so outreach emails link to the live preview.
- [ ] Add the n8n → `revalidatePath` webhook so new leads appear without a redeploy.
- [ ] Write SOP at `docs/verticals.md`: how to add a new vertical template (type, data file, dispatch, copy guide).

## Decisions log

### 2026-05-18 — skeleton template architecture

- **Skeleton purpose**: visual teaser only. Nothing functional works. Prospect interest triggers the real build.
- **Q2 (per-vertical data location)**: hardcoded in `lib/verticals/<vertical>.ts`. Sheet schema stays clean. Future per-prospect overrides via one optional sheet column if needed.
- **Q3 (rendering)**: static generation via `generateStaticParams` over the Leads sheet + on-demand `revalidatePath` triggered by n8n when a new lead lands.
- **Q4 (style direction)**: trade-trust aesthetic, not SaaS-minimal. Plumber palette = navy + warm yellow accent + white. Body type via Geist (already loaded).
- **Architecture pivot**: single universal `<SkeletonSite>` component driven by `VerticalData` tokens, NOT per-vertical React templates. Adding a vertical = adding a data file.
- **Visual foundation**: Tailwind v4 (in place) + shadcn/ui for primitives. Hand-build all marketing sections.
- **Sections**: PhoneBar (sticky) → Hero → Trust → Services → Contact. No reviews-with-quotes (no review text in schema). No nav beyond PhoneBar. Thin footer.
- **Imagery**: one stock hero photo per vertical, shared across all leads in that vertical.
- **Review surface**: rating + count only (`place_rating`, `place_review_count`). No quote text.
