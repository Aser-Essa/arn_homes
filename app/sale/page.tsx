import HeroSectionSale from "@/components/HeroSectionSale";
import FilterBar from "@/components/FilterBar";
import React from "react";
import PropertiesForSale from "@/components/PropertiesForSale";
import SignInBanner from "@/components/SignInBanner";
import Container from "@/components/Container";
import { getPropertiesForSales } from "@/lib/data-service";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  const { data } = await getPropertiesForSales(searchParamsValues);
  const stateAddressArray = data.map((el) => el.state_address);

  return (
    <>
      <HeroSectionSale />
      <Container>
        <FilterBar
          params={searchParamsValues}
          stateAddressArray={stateAddressArray}
        />
      </Container>
      <PropertiesForSale params={searchParamsValues} />
      <SignInBanner />
    </>
  );
}
