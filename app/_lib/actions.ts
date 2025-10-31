"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabaseClient";

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
  if (!session) throw new Error("You must be logged in");

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

  if (!session.user.guestId) throw new Error("You must be logged in");

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
