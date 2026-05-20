import { z } from "zod";
import {
  galleryItemSchema,
  galleryVariantSchema,
  heroVariantSchema,
  servicesVariantSchema,
} from "./sections";
import {
  sheetsBool,
  sheetsNullableNumber,
  sheetsOptionalNumber,
  sheetsOptionalString,
  sheetsString,
  sheetsTimestamp,
} from "./sheets-coerce";

export const TIER_VALUES = ["hot", "warm", "cold"] as const;
export const tierSchema = z.enum(TIER_VALUES);
export type Tier = z.infer<typeof tierSchema>;

export const STATUS_VALUES = [
  "new",
  "contacted",
  "replied",
  "meeting",
  "converted",
  "dead",
] as const;
export const statusSchema = z.enum(STATUS_VALUES);
export type LeadStatus = z.infer<typeof statusSchema>;

// Mirrors the agreed Google Sheet column contract. Kept in sync with the
// scraper-dashboard schema by hand — see ../../README.md for the rationale.
export const leadSchema = z.object({
  place_id: sheetsString,
  scraped_at: sheetsString,
  updated_at: sheetsString,
  query: sheetsString,

  business_name: sheetsString,
  address: sheetsString,
  city: sheetsOptionalString,
  state: sheetsOptionalString,
  lat: sheetsNullableNumber,
  lng: sheetsNullableNumber,
  phone: sheetsOptionalString,
  place_rating: sheetsNullableNumber,
  place_review_count: sheetsNullableNumber,

  website_url: sheetsOptionalString,
  has_website: sheetsBool,
  pagespeed_score: sheetsNullableNumber,
  pagespeed_fetched_at: sheetsTimestamp,
  html_title: sheetsOptionalString,

  tier: tierSchema,
  tier_reason: sheetsOptionalString,

  skeleton_built: sheetsBool,
  skeleton_preview_url: sheetsOptionalString,
  notified_at: sheetsTimestamp,
  status: statusSchema,
  last_status_at: sheetsTimestamp,
  notes: sheetsOptionalString,

  // Polish-wave optional fields (2026-05-18). Sheets columns are optional;
  // every field falls back gracefully when absent. Mirror in scraper-dashboard
  // when the corresponding columns are added.
  owner_name: sheetsOptionalString,
  years_in_business: sheetsOptionalNumber,
  license_number: sheetsOptionalString,
  service_areas: sheetsOptionalString,
  business_hours: sheetsOptionalString,
  place_review_snippet_1: sheetsOptionalString,
  place_review_author_1: sheetsOptionalString,
  place_review_snippet_2: sheetsOptionalString,
  place_review_author_2: sheetsOptionalString,

  // Per-prospect skeleton fields (2026-05-19). Populated locally by the
  // `generate-skeleton` skill — not synced to the Sheet (localhost-only pivot).
  // Each is an override; absent → vertical default applies.
  palette_variant: sheetsOptionalString, // e.g. "warm", "cool", "modern"
  hero_image_url: sheetsOptionalString,
  hero_image_alt: sheetsOptionalString,
  gallery_items: z.array(galleryItemSchema).optional(),
  hero_variant: heroVariantSchema.optional(),
  services_variant: servicesVariantSchema.optional(),
  gallery_variant: galleryVariantSchema.optional(),
});

export type Lead = z.infer<typeof leadSchema>;
