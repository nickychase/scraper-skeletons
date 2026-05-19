import {
  Award,
  CalendarCheck,
  Car,
  Gem,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Sun,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import type { VerticalData } from "@/lib/types/vertical";

const FALLBACK_OWNER = "our crew";
const FALLBACK_YEARS = 6;

export const detailingVertical: VerticalData = {
  key: "detailing",

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
    lead.city ? `Mobile detailing in ${lead.city}` : "Mobile auto detailing",

  heroSubhead: (lead) =>
    lead.city
      ? `Professional mobile detailing across ${lead.city} and the surrounding metro. We come to you — driveway, office lot, or curbside.`
      : "Professional mobile detailing. We come to you — driveway, office lot, or curbside.",

  heroImage: {
    url: "https://images.unsplash.com/photo-1697908833194-e29be25dea12?w=1800&q=85&auto=format&fit=crop",
    alt: "Dark glossy luxury car after a full detail",
  },

  primaryCtaLabel: "Book a detail",

  trustClaims: [
    { Icon: ShieldCheck, label: "Insured & Bonded" },
    { Icon: Gem, label: "Ceramic Coating Certified" },
    { Icon: Truck, label: "Mobile — We Come to You" },
  ],

  services: [
    {
      Icon: SprayCan,
      name: "Full Detail",
      blurb:
        "Hand wash, decontamination, interior shampoo, leather conditioning, and a finishing wax. The works.",
    },
    {
      Icon: Sparkles,
      name: "Paint Correction",
      blurb:
        "Multi-stage machine polishing to remove swirls, scratches, and oxidation before sealing the finish.",
    },
    {
      Icon: Gem,
      name: "Ceramic Coating",
      blurb:
        "Long-life nano-ceramic protection. Hydrophobic, UV-resistant, and bonded for 2–5 years.",
    },
    {
      Icon: Car,
      name: "Interior Detail",
      blurb:
        "Deep extraction on carpets and upholstery, plus leather, vinyl, and trim restoration.",
    },
    {
      Icon: Sun,
      name: "Headlight Restoration",
      blurb:
        "Cloudy, yellowed lenses cleared and resealed — brighter beams and a cleaner front end.",
    },
    {
      Icon: Wrench,
      name: "Paint Protection Film",
      blurb:
        "Self-healing PPF on high-impact areas — hood, fenders, mirrors — installed clean.",
    },
  ],

  about: {
    eyebrow: "Our Story",
    heading: (lead) =>
      lead.owner_name
        ? `${lead.owner_name}'s mobile detailing crew.`
        : "A mobile detailing crew that takes pride in the finish.",
    copy: (lead) => {
      const owner = lead.owner_name ?? FALLBACK_OWNER;
      const years = lead.years_in_business ?? FALLBACK_YEARS;
      const city = lead.city ?? "the area";
      return `For ${years} years, ${owner} has been detailing cars across ${city} the right way — by hand, with the right products, and with enough time to do it properly. We work out of a fully equipped mobile rig so the only thing you have to do is point at the keys. No shop, no shuttle, no waiting room.`;
    },
    claims: [
      {
        Icon: CalendarCheck,
        label: (lead) =>
          lead.years_in_business
            ? `Detailing since ${new Date().getFullYear() - lead.years_in_business}`
            : "Years of detailing experience",
      },
      {
        Icon: Users,
        label: () => "Owner-operated crew",
      },
      {
        Icon: Award,
        label: (lead) =>
          lead.license_number
            ? `IDA Certified ${lead.license_number}`
            : "Certified ceramic coating installers",
      },
    ],
  },

  hours: {
    schedule: [
      { day: "Mon – Fri", hours: "8:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },

  gallery: {
    eyebrow: "Recent Work",
    heading: (lead) =>
      lead.city
        ? `Finished details around ${lead.city}`
        : "Recent finished details",
    blurb: () =>
      "Mirror finishes, deep interior cleans, paint correction. Tap any photo for a closer look.",
    items: [
      {
        id: 1,
        type: "image",
        title: "After ceramic coating",
        desc: "Mirror finish, sealed and protected for years.",
        url: "https://images.unsplash.com/photo-1528597469186-bddab681a37f?w=900&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-2 sm:row-span-3 md:col-span-2 md:row-span-4",
      },
      {
        id: 2,
        type: "image",
        title: "Hand-polished by us",
        desc: "Microfiber-only, no shortcuts. Every panel hand-buffed.",
        url: "https://images.unsplash.com/photo-1732357624591-f2137085659b?w=900&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
      },
      {
        id: 3,
        type: "image",
        title: "Interior detail",
        desc: "Leather and trim deep-cleaned, conditioned, and protected.",
        url: "https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?w=600&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
      },
      {
        id: 4,
        type: "image",
        title: "Wheels & tires",
        desc: "Faces, barrels, calipers — every wheel detailed off-car when needed.",
        url: "https://images.unsplash.com/photo-1708805283017-c662be2c7a44?w=600&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
      },
      {
        id: 5,
        type: "image",
        title: "Paint correction",
        desc: "Swirls and scratches refined out before sealing.",
        url: "https://images.unsplash.com/photo-1632823469901-5d2cfff5ba50?w=900&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
      },
      {
        id: 6,
        type: "image",
        title: "Finishing details",
        desc: "Badges, trim, and seams — we sweat the small things.",
        url: "https://images.unsplash.com/photo-1542328689-df6c076c1604?w=900&q=80&auto=format&fit=crop",
        span: "col-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
      },
    ],
  },

  serviceArea: {
    eyebrow: "Where we go",
    heading: (lead) =>
      lead.city
        ? `Serving ${lead.city} and the surrounding metro`
        : "Serving the surrounding metro",
    blurb: (lead) =>
      lead.city
        ? `Mobile across ${lead.city} and nearby cities. We bring water, power, and everything else — you just point at the car.`
        : "Mobile across the metro. We bring water, power, and everything else — you just point at the car.",
    defaultCities: [
      "Riverside",
      "Corona",
      "Moreno Valley",
      "Eastvale",
      "Norco",
      "Jurupa Valley",
      "Rubidoux",
      "Mira Loma",
    ],
  },
};
