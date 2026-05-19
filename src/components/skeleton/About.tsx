import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

export function About({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  const { about } = vertical;

  return (
    <section className="bg-brand-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl">
            {about.heading(lead)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-fg/75">
            {about.copy(lead)}
          </p>
        </div>

        <ul className="grid gap-4">
          {about.claims.map(({ Icon, label }, i) => (
            <li
              key={i}
              className="flex items-center gap-4 rounded-xl border border-brand-fg/10 bg-brand-bg/60 px-6 py-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-hero text-brand-accent">
                <Icon className="size-5" />
              </span>
              <span className="text-base font-semibold text-brand-fg">
                {label(lead)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
