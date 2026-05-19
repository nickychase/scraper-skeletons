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

  return (
    <section className="relative overflow-hidden bg-plumber-navy text-plumber-cream">
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
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-plumber-yellow/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-plumber-yellow">
          {vertical.heroEyebrow(lead)}
        </p>
        <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          {lead.business_name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-plumber-cream/80 sm:text-xl">
          {vertical.heroSubhead(lead)}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button className="h-12 bg-plumber-yellow px-6 text-base font-semibold text-plumber-navy hover:bg-plumber-yellow/90">
            {vertical.primaryCtaLabel}
            <ArrowRight className="ml-2 size-4" />
          </Button>
          {telHref && (
            <a
              href={telHref}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-plumber-cream/30 bg-transparent px-6 text-base font-semibold text-plumber-cream hover:bg-plumber-cream/10 hover:text-plumber-cream",
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
