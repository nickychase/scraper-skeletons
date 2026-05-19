import {
  Award,
  CalendarCheck,
  Clock,
  Droplets,
  Flame,
  Hammer,
  Heart,
  ShieldCheck,
  ShowerHead,
  Siren,
  Users,
  Wrench,
} from "lucide-react";
import type { VerticalData } from "@/lib/types/vertical";

const FALLBACK_OWNER = "our family";
const FALLBACK_YEARS = 20;

export const plumberVertical: VerticalData = {
  key: "plumber",

  sections: [
    "hero",
    "trust",
    "services",
    "gallery",
    "about",
    "serviceArea",
    "contact",
  ],

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

  about: {
    eyebrow: "Our Story",
    heading: (lead) =>
      lead.owner_name
        ? `Built by ${lead.owner_name}. Run like family.`
        : `Family-owned. Built on trust.`,
    copy: (lead) => {
      const owner = lead.owner_name ?? FALLBACK_OWNER;
      const years = lead.years_in_business ?? FALLBACK_YEARS;
      const city = lead.city ?? "the area";
      return `For more than ${years} years, ${owner} and our team have helped homeowners across ${city} keep the water running, the heat on, and the pipes where they belong. We answer our own phone, we show up when we say we will, and we treat every house like it’s our own. No high-pressure upsells, no surprise add-ons — just straight talk and clean work.`;
    },
    claims: [
      {
        Icon: CalendarCheck,
        label: (lead) =>
          lead.years_in_business
            ? `Serving since ${new Date().getFullYear() - lead.years_in_business}`
            : "Decades of local service",
      },
      {
        Icon: Users,
        label: () => "Family-owned & operated",
      },
      {
        Icon: Award,
        label: (lead) =>
          lead.license_number
            ? `Master Plumber ${lead.license_number}`
            : "Licensed Master Plumber on every job",
      },
    ],
  },

  hours: {
    schedule: [
      { day: "Mon – Fri", hours: "7:00 AM – 7:00 PM" },
      { day: "Saturday", hours: "8:00 AM – 4:00 PM" },
      { day: "Sunday", hours: "Emergency only" },
    ],
    emergencyNote: "24/7 for burst pipes, gas leaks, and sewer backups",
  },

  // PLACEHOLDER PHOTOS — sourced from Unsplash search results 2026-05-18.
  // Swap in curated photos once specific shots are chosen; layout is the goal here.
  gallery: {
    eyebrow: "Our Work",
    heading: (lead) =>
      lead.city
        ? `Recent jobs around ${lead.city}`
        : "Recent jobs around the metro",
    blurb: () =>
      "Real homes, real fixes. Tap any photo for a closer look.",
    items: [
      {
        id: 1,
        type: "image",
        title: "Meet the team",
        desc: "Uniformed, licensed, and on time. Every job, every house.",
        url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-2 sm:row-span-3 md:col-span-2 md:row-span-4",
      },
      {
        id: 2,
        type: "image",
        title: "Bathroom rework",
        desc: "Replumbed a full master bath, no tile damage.",
        url: "https://images.unsplash.com/photo-1749532125405-70950966b0e5?w=900&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
      },
      {
        id: 3,
        type: "image",
        title: "On the job",
        desc: "Our team shows up uniformed and ready.",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
      },
      {
        id: 4,
        type: "image",
        title: "Clean copper work",
        desc: "PEX or copper, runs done right.",
        url: "https://images.unsplash.com/photo-1694827893591-af9b80361599?w=600&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
      },
      {
        id: 5,
        type: "image",
        title: "In-wall pipe repair",
        desc: "Found, fixed, and patched without tearing up the room.",
        url: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=900&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
      },
      {
        id: 6,
        type: "image",
        title: "Fixture installs",
        desc: "Faucets, valves, and trim — set to last.",
        url: "https://images.unsplash.com/photo-1542013936693-884638332954?w=900&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
      },
    ],
  },

  serviceArea: {
    eyebrow: "Where we work",
    heading: (lead) =>
      lead.city
        ? `Serving ${lead.city} and the surrounding metro`
        : "Serving the surrounding metro",
    blurb: (lead) =>
      lead.city
        ? `Based in ${lead.city} and on call across the metro. If you’re nearby, we’re probably already in your neighborhood.`
        : "On call across the metro. If you’re nearby, we’re probably already in your neighborhood.",
    defaultCities: [
      "Austin",
      "Round Rock",
      "Cedar Park",
      "Pflugerville",
      "Leander",
      "Georgetown",
      "Buda",
      "Kyle",
    ],
  },
};
