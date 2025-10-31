import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import { supabase } from "./supabaseClient";
import {
  BookingPreviev,
  bookingPreviewSchemaArray,
  CabinPreview,
  cabinPreviewArraySchema,
  fullBookingPreviewSchemaArray,
  FullCabinPreview,
  fullCabinPreviewSchema,
  SettingsPreview,
  settingsPreviewSchema,
} from "./validationSchemas";

/////////////
// GET

export async function getCabin(id: number): Promise<FullCabinPreview> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    // ovo next function automatski poziva not-found.tsx page
    notFound();
  }

  const parsed = fullCabinPreviewSchema.safeParse(data);

  if (!parsed.success) {
    console.log("getCabin error: ", parsed.error);
    throw new Error("Cabin could not be loaded");
  }

  return parsed.data;
}

// export async function getCabinPrice(id) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("regularPrice, discount")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//   }

//   return data;
// }

export const getCabins = async function (): Promise<CabinPreview[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  //* Zod validacija
  const parsed = cabinPreviewArraySchema.safeParse(data);

  if (!parsed.success) {
    console.log("getCabins error: ", parsed.error);
    throw new Error("Invalid cabin data from server");
  }

  return parsed.data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  // const { data, error } = await supabase
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

// export async function getBooking(id) {
//   const { data, error, count } = await supabase
//     .from("bookings")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not get loaded");
//   }

//   return data;
// }

export async function getBookings(guestId: number): Promise<BookingPreviev[]> {
  // const { data, error, count } = await supabase
  const { data, error } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  //* Zod validacija
  const parsed = bookingPreviewSchemaArray.safeParse(data);

  if (!parsed.success) {
    console.log("getBookings error: ", parsed.error);
    throw new Error("Invalid bookings data from server");
  }

  return parsed.data;
}

export async function getBookedDatesByCabinId(
  cabinId: number
): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  // today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today.toISOString()},status.eq.checked-in`);

  // For testing
  // await new Promise((res) => setTimeout(res, 5000));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  //* Zod validacija
  const parsed = fullBookingPreviewSchemaArray.safeParse(data);

  if (!parsed.success) {
    console.log("getBookedDatesByCabinId error: ", parsed.error);
    throw new Error("Invalid BookedDatesByCabinId data from server");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = parsed.data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<SettingsPreview> {
  const { data, error } = await supabase.from("settings").select("*").single();

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  //* Zod validacija
  const parsed = settingsPreviewSchema.safeParse(data);

  if (!parsed.success) {
    console.log("getSettings error: ", parsed.error);
    throw new Error("Invalid settings data from server");
  }

  return parsed.data;
}

type Country = {
  name: string;
  flag: string;
  independent: boolean;
};

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: {
  email: string;
  fullName: string;
}) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .insert([newBooking])
//     // So that the newly created object gets returned!
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be created");
//   }

//   return data;
// }

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
// export async function updateGuest(id, updatedFields) {
//   const { data, error } = await supabase
//     .from("guests")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Guest could not be updated");
//   }
//   return data;
// }

// export async function updateBooking(id, updatedFields) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

// /////////////
// // DELETE

// export async function deleteBooking(id) {
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
