import { SAMPLE_LEADS } from "@/fixtures/leads.sample";
import { loadLocalProspects } from "@/lib/local-prospects/store";
import { leadSchema, type Lead } from "@/lib/types/lead";
import { getSheetId, getSheetsClient, hasSheetsConfig } from "./client";

export type FetchSource = "sheets" | "fixtures" | "local";

export type LeadLookup = {
  lead: Lead | null;
  source: FetchSource;
};

// Locally-generated prospect leads (written by the generate-skeleton skill)
// take precedence over both Sheets and the sample fixtures. This way a fresh
// research-driven lead always renders the populated version, not whatever
// stale row might exist with the same place_id.
export async function fetchLeadBySlug(slug: string): Promise<LeadLookup> {
  const local = (await loadLocalProspects()).find((l) => l.place_id === slug);
  if (local) return { lead: local, source: "local" };

  if (!hasSheetsConfig()) {
    return {
      lead: SAMPLE_LEADS.find((l) => l.place_id === slug) ?? null,
      source: "fixtures",
    };
  }

  const sheets = getSheetsClient();
  const sheetId = getSheetId();
  if (!sheets || !sheetId) {
    return { lead: null, source: "fixtures" };
  }

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Leads!A1:ZZ",
  });

  const allRows = (res.data.values ?? []) as unknown[][];
  if (allRows.length < 2) return { lead: null, source: "sheets" };

  const headerRow = allRows[0].map((cell) => String(cell ?? "").trim());
  const placeIdCol = headerRow.indexOf("place_id");
  if (placeIdCol === -1) return { lead: null, source: "sheets" };

  for (let i = 1; i < allRows.length; i++) {
    const cells = allRows[i];
    if (String(cells[placeIdCol] ?? "").trim() !== slug) continue;

    const record: Record<string, unknown> = {};
    headerRow.forEach((header, idx) => {
      if (header === "") return;
      record[header] = cells[idx] ?? "";
    });

    const parsed = leadSchema.safeParse(record);
    return {
      lead: parsed.success ? parsed.data : null,
      source: "sheets",
    };
  }

  return { lead: null, source: "sheets" };
}

export async function fetchAllLeadSlugs(): Promise<string[]> {
  const localSlugs = (await loadLocalProspects()).map((l) => l.place_id);

  if (!hasSheetsConfig()) {
    return Array.from(
      new Set([...localSlugs, ...SAMPLE_LEADS.map((l) => l.place_id)]),
    );
  }

  const sheets = getSheetsClient();
  const sheetId = getSheetId();
  if (!sheets || !sheetId) return [];

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Leads!A1:ZZ",
  });

  const allRows = (res.data.values ?? []) as unknown[][];
  if (allRows.length < 2) return [];

  const headerRow = allRows[0].map((cell) => String(cell ?? "").trim());
  const placeIdCol = headerRow.indexOf("place_id");
  if (placeIdCol === -1) return [];

  const slugs: string[] = [...localSlugs];
  for (let i = 1; i < allRows.length; i++) {
    const slug = String(allRows[i][placeIdCol] ?? "").trim();
    if (slug) slugs.push(slug);
  }
  return Array.from(new Set(slugs));
}
