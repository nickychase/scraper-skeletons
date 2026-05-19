import { InteractiveBentoGallery } from "@/components/blocks/interactive-bento-gallery";
import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

export function Gallery({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  const { gallery } = vertical;
  if (!gallery || gallery.items.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-plumber-yellow">
            {gallery.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-plumber-navy sm:text-5xl">
            {gallery.heading(lead)}
          </h2>
          <p className="mt-4 text-lg text-plumber-navy/70">
            {gallery.blurb(lead)}
          </p>
        </div>

        <div className="mt-14">
          <InteractiveBentoGallery mediaItems={gallery.items} />
        </div>
      </div>
    </section>
  );
}
