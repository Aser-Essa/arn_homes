"use client";
import { useState } from "react";
import PropertiesCategorySwitch from "./PropertiesCategorySwitch";
import PropertyStatusCardList from "./PropertyStatusCardList";

export default function MyPropertiesSection() {
  const [category, setCategory] = useState("sale");

  return (
    <div className="space-y-4">
      <div className="relative mt-10 flex items-center">
        <p className="text-[24px] font-semibold lg:text-[28px]">
          My properties
        </p>
        <PropertiesCategorySwitch
          category={category}
          setCategory={setCategory}
        />
      </div>
      <PropertyStatusCardList category={category} />
    </div>
  );
}
