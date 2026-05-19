import { z } from "zod";

// Google Sheets returns every cell as a string. These helpers coerce raw cell
// values into the typed fields we want to work with.

export const sheetsString = z.preprocess(
  (v) => (v === null || v === undefined ? "" : String(v)),
  z.string(),
);

export const sheetsOptionalString = z.preprocess((v) => {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  return s === "" ? undefined : s;
}, z.string().optional());

export const sheetsBool = z.preprocess((v) => {
  if (typeof v === "boolean") return v;
  if (v === null || v === undefined) return false;
  const s = String(v).trim().toLowerCase();
  return s === "true" || s === "yes" || s === "1";
}, z.boolean());

export const sheetsNullableNumber = z.preprocess((v) => {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") return v;
  const s = String(v).trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}, z.number().nullable());

export const sheetsOptionalNumber = z.preprocess((v) => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === "number") return v;
  const s = String(v).trim();
  if (s === "") return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}, z.number().optional());

export const sheetsTimestamp = z.preprocess((v) => {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  return s === "" ? undefined : s;
}, z.string().optional());
