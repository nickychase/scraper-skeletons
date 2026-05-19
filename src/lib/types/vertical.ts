import type { LucideIcon } from "lucide-react";
import type { Lead } from "@/lib/types/lead";

export type VerticalKey = "plumber" | "detailing";

export type SectionKey =
  | "hero"
  | "trust"
  | "services"
  | "about"
  | "gallery"
  | "serviceArea"
  | "contact";

export type ServiceItem = {
  Icon: LucideIcon;
  name: string;
  blurb: string;
};

export type TrustClaim = {
  Icon: LucideIcon;
  label: string;
};

export type AboutClaim = {
  Icon: LucideIcon;
  label: (lead: Lead) => string;
};

export type AboutData = {
  eyebrow: string;
  heading: (lead: Lead) => string;
  copy: (lead: Lead) => string;
  claims: AboutClaim[];
};

export type ServiceAreaData = {
  eyebrow: string;
  heading: (lead: Lead) => string;
  blurb: (lead: Lead) => string;
  defaultCities: string[];
};

export type HoursRow = {
  day: string;
  hours: string;
};

export type HoursData = {
  schedule: HoursRow[];
  emergencyNote?: string;
};

export type GalleryItem = {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  span: string;
};

export type GalleryData = {
  eyebrow: string;
  heading: (lead: Lead) => string;
  blurb: (lead: Lead) => string;
  items: GalleryItem[];
};

export type HeroImage = {
  url: string;
  alt: string;
};

export type VerticalData = {
  key: VerticalKey;
  sections: SectionKey[];
  heroEyebrow: (lead: Lead) => string;
  heroSubhead: (lead: Lead) => string;
  heroImage?: HeroImage;
  primaryCtaLabel: string;
  trustClaims: TrustClaim[];
  services: ServiceItem[];
  about: AboutData;
  hours: HoursData;
  serviceArea?: ServiceAreaData;
  gallery?: GalleryData;
};
