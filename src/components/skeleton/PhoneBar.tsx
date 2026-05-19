import { Phone } from "lucide-react";
import type { Lead } from "@/lib/types/lead";

export function PhoneBar({ lead }: { lead: Lead }) {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-plumber-navy/10 bg-plumber-cream/95 backdrop-blur supports-[backdrop-filter]:bg-plumber-cream/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <span className="truncate text-base font-semibold tracking-tight text-plumber-navy">
          {lead.business_name}
        </span>
        {lead.phone && (
          <a
            href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold text-plumber-navy hover:text-plumber-navy/80"
          >
            <Phone className="size-4" />
            <span>{lead.phone}</span>
          </a>
        )}
      </div>
    </div>
  );
}
