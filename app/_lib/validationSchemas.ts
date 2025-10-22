import z from "zod";

export const cabinPreviewSchema = z.object({
  id: z.number(),
  name: z.string(),
  maxCapacity: z.number(),
  regularPrice: z.number(),
  discount: z.number(),
  image: z.string(),
});

export const cabinPreviewArraySchema = z.array(cabinPreviewSchema);

export type CabinPreview = z.infer<typeof cabinPreviewSchema>;

export const fullCabinPreviewSchema = cabinPreviewSchema.extend({
  description: z.string(),
  created_at: z.string(),
});

export type FullCabinPreview = z.infer<typeof fullCabinPreviewSchema>;
