import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import React from "react";
import Properties from "@/components/Properties";
import SignInBanner from "@/components/SignInBanner";
import Container from "@/components/Container";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { params } from "@/types/types";
import { redirect } from "next/navigation";
import { getProperties } from "@/lib/queries/properties";

type SearchPageParams = {
  searchParams: Promise<params>;
  params: Promise<params>;
};
export default async function Page({ params, searchParams }: SearchPageParams) {
  const searchParamsValues = await searchParams;

  const { category } = await params;

  const categories = ["sale", "rent", "investment"];

  if (!categories.includes(String(category))) redirect("/");

  const { data } = await getProperties({
    params: searchParamsValues,
    category: category ? String(category) : "sale",
  });

  const stateAddressArray = data.map((el) => el.address);

  const pathArray = [
    {
      path: "Home",
      href: "/",
    },
    {
      path: `For ${category}`,
      type: "page",
    },
  ];

  return (
    <>
      <HeroSection
        pathArray={pathArray}
        title={`Properties for ${category}`}
        slogan={`Search for the best houses for ${category} in your area.`}
      />
      <Container>
        <FilterBar
          category={category}
          params={searchParamsValues}
          stateAddressArray={stateAddressArray}
        />
      </Container>
      <Properties params={searchParamsValues} category={category} />
      <SignedOut>
        <SignInBanner />
      </SignedOut>
      <SignedIn>
        <div className="mb-[200px]"></div>
      </SignedIn>
    </>
  );
}
