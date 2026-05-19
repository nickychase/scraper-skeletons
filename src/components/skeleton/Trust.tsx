import { Quote, Star } from "lucide-react";
import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

type ReviewSnippet = { quote: string; author?: string };

function collectSnippets(lead: Lead): ReviewSnippet[] {
  const pairs: [string | undefined, string | undefined][] = [
    [lead.place_review_snippet_1, lead.place_review_author_1],
    [lead.place_review_snippet_2, lead.place_review_author_2],
  ];
  return pairs
    .filter(([quote]) => Boolean(quote))
    .map(([quote, author]) => ({ quote: quote!, author }));
}

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
  const snippets = collectSnippets(lead);

  return (
    <section className="border-y border-brand-fg/10 bg-brand-bg">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {hasReviews && (
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(rating!)
                      ? "size-5 fill-brand-accent text-brand-accent"
                      : "size-5 fill-brand-fg/15 text-brand-fg/15"
                  }
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-brand-fg">
              {rating!.toFixed(1)}
              <span className="mx-2 text-brand-fg/40">·</span>
              {reviewCount} Google reviews
            </span>
          </div>
        )}

        {snippets.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {snippets.map(({ quote, author }, i) => (
              <figure
                key={i}
                className="relative rounded-xl border border-brand-fg/10 bg-brand-card p-6 shadow-sm"
              >
                <Quote
                  aria-hidden
                  className="absolute -top-3 left-5 size-7 fill-brand-accent text-brand-accent"
                />
                <blockquote className="text-base leading-relaxed text-brand-fg/85">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                {author && (
                  <figcaption className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-fg/55">
                    — {author}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {vertical.trustClaims.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 rounded-lg border border-brand-fg/10 bg-brand-card px-6 py-5 text-brand-fg"
            >
              <Icon className="size-5 shrink-0 text-brand-accent" />
              <span className="text-base font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
