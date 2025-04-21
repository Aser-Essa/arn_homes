import React from "react";
import SearchForSaleHeroSection from "@/components/SearchForSaleHeroSection";
import { getPropertiesForSales } from "@/lib/data-service";
import SearchForSaleHeader from "@/components/SearchForSaleHeader";
import SearchFeaturedProperties from "@/components/SearchFeaturedProperties";
import SearchProperties from "@/components/SearchProperties";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  const { data: unFilteredData } = await getPropertiesForSales({});

  const { data: FilteredData, count } = await getPropertiesForSales({
    params: searchParamsValues,
    perPage: 3,
  });

  const stateAddressArray = unFilteredData.map((el) => el.state_address);

  return (
    <>
      <SearchForSaleHeroSection
        params={searchParamsValues}
        stateAddressArray={stateAddressArray}
      />
      <SearchForSaleHeader
        params={searchParamsValues}
        numberOfProperties={count}
      />
      <SearchFeaturedProperties properties={unFilteredData} />
      <SearchProperties properties={FilteredData} count={count} />
    </>
  );
}
