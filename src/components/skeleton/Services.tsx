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
    <section className="bg-brand-card">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
            What we do
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl">
            Full-service plumbing for {lead.city ?? "your home"}
          </h2>
          <p className="mt-4 text-lg text-brand-fg/70">
            From routine maintenance to emergency repairs — one call, done
            right.
          </p>
        </div>

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
