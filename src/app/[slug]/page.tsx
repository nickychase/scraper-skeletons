import { notFound } from "next/navigation";
import { SkeletonSite } from "@/components/skeleton/SkeletonSite";
import { fetchAllLeadSlugs, fetchLeadBySlug } from "@/lib/sheets/fetch-lead";
import { getVerticalForLead } from "@/lib/verticals";

export async function generateStaticParams() {
  const slugs = await fetchAllLeadSlugs();
  return slugs.map((slug) => ({ slug }));
}

// New leads added between builds render on-demand the first time they're hit.
export const dynamicParams = true;

export default async function SkeletonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { lead } = await fetchLeadBySlug(slug);

  if (!lead) notFound();

  const vertical = getVerticalForLead(lead);
  return <SkeletonSite lead={lead} vertical={vertical} />;
}
