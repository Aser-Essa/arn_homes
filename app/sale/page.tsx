import HeroSection from "@/components/HeroSection";
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

  const pathArray = [
    {
      path: "Home",
      href: "/",
    },
    {
      path: "For Sale",
      type: "page",
    },
  ];

  return (
    <>
      <HeroSection
        pathArray={pathArray}
        title={"Properties for sale"}
        slogan={"Search for the best houses for sale in your area."}
      />
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
