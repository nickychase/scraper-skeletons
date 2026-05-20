import { ArrowRight, Phone, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/types/lead";
import type { HeroImage as HeroImageType, VerticalData } from "@/lib/types/vertical";

type Props = { lead: Lead; vertical: VerticalData };

// Hero has three layouts. The default is "image"; the skill picks the
// variant per prospect based on business positioning + available data.
//   - image:   classic image hero with gradient overlay; needs a hero photo
//   - minimal: text-forward, no image, dot pattern + accent glow
//   - split:   two-column, with right column showing rating + tenure stats
export function Hero({ lead, vertical }: Props) {
  const variant = lead.hero_variant ?? "image";
  switch (variant) {
    case "minimal":
      return <HeroMinimal lead={lead} vertical={vertical} />;
    case "split":
      return <HeroSplit lead={lead} vertical={vertical} />;
    case "image":
    default:
      return <HeroImage lead={lead} vertical={vertical} />;
  }
}

// Lead-level hero image override beats the vertical default. This is how
// research-driven imagery enters the system.
function getEffectiveHeroImage(
  lead: Lead,
  vertical: VerticalData,
): HeroImageType | undefined {
  if (lead.hero_image_url) {
    return { url: lead.hero_image_url, alt: lead.hero_image_alt ?? "" };
  }
  return vertical.heroImage;
}

function telHref(lead: Lead): string | undefined {
  return lead.phone ? `tel:${lead.phone.replace(/[^\d+]/g, "")}` : undefined;
}

function HeroImage({ lead, vertical }: Props) {
  const heroImage = getEffectiveHeroImage(lead, vertical);
  const tel = telHref(lead);

  return (
    <section className="relative overflow-hidden bg-brand-hero text-brand-hero-fg">
      {heroImage ? (
        <>
          <img
            src={heroImage.url}
            alt={heroImage.alt}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
            loading="eager"
            decoding="async"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-hero/95 via-brand-hero/70 to-brand-hero/30"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-hero to-transparent"
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-brand-accent/20 blur-3xl"
          />
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
          {vertical.heroEyebrow(lead)}
        </p>
        <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          {lead.business_name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-brand-hero-fg/80 sm:text-xl">
          {vertical.heroSubhead(lead)}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button className="h-12 bg-brand-accent px-6 text-base font-semibold text-brand-fg hover:bg-brand-accent/90">
            {vertical.primaryCtaLabel}
            <ArrowRight className="ml-2 size-4" />
          </Button>
          {tel && (
            <a
              href={tel}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-brand-hero-fg/30 bg-transparent px-6 text-base font-semibold text-brand-hero-fg hover:bg-brand-hero-fg/10 hover:text-brand-hero-fg",
              )}
            >
              <Phone className="mr-2 size-4" />
              {lead.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroMinimal({ lead, vertical }: Props) {
  const tel = telHref(lead);

  return (
    <section className="relative overflow-hidden bg-brand-bg text-brand-fg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-brand-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
          {vertical.heroEyebrow(lead)}
        </p>
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-brand-fg sm:text-6xl md:text-7xl">
          {lead.business_name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-brand-fg/70 sm:text-xl">
          {vertical.heroSubhead(lead)}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button className="h-12 bg-brand-hero px-6 text-base font-semibold text-brand-hero-fg hover:bg-brand-hero-deep">
            {vertical.primaryCtaLabel}
            <ArrowRight className="ml-2 size-4" />
          </Button>
          {tel && (
            <a
              href={tel}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-brand-fg/20 bg-transparent px-6 text-base font-semibold text-brand-fg hover:bg-brand-fg/5",
              )}
            >
              <Phone className="mr-2 size-4" />
              {lead.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroSplit({ lead, vertical }: Props) {
  const tel = telHref(lead);
  const rating = lead.place_rating ?? null;
  const reviewCount = lead.place_review_count ?? null;
  const years = lead.years_in_business ?? null;
  const showStats = rating !== null || years !== null;

  return (
    <section className="relative overflow-hidden bg-brand-hero text-brand-hero-fg">
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
            {vertical.heroEyebrow(lead)}
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
            {lead.business_name}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-hero-fg/80">
            {vertical.heroSubhead(lead)}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button className="h-12 bg-brand-accent px-6 text-base font-semibold text-brand-fg hover:bg-brand-accent/90">
              {vertical.primaryCtaLabel}
              <ArrowRight className="ml-2 size-4" />
            </Button>
            {tel && (
              <a
                href={tel}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 border-brand-hero-fg/30 bg-transparent px-6 text-base font-semibold text-brand-hero-fg hover:bg-brand-hero-fg/10 hover:text-brand-hero-fg",
                )}
              >
                <Phone className="mr-2 size-4" />
                {lead.phone}
              </a>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-brand-hero-fg/15 bg-brand-hero-deep/40 p-8 md:p-10">
          {rating !== null && (
            <div>
              <div className="flex items-center gap-2">
                <Star className="size-5 fill-brand-accent text-brand-accent" />
                <span className="text-4xl font-bold">{rating.toFixed(1)}</span>
              </div>
              <p className="mt-1 text-sm text-brand-hero-fg/70">
                {reviewCount
                  ? `${reviewCount.toLocaleString()} verified reviews`
                  : "verified reviews"}
              </p>
            </div>
          )}
          {years !== null && (
            <div
              className={
                rating !== null
                  ? "mt-8 border-t border-brand-hero-fg/15 pt-8"
                  : ""
              }
            >
              <p className="text-4xl font-bold">{years}+</p>
              <p className="mt-1 text-sm text-brand-hero-fg/70">
                years in business
              </p>
            </div>
          )}
          {!showStats && (
            <p className="text-brand-hero-fg/60">
              Local, licensed, and trusted by neighbors.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
