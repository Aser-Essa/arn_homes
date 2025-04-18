"use client";

import React from "react";
import CustomSelect from "./CustomSelect";
import { useRouter } from "next/navigation";
import { cn, formatTimeCounter } from "@/lib/utils";

type DateSortType = {
  params: { [key: string]: string | string[] | undefined };
  className?: string;
};

export default function DateSort({ params, className }: DateSortType) {
  const { time_sort } = params;
  const router = useRouter();

  const dateOptions = [
    { value: "Any", label: "Anytime" },
    { value: 7, label: "Last Week" },
    { value: 30, label: "Last Month" },
  ];

  function onValueChange(value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set("time_sort", value);
    router.push(`?${params.toString()}`);
  }

  return (
    <>
      <CustomSelect
        key={`${time_sort}`}
        className={cn("w-[223px]", className)}
        placeholder={
          time_sort
            ? `${formatTimeCounter(Number(time_sort))}`
            : "Sort order: Anytime"
        }
        selectItems={dateOptions}
        onValueChange={onValueChange}
      />
    </>
  );
}
