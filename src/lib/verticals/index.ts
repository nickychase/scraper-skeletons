import type { Lead } from "@/lib/types/lead";
import type { VerticalData, VerticalKey } from "@/lib/types/vertical";
import { detailingVertical } from "./detailing";
import { plumberVertical } from "./plumber";

const VERTICALS: Record<VerticalKey, VerticalData> = {
  plumber: plumberVertical,
  detailing: detailingVertical,
};

// Keyword-on-lead.query dispatch. v1 — when a third vertical lands,
// promote this to a dedicated `lead.vertical` Sheet column instead of
// keyword sniffing.
export function getVerticalForLead(lead: Lead): VerticalData {
  const q = lead.query.toLowerCase();
  if (q.includes("detail")) return VERTICALS.detailing;
  return VERTICALS.plumber;
}
