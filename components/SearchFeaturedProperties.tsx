import React from "react";
import Container from "./Container";
import HomeCard from "./HomeCard";

type Property = {
  id: string;
  title_address: string;
  url: string;
  images: string[];
  state_address: string;
  price: number;
  property_type: string;
  listed_in: string;
  bedNumber: number;
  bathNumber: number;
};

type SearchFeaturedPropertiesType = {
  properties: Property[];
};

export default function SearchFeaturedProperties({
  properties,
}: SearchFeaturedPropertiesType) {
  return (
    <Container className="relative mt-10 flex min-h-[644px] w-full overflow-hidden bg-scooter-50 py-20">
      <div className="absolute right-0 flex max-w-[calc(100vw-16px)] items-center gap-[30px] overflow-scroll py-1 md:max-w-[calc(100vw-32px)] lg:max-w-[calc(100vw-100px)]">
        {properties.map((property: Property) => (
          <div key={property.url}>
            <HomeCard
              property={property}
              className="min-w-[calc(100vw/1.4)] bg-shades-white sm:min-w-[calc(100vw/2.5)] md:min-w-[calc(100vw/3.2)] xl:min-w-[calc(100vw/3.8)]"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
