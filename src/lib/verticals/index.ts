import type { Lead } from "@/lib/types/lead";
import type { VerticalData, VerticalKey } from "@/lib/types/vertical";
import { gunStoreVertical } from "./gun-store";
import { plumberVertical } from "./plumber";

const VERTICALS: Record<VerticalKey, VerticalData> = {
  plumber: plumberVertical,
  "gun-store": gunStoreVertical,
};

export function getVerticalForLead(lead: Lead): VerticalData {
  const q = (lead.query ?? "").toLowerCase();
  if (q.includes("gun") || q.includes("firearm") || q.includes("ammo")) {
    return VERTICALS["gun-store"];
  }
  return VERTICALS.plumber;
}
