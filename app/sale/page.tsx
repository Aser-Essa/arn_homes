import HeroSectionSale from "@/components/HeroSectionSale";
import FilterBar from "@/components/FilterBar";
import React from "react";
import PropertiesForSale from "@/components/PropertiesForSale";

type SearchParamsType = {
  searchParams: {
    bed_N: string;
    bath_N: string;
    min_Price: string;
    max_Price: string;
    price_Duration: string;
    property_Type: string;
  };
};

export default async function Page({ searchParams }: SearchParamsType) {
  const params = await Promise.resolve(searchParams);
  return (
    <>
      <HeroSectionSale />
      <FilterBar params={params} />
      <PropertiesForSale params={params} />
    </>
  );
}
