import React from "react";
import FilterBar from "@/components/FilterBar";
import Container from "./Container";
import Map from "./Map";
import { getCoordinates } from "@/lib/data-service";
import SearchForSaleBreadcrumb from "./SearchForSaleBreadcrumb";
import { params } from "@/types/types";

type SearchForSaleHeroSectionType = {
  params: params;
  stateAddressArray: string[];
  category?: string | string[] | undefined;
};

export default async function SearchForSaleHeroSection({
  params,
  stateAddressArray,
  category,
}: SearchForSaleHeroSectionType) {
  const state_address = params?.state_address || "";
  const coordinates = await getCoordinates(`${state_address}`);

  return (
    <Container>
      <SearchForSaleBreadcrumb category={category} />
      <Map
        lat={coordinates?.lat}
        lng={coordinates?.lng}
        containerClassName={"mt-6"}
        controllerClassName={"lg:bottom-[53px] bottom-3"}
      />
      <FilterBar
        params={params}
        stateAddressArray={stateAddressArray}
        className="mb-10 mt-4 lg:mb-0 lg:mt-0"
        category={category}
      />
    </Container>
  );
}
