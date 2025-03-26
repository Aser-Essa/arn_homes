"use client";

import React from "react";
import CustomSelect from "./CustomSelect";
import { useRouter } from "next/navigation";

export default function DateSort() {
  const router = useRouter();

  const dateOptions = [
    { value: "Any", label: "Anytime" },
    { value: 7, label: "Last Week" },
    { value: 30, label: "Last Month" },
  ];

  function onValueChange(value: string) {
    const params = new URLSearchParams(window.location.search);
    params.append("time_sort", value);
    router.push(`?${params.toString()}`);
  }

  return (
    <>
      <CustomSelect
        placeholder={"Sort order: Anytime"}
        selectItems={dateOptions}
        className="w-[223px]"
        onValueChange={onValueChange}
      />
    </>
  );
}
