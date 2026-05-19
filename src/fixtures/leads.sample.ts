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
  },
];
