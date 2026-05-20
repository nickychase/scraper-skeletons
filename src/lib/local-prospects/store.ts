// Local prospect store for the `generate-skeleton` skill.
//
// Per-prospect skeleton leads written here render at /<place_id> without
// touching Google Sheets. File is gitignored so demos don't pollute git
// history — see `.gitignore`. If the file doesn't exist, the loader
// returns []; first save creates it.

import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { leadSchema, type Lead } from "@/lib/types/lead";

const LOCAL_PATH = path.join(
  process.cwd(),
  "src/fixtures/prospects.local.json",
);

const fileSchema = z.object({
  prospects: z.array(leadSchema),
});

export async function loadLocalProspects(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, "utf-8");
    const parsed = fileSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      console.warn(
        "prospects.local.json present but failed schema validation; ignoring.",
        parsed.error.issues,
      );
      return [];
    }
    return parsed.data.prospects;
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
}

// Add or replace a lead by place_id. Creates the file if missing.
export async function saveLocalProspect(lead: Lead): Promise<void> {
  const existing = await loadLocalProspects();
  const next = [...existing.filter((l) => l.place_id !== lead.place_id), lead];
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(
    LOCAL_PATH,
    JSON.stringify({ prospects: next }, null, 2) + "\n",
    "utf-8",
  );
}
