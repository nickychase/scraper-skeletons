import { SAMPLE_LEADS } from "@/fixtures/leads.sample";
import { leadSchema, type Lead } from "@/lib/types/lead";
import { getSheetId, getSheetsClient, hasSheetsConfig } from "./client";

export type FetchSource = "sheets" | "fixtures";

export type LeadLookup = {
  lead: Lead | null;
  source: FetchSource;
};

// Reads the Leads tab from the configured sheet (or fixtures, when env is
// unset) and returns the row whose place_id matches the given slug.
// Parse failures on other rows are silently skipped — this is a public page
// that should never break because some unrelated row had a malformed cell.
export async function fetchLeadBySlug(slug: string): Promise<LeadLookup> {
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
  if (!hasSheetsConfig()) {
    return SAMPLE_LEADS.map((l) => l.place_id);
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

  const slugs: string[] = [];
  for (let i = 1; i < allRows.length; i++) {
    const slug = String(allRows[i][placeIdCol] ?? "").trim();
    if (slug) slugs.push(slug);
  }
  return slugs;
}
