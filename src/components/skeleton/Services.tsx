import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

type Props = { lead: Lead; vertical: VerticalData };

// Services has two layouts:
//   - grid (default): 2x3 card grid with icon, name, blurb
//   - list: vertical list with icon-left, name-right; more editorial feel
export function Services({ lead, vertical }: Props) {
  const variant = lead.services_variant ?? "grid";
  return variant === "list" ? (
    <ServicesList lead={lead} vertical={vertical} />
  ) : (
    <ServicesGrid lead={lead} vertical={vertical} />
  );
}

function ServicesHeader({ lead }: { lead: Lead }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
        What we do
      </p>
      <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl">
        {lead.city ? `Services across ${lead.city}` : "Our services"}
      </h2>
      <p className="mt-4 text-lg text-brand-fg/70">
        Local craft, done right the first time. One call, end-to-end.
      </p>
    </div>
  );
}

function ServicesGrid({ lead, vertical }: Props) {
  return (
    <section className="bg-brand-card">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <ServicesHeader lead={lead} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vertical.services.map(({ Icon, name, blurb }) => (
            <div
              key={name}
              className="group rounded-xl border border-brand-fg/10 bg-brand-bg/50 p-6 transition-colors hover:border-brand-accent/40 hover:bg-brand-bg"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-brand-hero text-brand-accent">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-brand-fg">
                {name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-fg/70">
                {blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesList({ lead, vertical }: Props) {
  return (
    <section className="bg-brand-card">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <ServicesHeader lead={lead} />
        <div className="mt-14 divide-y divide-brand-fg/10 border-y border-brand-fg/10">
          {vertical.services.map(({ Icon, name, blurb }) => (
            <div
              key={name}
              className="grid grid-cols-[auto_1fr] gap-6 py-6 sm:gap-10 sm:py-8"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-brand-hero text-brand-accent">
                <Icon className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-fg sm:text-2xl">
                  {name}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-brand-fg/70">
                  {blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
