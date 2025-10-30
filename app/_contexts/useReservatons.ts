"use client";

import { useContext } from "react";
import { ReservationsContext } from "./ReservationsContextProvider";

export function useReservations() {
  const ctx = useContext(ReservationsContext);
  if (!ctx) throw new Error("Context used outside of Provider");
  return ctx;
}
