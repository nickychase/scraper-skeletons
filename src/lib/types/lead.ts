import { z } from "zod";
import {
  sheetsBool,
  sheetsNullableNumber,
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
});

export type Lead = z.infer<typeof leadSchema>;
