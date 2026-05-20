// Google Places API wrapper for the `generate-skeleton` skill's research step.
// Pure HTTP — no SDK dependency. Returns nulls when API key is absent so the
// caller can fall back gracefully.

const PLACES_BASE = "https://maps.googleapis.com/maps/api/place";

function getPlacesKey(): string | null {
  return process.env.GOOGLE_PLACES_API_KEY ?? null;
}

export function hasPlacesConfig(): boolean {
  return Boolean(getPlacesKey());
}

export type PlacesReview = {
  author_name: string;
  rating: number;
  text: string;
  time: number;
};

export type PlacesPhoto = {
  photo_reference: string;
  width: number;
  height: number;
};

export type PlacesDetails = {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry?: { location: { lat: number; lng: number } };
  rating?: number;
  user_ratings_total?: number;
  formatted_phone_number?: string;
  website?: string;
  reviews?: PlacesReview[];
  photos?: PlacesPhoto[];
  opening_hours?: { weekday_text?: string[] };
  business_status?: string;
  types?: string[];
};

// Text Search — returns the top-matching place_id for the query, or null.
export async function searchPlace(query: string): Promise<string | null> {
  const key = getPlacesKey();
  if (!key) return null;

  const url = new URL(`${PLACES_BASE}/textsearch/json`);
  url.searchParams.set("query", query);
  url.searchParams.set("key", key);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = (await res.json()) as {
    status?: string;
    results?: { place_id: string }[];
  };
  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(`Places textsearch failed: ${data.status}`);
  }
  return data.results?.[0]?.place_id ?? null;
}

// Place Details — full info including reviews and photo refs.
export async function getPlaceDetails(
  placeId: string,
): Promise<PlacesDetails | null> {
  const key = getPlacesKey();
  if (!key) return null;

  const fields = [
    "place_id",
    "name",
    "formatted_address",
    "geometry/location",
    "rating",
    "user_ratings_total",
    "formatted_phone_number",
    "website",
    "reviews",
    "photos",
    "opening_hours",
    "business_status",
    "types",
  ].join(",");

  const url = new URL(`${PLACES_BASE}/details/json`);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", fields);
  url.searchParams.set("key", key);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = (await res.json()) as {
    status?: string;
    result?: PlacesDetails;
  };
  if (data.status !== "OK") {
    throw new Error(`Places details failed: ${data.status}`);
  }
  return data.result ?? null;
}

// Build a fetchable image URL for a photo reference. The key is exposed in
// the URL — fine for localhost demos, NOT fine if the URL ever ships to prod.
// Restrict the key in GCP Console (referrer / IP) before reusing this in any
// public context.
export function photoUrl(photoRef: string, maxWidth = 1200): string | null {
  const key = getPlacesKey();
  if (!key) return null;
  return `${PLACES_BASE}/photo?maxwidth=${maxWidth}&photo_reference=${photoRef}&key=${key}`;
}
