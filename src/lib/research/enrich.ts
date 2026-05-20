// Research-driven enrichment of a Lead for the `generate-skeleton` skill.
//
// Given a business name (+ optional city), look up Google Places, populate
// real fields where possible, return a `Partial<Lead>` plus notes about what
// was found / missing.
//
// Run from the CLI:
//   npx tsx src/lib/research/enrich.ts "Patel Family Plumbing" "Austin"
//
// Set `GOOGLE_PLACES_API_KEY` in `.env.local` for real research; without it,
// the function returns a minimal lead so the skill can still continue.

import { saveLocalProspect } from "@/lib/local-prospects/store";
import { leadSchema, type Lead } from "@/lib/types/lead";
import type { GalleryItem } from "@/lib/types/sections";
import {
  getPlaceDetails,
  hasPlacesConfig,
  photoUrl,
  searchPlace,
} from "./places";

export type EnrichSource = "places" | "minimal";

export type EnrichResult = {
  lead: Partial<Lead>;
  source: EnrichSource;
  notes: string[];
};

export async function enrichLead(
  businessName: string,
  city?: string,
): Promise<EnrichResult> {
  const notes: string[] = [];

  if (!hasPlacesConfig()) {
    notes.push(
      "GOOGLE_PLACES_API_KEY not set — returning minimal lead. Set the key in .env.local for real research.",
    );
    return {
      lead: minimalLead(businessName, city),
      source: "minimal",
      notes,
    };
  }

  const query = city ? `${businessName} ${city}` : businessName;
  const placeId = await searchPlace(query);

  if (!placeId) {
    notes.push(`No Places result for "${query}". Returning minimal lead.`);
    return { lead: minimalLead(businessName, city), source: "minimal", notes };
  }

  const details = await getPlaceDetails(placeId);
  if (!details) {
    notes.push(`Place ID ${placeId} returned no details. Returning minimal lead.`);
    return { lead: minimalLead(businessName, city), source: "minimal", notes };
  }

  const now = new Date().toISOString();

  const addressParts = details.formatted_address
    .split(",")
    .map((p) => p.trim());
  const stateZip = addressParts[addressParts.length - 2] ?? "";
  const parsedCity = addressParts[addressParts.length - 3] ?? city;
  const parsedState = stateZip.split(" ")[0] || undefined;

  const reviews = details.reviews ?? [];
  const review1 = reviews[0];
  const review2 = reviews[1];

  const photos = details.photos ?? [];
  const heroPhotoRef = photos[0]?.photo_reference;
  const heroImageUrl = heroPhotoRef ? photoUrl(heroPhotoRef, 1800) : undefined;

  const galleryItems: GalleryItem[] = photos.slice(1, 7).map((p, idx) => ({
    id: idx + 1,
    type: "image" as const,
    title: `Recent work ${idx + 1}`,
    desc: `Photo from ${details.name}.`,
    url: photoUrl(p.photo_reference, 900) ?? "",
    span:
      idx === 0
        ? "col-span-1 sm:col-span-2 sm:row-span-3 md:col-span-2 md:row-span-4"
        : idx <= 2
          ? "col-span-1 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2"
          : "col-span-1 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  }));

  const lead: Partial<Lead> = {
    place_id: details.place_id,
    scraped_at: now,
    updated_at: now,
    query,
    business_name: details.name,
    address: details.formatted_address,
    city: parsedCity,
    state: parsedState,
    lat: details.geometry?.location.lat ?? null,
    lng: details.geometry?.location.lng ?? null,
    phone: details.formatted_phone_number,
    place_rating: details.rating ?? null,
    place_review_count: details.user_ratings_total ?? null,
    website_url: details.website,
    has_website: Boolean(details.website),
    pagespeed_score: null,
    pagespeed_fetched_at: undefined,
    html_title: undefined,
    tier: "hot",
    tier_reason: details.website
      ? "places-enriched with website"
      : "places-enriched, no website",
    skeleton_built: false,
    skeleton_preview_url: undefined,
    notified_at: undefined,
    status: "new",
    last_status_at: undefined,
    notes: undefined,
    business_hours: details.opening_hours?.weekday_text?.join("; "),
    place_review_snippet_1: review1?.text?.slice(0, 320),
    place_review_author_1: review1?.author_name,
    place_review_snippet_2: review2?.text?.slice(0, 320),
    place_review_author_2: review2?.author_name,
    hero_image_url: heroImageUrl ?? undefined,
    hero_image_alt: heroImageUrl ? `Exterior of ${details.name}` : undefined,
    gallery_items: galleryItems.length > 0 ? galleryItems : undefined,
  };

  if (!details.formatted_phone_number) notes.push("No phone in Places data.");
  if (reviews.length < 2)
    notes.push(`Only ${reviews.length} reviews returned from Places.`);
  if (photos.length < 3)
    notes.push(`Only ${photos.length} photos returned from Places.`);
  if (!details.website)
    notes.push("Business has no website on file — likely a strong skeleton candidate.");

  return { lead, source: "places", notes };
}

function minimalLead(businessName: string, city?: string): Partial<Lead> {
  const now = new Date().toISOString();
  const slug = `local_${Buffer.from(businessName)
    .toString("base64url")
    .slice(0, 20)}`;
  return {
    place_id: slug,
    scraped_at: now,
    updated_at: now,
    query: businessName,
    business_name: businessName,
    address: city ? `${city}, US` : "Unknown",
    city,
    state: undefined,
    lat: null,
    lng: null,
    phone: undefined,
    place_rating: null,
    place_review_count: null,
    website_url: undefined,
    has_website: false,
    pagespeed_score: null,
    pagespeed_fetched_at: undefined,
    html_title: undefined,
    tier: "hot",
    tier_reason: "manual entry — no research source available",
    skeleton_built: false,
    skeleton_preview_url: undefined,
    notified_at: undefined,
    status: "new",
    last_status_at: undefined,
    notes: undefined,
  };
}

// CLI entrypoint.
//   npx tsx src/lib/research/enrich.ts "Business Name" "City"
//   npx tsx src/lib/research/enrich.ts "Business Name" "City" --save
//
// With --save: validates the enriched lead, writes to prospects.local.json,
// and prints the localhost URL on stderr alongside the JSON on stdout.
async function main() {
  const args = process.argv.slice(2);
  const save = args.includes("--save");
  const positional = args.filter((a) => !a.startsWith("--"));
  const [businessName, city] = positional;

  if (!businessName) {
    console.error(
      'Usage: tsx src/lib/research/enrich.ts "Business Name" "City (optional)" [--save]',
    );
    process.exit(1);
  }

  const result = await enrichLead(businessName, city);

  if (save) {
    const parsed = leadSchema.safeParse(result.lead);
    if (!parsed.success) {
      console.error(
        "Enriched lead failed schema validation — refusing to save.",
      );
      console.error(JSON.stringify(parsed.error.issues, null, 2));
      console.log(JSON.stringify(result, null, 2));
      process.exit(2);
    }
    await saveLocalProspect(parsed.data);
    console.error(
      `Saved to src/fixtures/prospects.local.json — open http://localhost:3000/${parsed.data.place_id}`,
    );
  }

  console.log(JSON.stringify(result, null, 2));
}

const isCli =
  typeof process !== "undefined" &&
  process.argv[1] &&
  import.meta.url === `file://${process.argv[1]}`;

if (isCli) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
