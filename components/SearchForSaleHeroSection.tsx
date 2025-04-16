import React from "react";
import FilterBar from "@/components/FilterBar";
import Container from "./Container";
import Map from "./Map";
import SearchForSaleBreadcrump from "./SearchForSaleBreadcrump";
import { getCoordinates } from "@/lib/data-service";

type SearchForSaleHeroSectionType = {
  params: { [key: string]: string | string[] | undefined };
  stateAddressArray: string[];
};

export default async function SearchForSaleHeroSection({
  params,
  stateAddressArray,
}: SearchForSaleHeroSectionType) {
  const search_title = params?.search_title || "";
  const coordinates = await getCoordinates(`${search_title}`);

  return (
    <Container>
      <SearchForSaleBreadcrump />
      <Map
        lat={coordinates?.lat}
        lng={coordinates?.lng}
        containerClassName={"mt-6"}
        controllerClassName={"bottom-[53px]"}
      />
      <FilterBar params={params} stateAddressArray={stateAddressArray} />
    </Container>
  );
}
