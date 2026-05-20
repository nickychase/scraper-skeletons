import { InteractiveBentoGallery } from "@/components/blocks/interactive-bento-gallery";
import type { Lead } from "@/lib/types/lead";
import type { GalleryItem, VerticalData } from "@/lib/types/vertical";

type Props = { lead: Lead; vertical: VerticalData };

// Gallery has two layouts:
//   - bento (default): InteractiveBentoGallery with mixed-size tiles
//   - stacked: simple vertical stack of large images with overlaid captions
//
// Lead-level `gallery_items` overrides the vertical default — this is how
// real per-prospect photos from research enter the system.
export function Gallery({ lead, vertical }: Props) {
  const items = effectiveItems(lead, vertical);
  if (items.length === 0) return null;

  const gallery = vertical.gallery;
  // Fall back to generic copy if the vertical has no gallery block but the
  // lead supplies items anyway (uncommon, but keeps the section renderable).
  const eyebrow = gallery?.eyebrow ?? "Recent Work";
  const heading = gallery?.heading(lead) ?? "Recent work";
  const blurb =
    gallery?.blurb(lead) ?? "Tap any photo for a closer look.";

  const variant = lead.gallery_variant ?? "bento";

  return (
    <section className="bg-brand-card">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-brand-fg/70">{blurb}</p>
        </div>

        <div className="mt-14">
          {variant === "stacked" ? (
            <GalleryStacked items={items} />
          ) : (
            <InteractiveBentoGallery mediaItems={items} />
          )}
        </div>
      </div>
    </section>
  );
}

function effectiveItems(lead: Lead, vertical: VerticalData): GalleryItem[] {
  if (lead.gallery_items && lead.gallery_items.length > 0) {
    return lead.gallery_items;
  }
  return vertical.gallery?.items ?? [];
}

function GalleryStacked({ items }: { items: GalleryItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <figure
          key={item.id}
          className="relative overflow-hidden rounded-2xl border border-brand-fg/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.url}
            alt={item.title}
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="mt-1 text-sm text-white/80">{item.desc}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
