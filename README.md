# scraper-skeletons

Per-prospect marketing preview sites for the [scraper-dashboard](https://github.com/nickychase/scraper-dashboard) outreach flow. Each lead in the dashboard's Google Sheet gets a polished-looking preview site at `/<place_id>` — the outreach pitch is "we built YOU a preview."

The audience is the **small local service-trade owner** (plumbing, electrical, HVAC, detailing, landscaping, etc.) opening the link from a Gmail outreach, not their customers. Layouts are designed from the owner's perspective.

## Stack

- Next 16 (App Router, `src/` dir) + React 19 + TypeScript
- Tailwind v4 + shadcn/ui (`base-nova`, on `@base-ui/react` — not Radix)
- `framer-motion` for the gallery
- `googleapis` for the shared Leads sheet
- `zod` for schema validation

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Google service-account creds
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). With no env vars set, the app falls back to `src/fixtures/leads.sample.ts` (one plumber lead) so you can develop offline.

Routes:

- `/` — landing
- `/[slug]` — per-prospect preview, slug is the lead's `place_id`

## How it works

One universal `<SkeletonSite>` component renders a vertical-specific data bundle. Section composition is data-driven (`VerticalData.sections: SectionKey[]`), and theming uses a 7-role semantic-token model (`--brand-bg/fg/card/hero/hero-deep/hero-fg/accent`) defined per vertical in `globals.css`.

Vertical dispatch lives in `src/components/skeleton/verticals/index.ts` and is a keyword sniff on `lead.query` (e.g. contains `"detail"` → detailing).

### Verticals

| Key | Status | Example |
| --- | --- | --- |
| `plumber` | live | Patel Family Plumbing (`/ChIJ_HOT_001`) |
| `detailing` | live | Riverside Detailing (`/ChIJ_DETAIL_001`) |
| `shootist` | in progress (`shootist_skel` branch) | — |

Adding a vertical = new entry in `verticals/`, new `.vertical-<key>` class in `globals.css`, and a keyword rule in the dispatcher.

## Layout

```
src/
  app/
    [slug]/page.tsx        # per-prospect preview
    api/                   # internal endpoints
  components/
    skeleton/              # universal site + section components
    blocks/                # forked 3rd-party blocks (e.g. bento gallery)
    ui/                    # shadcn primitives
  fixtures/leads.sample.ts # offline dev fallback
  lib/                     # sheets client, helpers
```

## Related

- [`scraper-dashboard`](https://github.com/nickychase/scraper-dashboard) — sibling repo that owns the Leads sheet and outreach. Shares the lead schema and Sheets client (duplicated by hand, not via monorepo).
- `BACKLOG.md` — current backlog, including the dashboard schema mirror that's still owed.
- `AGENTS.md` / `CLAUDE.md` — notes for agents working in this repo.

## Workflow

Default branch is `main`; day-to-day work happens on `nickchase-branch`. Push feature branches and open PRs against `main`.
