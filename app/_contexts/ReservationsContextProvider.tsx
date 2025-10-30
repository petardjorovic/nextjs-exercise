"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationsContextProps = {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

export const ReservationsContext = createContext<
  ReservationsContextProps | undefined
>(undefined);

const initialValue: DateRange = {
  from: undefined,
  to: undefined,
};

function ReservationsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<DateRange | undefined>(initialValue);
  const resetRange = () => setRange(initialValue);

  return (
    <ReservationsContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationsContext.Provider>
  );
}

export default ReservationsContextProvider;
