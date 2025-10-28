"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FilterBtn from "./FilterBtn";

function Filter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleClick = (filter: string) => {
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex border border-primary-800">
      <FilterBtn filter={activeFilter} handleFn={handleClick} label="all">
        All cabins
      </FilterBtn>
      <FilterBtn filter={activeFilter} handleFn={handleClick} label="small">
        1&mdash;3 guests
      </FilterBtn>
      <FilterBtn filter={activeFilter} handleFn={handleClick} label="medium">
        4&mdash;7 guests
      </FilterBtn>
      <FilterBtn filter={activeFilter} handleFn={handleClick} label="large">
        8&mdash;12 guests
      </FilterBtn>
    </div>
  );
}

export default Filter;
