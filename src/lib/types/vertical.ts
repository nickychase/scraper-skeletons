import type { LucideIcon } from "lucide-react";
import type { Lead } from "@/lib/types/lead";

export type VerticalKey = "plumber" | "gun-store";

export type ServiceItem = {
  Icon: LucideIcon;
  name: string;
  blurb: string;
};

export type TrustClaim = {
  Icon: LucideIcon;
  label: string;
};

export type VerticalData = {
  key: VerticalKey;
  heroEyebrow: (lead: Lead) => string;
  heroSubhead: (lead: Lead) => string;
  primaryCtaLabel: string;
  trustClaims: TrustClaim[];
  services: ServiceItem[];
  servicesHeading: (lead: Lead) => string;
  servicesSubhead: string;
  contactHeading: string;
  contactSubhead: string;
  contactFormLabel: string;
  contactFormSubhead: string;
  heroBannerSrc?: string;
  storefrontSrc?: string;
};
