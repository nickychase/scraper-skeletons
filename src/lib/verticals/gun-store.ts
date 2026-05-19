import {
  Award,
  Clock,
  Crosshair,
  Gift,
  Package,
  ShieldCheck,
  ShoppingBag,
  Star,
  Wrench,
} from "lucide-react";
import type { VerticalData } from "@/lib/types/vertical";

export const gunStoreVertical: VerticalData = {
  key: "gun-store",

  heroEyebrow: (lead) =>
    lead.city ? `★  Gun Shop in ${lead.city}  ★` : "★  Your Local Gun Shop  ★",

  heroSubhead: () =>
    "Purveyors of Guns, Ammo, Cowboy Necessaries & AR Style Weaponry. Serving collectors, hunters, and enthusiasts since 1991.",

  primaryCtaLabel: "Visit Our Store",

  trustClaims: [
    { Icon: Award, label: "Serving Murrieta Since 1991" },
    { Icon: ShieldCheck, label: "Licensed FFL Dealer" },
    { Icon: Clock, label: "Open Mon–Sat, 10am–6pm" },
  ],

  services: [
    {
      Icon: Crosshair,
      name: "Handguns & Rifles",
      blurb:
        "New and used handguns, shotguns, and rifles from top manufacturers — for every skill level and purpose.",
    },
    {
      Icon: Package,
      name: "Ammunition",
      blurb:
        "A wide selection of pistol, rifle, and shotgun ammo — from range rounds to premium self-defense loads.",
    },
    {
      Icon: Wrench,
      name: "AR-Style Rifles",
      blurb:
        "Modern sporting rifles, AR-platform builds, parts, and accessories for competition and recreation.",
    },
    {
      Icon: Star,
      name: "Cowboy Necessaries",
      blurb:
        "Western-style gear, holsters, leather goods, and cowboy action shooting equipment for the discerning enthusiast.",
    },
    {
      Icon: ShoppingBag,
      name: "Accessories & Apparel",
      blurb:
        "Optics, cleaning kits, gun safes, holsters, and branded clothing — everything the shooter needs.",
    },
    {
      Icon: Gift,
      name: "Gift Cards",
      blurb:
        "Give the gift of choice. Gift cards redeemable in-store on any purchase — perfect for any enthusiast.",
    },
  ],

  servicesHeading: () => "Everything the Shooting Enthusiast Needs",
  servicesSubhead:
    "From first-time buyers to seasoned collectors — we carry it all under one roof in Historic Downtown Murrieta.",

  contactHeading: "Come See Us In Store",
  contactSubhead:
    "Located in Historic Downtown Murrieta. Open Mon–Sat, 10am–6pm. Walk-ins welcome.",
  contactFormLabel: "Send a Message",
  contactFormSubhead:
    "Have a question about inventory or pricing? We'll get back to you promptly.",

  heroBannerSrc: "/shootist/header.jpg",
  storefrontSrc: "/shootist/Shootist-Outside.gif",
};
