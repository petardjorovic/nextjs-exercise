"use client";

import { useOptimistic } from "react";
import { BookingPreviev } from "../_lib/validationSchemas";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "../_lib/actions";

function ReservationsList({ bookings }: { bookings: BookingPreviev[] }) {
  const [optimisticBookings, otpimisticDelete] = useOptimistic(
    bookings,
    (currentBookings: BookingPreviev[], bookingId: number) => {
      return currentBookings.filter((b) => b.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    otpimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationsList;
