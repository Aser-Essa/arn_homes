import React from "react";
import { params } from "@/types/types";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import CategorySwitch from "./CategorySwitch";
import { auth } from "@clerk/nextjs/server";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type MyPropertiesHeaderType = {
  params: params;
  propertyAction: (data: {
    userId: string;
    status?: string;
    category: string;
  }) => Promise<{ count: number | null }>;
  title: string;
};

const categories = [
  { key: "sale", label: "For sale" },
  { key: "rent", label: "For rent" },
  { key: "investment", label: "For investment" },
];

export default async function MyPropertiesHeader({
  params,
  propertyAction,
  title,
}: MyPropertiesHeaderType) {
  const { userId } = await auth();

  if (!userId) {
    toast.error("User not authenticated");
    redirect("/sign-in");
  }

  const { category, status } = params;

  const counts = Object.fromEntries(
    await Promise.all(
      categories.map(async ({ key }) => {
        const { count } = await propertyAction({
          userId,
          status: status ? String(status) : "",
          category: key,
        });
        return [[key], count];
      }),
    ),
  );

  return (
    <>
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-[22px] w-fit cursor-pointer items-center gap-2 rounded-[8px] border-l-[5px] border-amber-600 bg-gray-900 py-[2px] pl-[11px] pr-4 font-exo text-xs text-shades-white transition-all hover:text-scooter-600 sm:hidden md:hidden md:rounded-xl">
          <p>Dashboard</p>
        </div>
        <p className="hidden text-[24px] font-semibold sm:block lg:text-[28px]">
          {title}
        </p>
        <Link
          href={"/account"}
          className="flex items-center gap-2 font-semibold sm:hidden"
        >
          <IoIosArrowBack />
          <p>{title}</p>
        </Link>
        <CategorySwitch
          categories={categories}
          category_val={category ? String(category) : "sale"}
          category_name={"category"}
          counts={counts}
        />
      </div>
    </>
  );
}
