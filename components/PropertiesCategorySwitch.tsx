"use client";
import { cn } from "@/lib/utils";
import React from "react";

type PropertiesCategorySwitchType = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function PropertiesCategorySwitch({
  category,
  setCategory,
}: PropertiesCategorySwitchType) {
  function handleClick(selected: string) {
    setCategory(selected);
  }

  return (
    <ul className="absolute flex items-center gap-6 max-lg:right-0 lg:left-1/2 lg:-translate-x-1/2 lg:text-lg">
      <li
        className={cn(
          "cursor-pointer pb-1 transition-all hover:text-scooter-700",
          category === "sale" && "border-b border-scooter-700 text-scooter-700",
        )}
        onClick={() => handleClick("sale")}
      >
        For sale
      </li>

      <li
        className={cn(
          "cursor-pointer pb-1 transition-all hover:text-scooter-700",
          category === "rent" && "border-b border-scooter-700 text-scooter-700",
        )}
        onClick={() => handleClick("rent")}
      >
        For rent
      </li>

      <li
        className={cn(
          "cursor-pointer pb-1 transition-all hover:text-scooter-700",
          category === "investment" &&
            "border-b border-scooter-700 text-scooter-700",
        )}
        onClick={() => handleClick("investment")}
      >
        For investment
      </li>
    </ul>
  );
}
