import { Star } from "lucide-react";
import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

export function Trust({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  const rating = lead.place_rating;
  const reviewCount = lead.place_review_count;
  const hasReviews =
    rating !== null && reviewCount !== null && reviewCount > 0;

  return (
    <section className="border-y border-plumber-navy/10 bg-plumber-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {hasReviews && (
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(rating!)
                      ? "size-5 fill-plumber-yellow text-plumber-yellow"
                      : "size-5 fill-plumber-navy/15 text-plumber-navy/15"
                  }
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-plumber-navy">
              {rating!.toFixed(1)}
              <span className="mx-2 text-plumber-navy/40">·</span>
              {reviewCount} Google reviews
            </span>
          </div>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {vertical.trustClaims.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 rounded-lg border border-plumber-navy/10 bg-white px-6 py-5 text-plumber-navy"
            >
              <Icon className="size-5 shrink-0 text-plumber-yellow" />
              <span className="text-base font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
