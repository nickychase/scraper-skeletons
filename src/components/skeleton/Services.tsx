import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

export function Services({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-plumber-yellow">
            What we do
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-plumber-navy sm:text-5xl">
            {vertical.servicesHeading(lead)}
          </h2>
          <p className="mt-4 text-lg text-plumber-navy/70">
            {vertical.servicesSubhead}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vertical.services.map(({ Icon, name, blurb }) => (
            <div
              key={name}
              className="group rounded-xl border border-plumber-navy/10 bg-plumber-cream/50 p-6 transition-colors hover:border-plumber-yellow/40 hover:bg-plumber-cream"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-plumber-navy text-plumber-yellow">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-plumber-navy">
                {name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-plumber-navy/70">
                {blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
