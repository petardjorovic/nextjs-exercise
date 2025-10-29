import { Suspense } from "react";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

type Props = {
  params: Promise<{ cabinId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { cabinId } = await params;
  const cabin = await getCabin(Number(cabinId));
  return { title: `Cabin ${cabin.name}` };
}

async function Page(props: PageProps<"/cabins/[cabinId]">) {
  const { cabinId } = await props.params;
  const cabin = await getCabin(Number(cabinId));

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
