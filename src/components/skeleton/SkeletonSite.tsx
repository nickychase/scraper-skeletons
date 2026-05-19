import type { Lead } from "@/lib/types/lead";
import type { SectionKey, VerticalData } from "@/lib/types/vertical";
import { About } from "./About";
import { Contact } from "./Contact";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { PhoneBar } from "./PhoneBar";
import { ServiceArea } from "./ServiceArea";
import { Services } from "./Services";
import { Trust } from "./Trust";

const SECTION_COMPONENTS: Record<
  SectionKey,
  (props: { lead: Lead; vertical: VerticalData }) => React.ReactNode
> = {
  hero: Hero,
  trust: Trust,
  services: Services,
  about: About,
  gallery: Gallery,
  serviceArea: ServiceArea,
  contact: Contact,
};

export function SkeletonSite({
  lead,
  vertical,
}: {
  lead: Lead;
  vertical: VerticalData;
}) {
  return (
    <div className="bg-plumber-cream text-plumber-navy">
      <PhoneBar lead={lead} />
      <main>
        {vertical.sections.map((key) => {
          const Section = SECTION_COMPONENTS[key];
          return <Section key={key} lead={lead} vertical={vertical} />;
        })}
      </main>
      <footer className="border-t border-plumber-navy/10 bg-plumber-navy py-8 text-center text-sm text-plumber-cream/60">
        © {new Date().getFullYear()} {lead.business_name}. All rights reserved.
      </footer>
    </div>
  );
}
