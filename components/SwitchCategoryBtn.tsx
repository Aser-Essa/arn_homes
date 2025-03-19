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
    router.push(`?${params.toString()}`);
  }

  return (
    <li
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-xl border-[1.5px] border-amber-100 px-4 py-3 transition-all hover:border-amber-50 hover:bg-amber-50",
        category === value && "border-amber-50 bg-amber-50",
      )}
      onClick={handleClick}
    >
      <Image src={icon} width={18} height={18} alt={value} />
      <p>{children}</p>
    </li>
  );
}
