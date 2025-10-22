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
