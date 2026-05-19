import type { Lead } from "@/lib/types/lead";
import type { VerticalData } from "@/lib/types/vertical";
import { cn } from "@/lib/utils";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { PhoneBar } from "./PhoneBar";
import { Services } from "./Services";
import { Trust } from "./Trust";

export function SkeletonSite({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  return (
    <div
      className={cn(
        "bg-plumber-cream text-plumber-navy",
        vertical.key === "gun-store" && "theme-gun-store",
      )}
    >
      <PhoneBar lead={lead} />
      <main>
        <Hero lead={lead} vertical={vertical} />
        <Trust lead={lead} vertical={vertical} />
        <Services lead={lead} vertical={vertical} />
        <Contact lead={lead} vertical={vertical} />
      </main>
      <footer className="border-t border-plumber-navy/10 bg-plumber-navy py-8 text-center text-sm text-plumber-cream/60">
        © {new Date().getFullYear()} {lead.business_name}. All rights reserved.
      </footer>
    </div>
  );
}
