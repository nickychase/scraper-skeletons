import type { Lead } from "@/lib/types/lead";
import type { VerticalData, VerticalKey } from "@/lib/types/vertical";
import { plumberVertical } from "./plumber";

const VERTICALS: Record<VerticalKey, VerticalData> = {
  plumber: plumberVertical,
};

// Future: dispatch on a lead.vertical sheet column or lead.query keywords.
export function getVerticalForLead(_lead: Lead): VerticalData {
  return VERTICALS.plumber;
}
