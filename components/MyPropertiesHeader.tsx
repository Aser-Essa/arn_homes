import React from "react";
import { params } from "@/types/types";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import CategorySwitch from "./CategorySwitch";

type MyPropertiesHeaderType = {
  params: params;
};

const categories = [
  { key: "sale", label: "For sale" },
  { key: "rent", label: "For rent" },
  { key: "investment", label: "For investment" },
];

export default function MyPropertiesHeader({ params }: MyPropertiesHeaderType) {
  const { property_category } = params;

  return (
    <>
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-[22px] w-fit cursor-pointer items-center gap-2 rounded-[8px] border-l-[5px] border-amber-600 bg-gray-900 py-[2px] pl-[11px] pr-4 font-exo text-xs text-shades-white transition-all hover:text-scooter-600 sm:hidden md:hidden md:rounded-xl">
          <p>Dashboard</p>
        </div>
        <p className="hidden text-[24px] font-semibold sm:block lg:text-[28px]">
          My properties
        </p>
        <Link
          href={"/account"}
          className="flex items-center gap-2 font-semibold sm:hidden"
        >
          <IoIosArrowBack />
          <p>My properties</p>
        </Link>
        <CategorySwitch
          categories={categories}
          category_val={property_category ? String(property_category) : "sale"}
          category_name={"property_category"}
        />
      </div>
    </>
  );
}
