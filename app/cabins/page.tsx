import { Suspense, use } from "react";
import { Metadata } from "next";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import { capacitySearchParamsSchema } from "../_lib/validationSchemas";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata: Metadata = {
  title: "Cabins",
};

export const revalidate = 3600; // obzirom da ovaj page prima searchParams automatski postaje dynamic page i ovo vise nema smisla
// export const revalidate = 15;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function Page(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams);
  const result = capacitySearchParamsSchema.safeParse(searchParams);
  const filter = result.success ? result.data.capacity ?? "all" : "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex mb-8 justify-end">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

export default Page;
