"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabaseClient";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInGoogleAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signInGitHubAction() {
  await signIn("github", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateGuestAction(formData: FormData) {
  //* check is user logged in
  const session = await auth();
  if (!session || !session.user.guestId)
    throw new Error("You must be logged in");

  //* validate formData
  const natinalityFlag = formData.get("nationality")?.toString().split("%");
  const nationality = natinalityFlag ? natinalityFlag[0] : null;
  const countryFlag = natinalityFlag ? natinalityFlag[1] : null;

  let nationalID = formData.get("nationalID");

  if (nationalID && !/^[A-Za-z0-9]{6,12}$/.test(nationalID.toString()))
    throw new Error("Please provide a valid national ID");

  if (nationalID) nationalID = nationalID.toString();

  const updatedFields = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  //* resetuj cache na ovoj ruti
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId: number) {
  //* check is user logged in
  const session = await auth();
  if (!session || !session.user.guestId)
    throw new Error("You must be logged in");

  //* check weather is that guest's booking
  const guestBookings = await getBookings(session.user.guestId);
  const isExist = guestBookings
    .map((booking) => booking.id)
    .includes(bookingId);

  if (!isExist)
    throw new Error("You are not allowed to delete this reservation");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData: FormData) {
  // 1) Authentiction
  const session = await auth();
  if (!session || !session.user.guestId)
    throw new Error("You must be logged in");

  // 2) Authorization
  const bookingId = formData.get("bookingId")?.toString();
  if (!bookingId) throw new Error("There is not reservation with this id");

  //* check weather is that guest's booking
  const guestBookings = await getBookings(session.user.guestId);
  const isExist = guestBookings
    .map((booking) => booking.id)
    .includes(Number(bookingId));

  if (!isExist)
    throw new Error("You are not allowed to delete this reservation");

  // 3) Building update data
  const numGuests = formData.get("numGuests")
    ? Number(formData.get("numGuests"))
    : undefined;
  const observations = formData.get("observations")?.toString().slice(0, 1000);

  const updatedFields = { numGuests, observations };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", Number(bookingId));

  if (error) {
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}
