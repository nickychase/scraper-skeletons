# Theming — 7-role semantic token model

How colors are organized per vertical. Read before adjusting any brand color, hero treatment, or per-vertical styling.

## The 7 roles

Defined in `src/app/globals.css`:

| Token | Role |
| --- | --- |
| `--brand-bg` | Section background |
| `--brand-fg` | Body text on section background |
| `--brand-card` | Elevated card surface |
| `--brand-hero` | Hero/footer dark surface (dark in both light + dark themes) |
| `--brand-hero-deep` | Darker hover/footer variant of hero |
| `--brand-hero-fg` | Text on the dark hero/footer |
| `--brand-accent` | Highlight color (yellow / electric purple / etc.) |

These tokens are exposed as Tailwind utilities via `@theme inline` (e.g. `bg-brand-hero`, `text-brand-fg`, `border-brand-accent`).

## Cascade pattern

Per-vertical palettes live in `globals.css` under `.vertical-<key>` selectors. `SkeletonSite.tsx` applies `vertical-<key>` to the root element, and the variables cascade to all descendants.

Existing palettes:

- `.vertical-plumber` — warm cream bg, navy fg, navy hero, warm yellow accent.
- `.vertical-detailing` — dark grey-purple bg, near-white fg, deep purple-charcoal hero, electric purple accent.

`:root` defaults are set to plumber values as a safety net if a vertical class is missing.

## Adding a vertical's palette

1. Add a `.vertical-<key>` block to `globals.css`.
2. Define **all 7** tokens — don't rely on `:root` fallbacks. Missing tokens cascade plumber values, which is silent and wrong for any non-plumber vertical.
3. Use [OKLCH](https://oklch.com/) for color values. The existing palette uses it consistently — don't mix in hex or HSL.
4. Sanity-check contrast: `--brand-fg` on `--brand-bg`, `--brand-hero-fg` on `--brand-hero`. Aim for WCAG AA at minimum.

## Don't bypass the token system

- **Don't hardcode brand colors** in section components. Use `bg-brand-*`, `text-brand-*`, `border-brand-*` utilities (or `var(--brand-*)` in custom CSS).
- **Don't add a new token** unless an existing role can't express the use case. Adding tokens is a breaking change for every vertical — every `.vertical-<key>` block then needs to define the new token. If you do add one, update both verticals **and** the `:root` fallback.
- **Don't introduce a per-vertical Tailwind class** like `vertical-plumber:bg-yellow-500`. The token system exists specifically to avoid that branching.

## Dark mode

The `.dark` block in `globals.css` overrides the shadcn token set (`--background`, `--foreground`, etc.) but **does not override `--brand-*` tokens**. Brand tokens are vertical-scoped, not theme-scoped — a vertical's hero stays dark regardless of light/dark mode.

If a future vertical wants light/dark variants of its palette, layer `.dark .vertical-<key>` selectors. Don't bake light/dark assumptions into the existing palette structure.
