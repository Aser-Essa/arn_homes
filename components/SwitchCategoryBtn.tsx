"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type SwitchCategoryBtnProps = {
  value: string;
  icon: string;
  children: React.ReactNode;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function SwitchCategoryBtn({
  value,
  icon,
  children,
  category,
  setCategory,
}: SwitchCategoryBtnProps) {
  const router = useRouter();

  function handleClick() {
    setCategory(value);
    const params = new URLSearchParams();
    params.set("category", value);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <li
      className={cn(
        "flex w-full min-w-fit cursor-pointer items-center gap-2 transition-all hover:text-amber-600 sm:rounded-xl sm:border-[1.5px] sm:border-amber-100 sm:px-4 sm:py-3 sm:hover:border-amber-50 sm:hover:bg-amber-50 sm:hover:text-black md:w-fit",
        category === value &&
          "border-b border-amber-600 text-amber-600 sm:border-amber-50 sm:bg-amber-50 sm:text-black",
      )}
      onClick={handleClick}
    >
      <Image
        src={icon}
        width={18}
        height={18}
        alt={value}
        className="hidden lg:block"
      />
      <p>{children}</p>
    </li>
  );
}
