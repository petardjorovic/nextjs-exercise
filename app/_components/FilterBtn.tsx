"use client";

type FilterBtnProps = {
  handleFn: (x: string) => void;
  label: string;
  filter: string;
  children: React.ReactNode;
};

function FilterBtn({ handleFn, filter, label, children }: FilterBtnProps) {
  return (
    <button
      onClick={() => handleFn(label)}
      className={`px-5 py-2 cursor-pointer hover:bg-primary-700 ${
        filter === label ? "bg-primary-700" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default FilterBtn;
