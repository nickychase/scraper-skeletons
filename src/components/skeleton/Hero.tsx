import { ArrowRight, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

export function Hero({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  const telHref = lead.phone
    ? `tel:${lead.phone.replace(/[^\d+]/g, "")}`
    : undefined;

  const { heroImage } = vertical;

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
          {telHref && (
            <a
              href={telHref}
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
