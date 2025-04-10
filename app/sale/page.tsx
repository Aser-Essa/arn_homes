import HeroSectionSale from "@/components/HeroSectionSale";
import FilterBar from "@/components/FilterBar";
import React from "react";
import PropertiesForSale from "@/components/PropertiesForSale";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  return (
    <>
      <HeroSectionSale />
      <FilterBar params={searchParamsValues} />
      <PropertiesForSale params={searchParamsValues} />
    </>
  );
}
