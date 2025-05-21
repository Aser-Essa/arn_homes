import React from "react";
import Container from "./Container";
import HomeCard from "./HomeCard";
import { BsStarFill } from "react-icons/bs";
import { Property } from "@/types/types";

type SearchFeaturedPropertiesType = {
  properties: Property[];
};

export default function SearchFeaturedProperties({
  properties,
}: SearchFeaturedPropertiesType) {
  return (
    <Container className="relative mt-10 flex min-h-[644px] w-full overflow-hidden bg-scooter-50 py-10">
      <div className="flex h-10 w-[212px] items-center justify-center gap-2 rounded-[100px] bg-shades-black font-medium leading-6 text-shades-white">
        <BsStarFill className="h-[18px] w-[18px]" />
        <p>Featured Properties</p>
      </div>
      <div className="absolute right-0 top-[120px] flex w-full max-w-[calc(100vw-16px)] items-center gap-[30px] overflow-scroll p-1 md:max-w-[calc(100vw-32px)] lg:max-w-[calc(100vw-100px)]">
        {properties.map((property: Property) => (
          <div key={property.id}>
            <HomeCard
              property={property}
              className="min-w-[calc(100vw/1.2)] bg-shades-white sm:min-w-[calc(100vw/2.5)] md:min-w-[calc(100vw/3.2)] xl:min-w-[calc(100vw/3.8)]"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
