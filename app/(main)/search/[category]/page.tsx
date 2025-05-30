import React from "react";
import SearchForSaleHeroSection from "@/components/SearchForSaleHeroSection";
import { getProperties } from "@/lib/data-service";
import SearchForSaleHeader from "@/components/SearchForSaleHeader";
import SearchFeaturedProperties from "@/components/SearchFeaturedProperties";
import SearchProperties from "@/components/SearchProperties";
import { params } from "@/types/types";
import { redirect } from "next/navigation";

type SearchPageParams = {
  searchParams: Promise<params>;
  params: Promise<params>;
};

export default async function page({ params, searchParams }: SearchPageParams) {
  const searchParamsValues = await searchParams;

  const { category } = await params;

  const categories = ["sale", "rent", "investment"];

  if (!categories.includes(String(category))) redirect("/");

  const { data: unFilteredData } = await getProperties({
    category: category ? String(category) : "sale",
  });

  const { data: FilteredData, count } = await getProperties({
    category: category ? String(category) : "sale",
    params: searchParamsValues,
    perPage: 3,
  });

  const stateAddressArray = unFilteredData.map((el) => el.address);

  return (
    <>
      {categories.includes(String(category)) && (
        <>
          <SearchForSaleHeroSection
            params={searchParamsValues}
            stateAddressArray={stateAddressArray}
            category={category}
          />
          <SearchForSaleHeader
            params={searchParamsValues}
            numberOfProperties={count}
            category={category}
          />
          <SearchFeaturedProperties properties={unFilteredData} />
          <SearchProperties properties={FilteredData} count={count} />
        </>
      )}
    </>
  );
}
