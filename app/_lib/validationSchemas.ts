import z from "zod";

export const capacitySearchParamsSchema = z.object({
  capacity: z.enum(["small", "medium", "large", "all"]).optional(),
});

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

export const bookingPreviewSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numNights: z.number(),
  numGuests: z.number(),
  totalPrice: z.number(),
  guestId: z.number(),
  cabinId: z.number(),
  cabins: z.object({
    name: z.string(),
    image: z.string(),
  }),
});

export const bookingPreviewSchemaArray = z.array(bookingPreviewSchema);

export type BookingPreviev = z.infer<typeof bookingPreviewSchema>;

export const fullBookingPreviewSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numNights: z.number(),
  numGuests: z.number(),
  totalPrice: z.number(),
  guestId: z.number(),
  isPaid: z.boolean(),
  cabinId: z.number(),
  cabinPrice: z.number(),
  extrasPrice: z.number(),
  hasBreakfast: z.boolean(),
  observations: z.string().nullable(),
  status: z.string(),
  cabins: z.object({
    name: z.string(),
    maxCapacity: z.number(),
  }),
});

export const fullBookingPreviewSchemaArray = z.array(fullBookingPreviewSchema);

export type fullBookingPreview = z.infer<typeof fullBookingPreviewSchema>;

export const settingsPreviewSchema = z.object({
  breakfastPrice: z.number(),
  created_at: z.string(),
  id: z.number(),
  maxBookingLength: z.number(),
  maxGuestPerBooking: z.number(),
  minBookingLength: z.number(),
});

export type SettingsPreview = z.infer<typeof settingsPreviewSchema>;
