import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

export function Contact({ lead, vertical }: { lead: Lead; vertical: VerticalData }) {
  const telHref = lead.phone
    ? `tel:${lead.phone.replace(/[^\d+]/g, "")}`
    : undefined;

  return (
    <section className="bg-plumber-cream">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-plumber-yellow">
              Get in touch
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-plumber-navy sm:text-5xl">
              {vertical.contactHeading}
            </h2>
            <p className="mt-4 text-lg text-plumber-navy/70">
              {vertical.contactSubhead}
            </p>

            <div className="mt-10 space-y-5">
              {lead.phone && (
                <a
                  href={telHref}
                  className="flex items-start gap-4 text-plumber-navy hover:text-plumber-navy/80"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-plumber-navy text-plumber-yellow">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium uppercase tracking-wider text-plumber-navy/50">
                      Call us
                    </span>
                    <span className="mt-0.5 block text-xl font-semibold">
                      {lead.phone}
                    </span>
                  </span>
                </a>
              )}

              <div className="flex items-start gap-4 text-plumber-navy">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-plumber-navy text-plumber-yellow">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium uppercase tracking-wider text-plumber-navy/50">
                    Visit us
                  </span>
                  <span className="mt-0.5 block text-base font-medium">
                    {lead.address}
                  </span>
                </span>
              </div>
            </div>

            {vertical.storefrontSrc && (
              <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-plumber-navy/10">
                <img
                  src={vertical.storefrontSrc}
                  alt={`${lead.business_name} storefront`}
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-plumber-navy/10 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-plumber-navy">
              {vertical.contactFormLabel}
            </h3>
            <p className="mt-2 text-sm text-plumber-navy/60">
              {vertical.contactFormSubhead}
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-plumber-navy"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1.5 w-full rounded-lg border border-plumber-navy/15 bg-plumber-cream/40 px-4 py-2.5 text-plumber-navy outline-none focus:border-plumber-yellow focus:bg-white focus:ring-2 focus:ring-plumber-yellow/30"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-plumber-navy"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-1.5 w-full rounded-lg border border-plumber-navy/15 bg-plumber-cream/40 px-4 py-2.5 text-plumber-navy outline-none focus:border-plumber-yellow focus:bg-white focus:ring-2 focus:ring-plumber-yellow/30"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-plumber-navy"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1.5 w-full resize-none rounded-lg border border-plumber-navy/15 bg-plumber-cream/40 px-4 py-2.5 text-plumber-navy outline-none focus:border-plumber-yellow focus:bg-white focus:ring-2 focus:ring-plumber-yellow/30"
                />
              </div>
              <Button
                type="button"
                className="h-12 w-full bg-plumber-navy text-base font-semibold text-plumber-cream hover:bg-plumber-navy-deep"
              >
                Send request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
