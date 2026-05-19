import {
  Clock,
  Droplets,
  Flame,
  Hammer,
  Heart,
  ShieldCheck,
  ShowerHead,
  Siren,
  Wrench,
} from "lucide-react";
import type { VerticalData } from "@/lib/types/vertical";

export const plumberVertical: VerticalData = {
  key: "plumber",

  heroEyebrow: (lead) =>
    lead.city ? `Plumbing in ${lead.city}` : "Local plumbing pros",

  heroSubhead: (lead) =>
    lead.city
      ? `Trusted plumbing pros serving ${lead.city} and surrounding areas. Licensed, insured, and ready when you need us.`
      : "Trusted local plumbing pros. Licensed, insured, and ready when you need us.",

  primaryCtaLabel: "Request a quote",

  trustClaims: [
    { Icon: ShieldCheck, label: "Licensed & Insured" },
    { Icon: Clock, label: "24/7 Emergency Service" },
    { Icon: Heart, label: "Family-Owned & Operated" },
  ],

  services: [
    {
      Icon: Droplets,
      name: "Drain Cleaning",
      blurb:
        "Slow drains and clogs cleared fast — kitchens, bathrooms, and main lines.",
    },
    {
      Icon: Flame,
      name: "Water Heaters",
      blurb:
        "Tank and tankless install, repair, and maintenance. Same-day service available.",
    },
    {
      Icon: Wrench,
      name: "Leak Detection & Repair",
      blurb:
        "We find hidden leaks before they cause damage — and fix them right the first time.",
    },
    {
      Icon: Siren,
      name: "Emergency Plumbing",
      blurb:
        "Burst pipes, sewer backups, no hot water — call us 24/7, holidays included.",
    },
    {
      Icon: Hammer,
      name: "Repipes & Replacements",
      blurb:
        "Galvanized, copper, or PEX — repiping done cleanly with minimal disruption.",
    },
    {
      Icon: ShowerHead,
      name: "Fixture Installation",
      blurb:
        "Faucets, toilets, garbage disposals, and water filtration installed to last.",
    },
  ],
};
