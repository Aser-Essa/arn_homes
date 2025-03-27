import HeroSectionSale from "@/components/HeroSectionSale";
import FilterBar from "@/components/FilterBar";
import React from "react";
import PropertiesForSale from "@/components/PropertiesForSale";

export default function Page({ searchParams }: { [x: string]: never }) {
  return (
    <>
      <HeroSectionSale />
      <FilterBar params={searchParams} />
      <PropertiesForSale params={searchParams} />
    </>
  );
}
