import { MapPin } from "lucide-react";
import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

function parseLeadServiceAreas(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ServiceArea({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  const { serviceArea } = vertical;
  if (!serviceArea) return null;

  const fromLead = parseLeadServiceAreas(lead.service_areas);
  const cities = fromLead.length > 0 ? fromLead : serviceArea.defaultCities;
  if (cities.length === 0) return null;

  return (
    <section className="border-y border-plumber-navy/10 bg-plumber-cream">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-plumber-yellow">
            {serviceArea.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-plumber-navy sm:text-5xl">
            {serviceArea.heading(lead)}
          </h2>
          <p className="mt-4 text-lg text-plumber-navy/70">
            {serviceArea.blurb(lead)}
          </p>
        </div>

        <ul className="mt-12 flex flex-wrap gap-3">
          {cities.map((city) => (
            <li
              key={city}
              className="inline-flex items-center gap-2 rounded-full border border-plumber-navy/15 bg-white px-4 py-2 text-sm font-semibold text-plumber-navy"
            >
              <MapPin className="size-4 text-plumber-yellow" />
              {city}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
