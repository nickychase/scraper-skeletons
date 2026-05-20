import { z } from "zod";

// Section item types shared between `Lead` (per-prospect overrides) and
// `VerticalData` (per-vertical defaults). Lives in its own file so neither
// lead.ts nor vertical.ts has to import from the other.

export const galleryItemSchema = z.object({
  id: z.number(),
  type: z.enum(["image", "video"]),
  title: z.string(),
  desc: z.string(),
  url: z.string(),
  span: z.string(),
});
export type GalleryItem = z.infer<typeof galleryItemSchema>;

export const heroVariantSchema = z.enum(["image", "minimal", "split"]);
export type HeroVariant = z.infer<typeof heroVariantSchema>;

export const servicesVariantSchema = z.enum(["grid", "list"]);
export type ServicesVariant = z.infer<typeof servicesVariantSchema>;

export const galleryVariantSchema = z.enum(["bento", "stacked"]);
export type GalleryVariant = z.infer<typeof galleryVariantSchema>;
