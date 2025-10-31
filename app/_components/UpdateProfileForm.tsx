"use client";

import { updateGuestAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

type UpdateProfileFormProps = {
  guest: {
    countryFlag: string | null;
    created_at: string;
    email: string | null;
    fullName: string | null;
    id: number;
    nationalID: string | null;
    nationality: string | null;
  } | null;
  children: React.ReactNode;
};

function UpdateProfileForm({ guest, children }: UpdateProfileFormProps) {
  return (
    <form
      action={updateGuestAction}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={guest?.fullName || ""}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={guest?.email || ""}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {guest?.countryFlag && (
            <img
              src={guest.countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest?.nationalID || ""}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        {/* Napravio sam ovu komponentu za button zato sto sam komponenta koja je unutar forme moze da koristi useFormStatus hook*/}
        <SubmitButton />
      </div>
    </form>
  );
}

export default UpdateProfileForm;
