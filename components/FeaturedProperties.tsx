import React from "react";
import Container from "./Container";
import HomeCard from "./HomeCard";
import Title from "./Title";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getHomesForSales } from "@/lib/data-service";

export default async function FeaturedProperties() {
  const data = await getHomesForSales({});

  return (
    <>
      <Container className="mt-[14px] space-y-5 font-exo sm:space-y-10">
        <Title>Featured Properties</Title>

        <Carousel>
          <CarouselContent>
            {data.map(
              ({
                url,
                title_address,
                state_address,
                images,
                price,
                bedNumber,
                bathNumber,
              }) => (
                <CarouselItem key={url} className="sm:basis-1/2 lg:basis-1/3">
                  <HomeCard
                    title_address={title_address}
                    state_address={state_address}
                    image={images?.at(0)}
                    price={price}
                    bedNumber={bedNumber}
                    bathNumber={bathNumber}
                  />
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <div className="mt-10 flex items-center justify-end gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </Container>
    </>
  );
}
