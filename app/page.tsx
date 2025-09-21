import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">The Wild Oasis. Welcome to paradise.</h1>
      <Link href={"/cabins"}>Explore luxury cabins</Link>
    </div>
  );
}
