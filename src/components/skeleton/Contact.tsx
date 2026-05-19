import { Clock, MapPin, Phone, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";

export function Contact({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  const telHref = lead.phone
    ? `tel:${lead.phone.replace(/[^\d+]/g, "")}`
    : undefined;

  const { schedule, emergencyNote } = vertical.hours;

  return (
    <section className="bg-brand-bg">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-brand-accent">
              Get in touch
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl">
              Ready when you are
            </h2>
            <p className="mt-4 text-lg text-brand-fg/70">
              Same-day appointments available. We&apos;ll show up on time and
              quote you straight.
            </p>

            <div className="mt-10 space-y-5">
              {lead.phone && (
                <a
                  href={telHref}
                  className="flex items-start gap-4 text-brand-fg hover:text-brand-fg/80"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-hero text-brand-accent">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium uppercase tracking-wider text-brand-fg/50">
                      Call us
                    </span>
                    <span className="mt-0.5 block text-xl font-semibold">
                      {lead.phone}
                    </span>
                  </span>
                </a>
              )}

              <div className="flex items-start gap-4 text-brand-fg">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-hero text-brand-accent">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium uppercase tracking-wider text-brand-fg/50">
                    Service area
                  </span>
                  <span className="mt-0.5 block text-base font-medium">
                    {lead.address}
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-4 text-brand-fg">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-hero text-brand-accent">
                  <Clock className="size-5" />
                </span>
                <span className="grow">
                  <span className="block text-sm font-medium uppercase tracking-wider text-brand-fg/50">
                    Hours
                  </span>
                  <dl className="mt-1.5 space-y-1 text-base">
                    {schedule.map(({ day, hours }) => (
                      <div
                        key={day}
                        className="flex items-baseline justify-between gap-6"
                      >
                        <dt className="font-medium text-brand-fg/80">
                          {day}
                        </dt>
                        <dd className="font-semibold text-brand-fg">
                          {hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {emergencyNote && (
                    <span className="mt-3 inline-flex items-center gap-2 rounded-md bg-brand-accent/20 px-3 py-1.5 text-sm font-semibold text-brand-fg">
                      <Siren className="size-4 text-brand-fg" />
                      {emergencyNote}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-fg/10 bg-brand-card p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-brand-fg">
              Request a quote
            </h3>
            <p className="mt-2 text-sm text-brand-fg/60">
              We&apos;ll get back to you within the hour during business hours.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-brand-fg"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1.5 w-full rounded-lg border border-brand-fg/15 bg-brand-bg/40 px-4 py-2.5 text-brand-fg outline-none focus:border-brand-accent focus:bg-brand-card focus:ring-2 focus:ring-brand-accent/30"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-brand-fg"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-1.5 w-full rounded-lg border border-brand-fg/15 bg-brand-bg/40 px-4 py-2.5 text-brand-fg outline-none focus:border-brand-accent focus:bg-brand-card focus:ring-2 focus:ring-brand-accent/30"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-brand-fg"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1.5 w-full resize-none rounded-lg border border-brand-fg/15 bg-brand-bg/40 px-4 py-2.5 text-brand-fg outline-none focus:border-brand-accent focus:bg-brand-card focus:ring-2 focus:ring-brand-accent/30"
                />
              </div>
              <Button
                type="button"
                className="h-12 w-full bg-brand-hero text-base font-semibold text-brand-hero-fg hover:bg-brand-hero-deep"
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
