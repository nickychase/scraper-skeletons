import type { Lead } from "@/lib/types/lead";

// Minimal fixture so /[place_id] works locally without Sheets credentials.
// Mirrors a hot, no-website lead — the canonical target for a skeleton site.
export const SAMPLE_LEADS: Lead[] = [
  {
    place_id: "ChIJ_HOT_001",
    scraped_at: "2026-05-17T09:00:00-05:00",
    updated_at: "2026-05-17T09:00:00-05:00",
    query: "plumbers in austin tx",
    business_name: "Patel Family Plumbing",
    address: "412 W 5th St, Austin, TX 78701",
    city: "Austin",
    state: "TX",
    lat: 30.2683,
    lng: -97.7459,
    phone: "(512) 555-0142",
    place_rating: 4.8,
    place_review_count: 73,
    website_url: undefined,
    has_website: false,
    pagespeed_score: null,
    pagespeed_fetched_at: undefined,
    html_title: undefined,
    tier: "hot",
    tier_reason: "no site + strong reviews",
    skeleton_built: true,
    skeleton_preview_url: undefined,
    notified_at: undefined,
    status: "new",
    last_status_at: undefined,
    notes: undefined,

    owner_name: "Raj Patel",
    years_in_business: 22,
    license_number: "#M-39214",
    service_areas:
      "Austin, Round Rock, Cedar Park, Pflugerville, Leander, Georgetown, Buda, Kyle",
    business_hours: undefined,
    place_review_snippet_1:
      "Raj came out within an hour on a Sunday when our water heater failed. Clean work, fair price, and he walked me through everything before he started.",
    place_review_author_1: "Sarah M.",
    place_review_snippet_2:
      "Replaced the galvanized pipes in our 1940s bungalow with PEX. The crew was respectful of the house, cleaned up every day, and finished a day early.",
    place_review_author_2: "Daniel R.",
  },
];
