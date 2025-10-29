import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { FullCabinPreview } from "../_lib/validationSchemas";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservations({ cabin }: { cabin: FullCabinPreview }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(Number(cabin.id)),
  ]);
  return (
    <div className="grid grid-cols-5 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservations;
