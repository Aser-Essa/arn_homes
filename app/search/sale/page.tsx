import React from "react";
import SearchForSaleHeroSection from "@/components/SearchForSaleHeroSection";
import { getPropertiesForSales } from "@/lib/data-service";
import SearchForSaleHeader from "@/components/SearchForSaleHeader";
import SearchFeaturedProperties from "@/components/SearchFeaturedProperties";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;
  const { data } = await getPropertiesForSales(searchParamsValues);
  const stateAddressArray = data.map((el) => el.state_address);

  console.log(stateAddressArray);

  return (
    <>
      <SearchForSaleHeroSection
        params={searchParamsValues}
        stateAddressArray={stateAddressArray}
      />
      <SearchForSaleHeader
        params={searchParamsValues}
        numberOfProperties={data.length}
      />
      <SearchFeaturedProperties properties={data} />
    </>
  );
}
