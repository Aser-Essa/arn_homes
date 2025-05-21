"use client";

import React from "react";
import CustomSelect from "./CustomSelect";
import { useRouter } from "next/navigation";
import { cn, formatTimeCounter } from "@/lib/utils";
import { params } from "@/types/types";

type DateSortType = {
  params: params;
  className?: string;
};

export default function DateSort({ params, className }: DateSortType) {
  const { time_sort } = params;
  const router = useRouter();

  const dateOptions = [
    { value: "Any", label: "Anytime" },
    { value: 1, label: "Last 24 hours" },
    { value: 3, label: "Last 3 days" },
    { value: 7, label: "Last 7 days" },
    { value: 14, label: "Last 14 days" },
    { value: 30, label: "Last 30 days" },
  ];

  function onValueChange(value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set("time_sort", value);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <CustomSelect
        key={`${time_sort}`}
        className={cn("w-[223px]", className)}
        placeholder={
          time_sort
            ? `Sort order: ${formatTimeCounter(Number(time_sort))}`
            : "Sort order: Anytime"
        }
        selectItems={dateOptions}
        onValueChange={onValueChange}
      />
    </>
  );
}
