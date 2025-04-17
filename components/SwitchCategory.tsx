"use client";
import React from "react";
import SwitchCategoryBtn from "./SwitchCategoryBtn";

type SwitchCategoryType = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function SwitchCategory({
  category,
  setCategory,
}: SwitchCategoryType) {
  return (
    <ul className="flex w-full items-center gap-2 text-nowrap font-medium text-[#0D0E0F] md:w-fit lg:mx-0">
      <SwitchCategoryBtn
        value="sale"
        icon="/icons/store.svg"
        category={category}
        setCategory={setCategory}
      >
        For sale
      </SwitchCategoryBtn>

      <SwitchCategoryBtn
        value="rent"
        icon="/icons/home-activity.svg"
        category={category}
        setCategory={setCategory}
      >
        For rent
      </SwitchCategoryBtn>

      <SwitchCategoryBtn
        value="investment"
        icon="/icons/building-coins.svg"
        category={category}
        setCategory={setCategory}
      >
        For investment
      </SwitchCategoryBtn>
    </ul>
  );
}
