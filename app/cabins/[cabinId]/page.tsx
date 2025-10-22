import { getCabin } from "@/app/_lib/data-service";
import Cabin from "@/app/_components/Cabin";

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
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}

export default Page;
