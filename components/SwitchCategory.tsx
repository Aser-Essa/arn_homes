"use client";
import React, { useState } from "react";
import SwitchCategoryBtn from "./SwitchCategoryBtn";

export default function SwitchCategory() {
  const [category, setCategory] = useState("sale");

  return (
    <ul className="flex h-[50px] flex-1 items-center gap-2 text-nowrap font-medium text-[#0D0E0F]">
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
