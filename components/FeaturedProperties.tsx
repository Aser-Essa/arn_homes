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

export default function FeaturedProperties() {
  return (
    <>
      <Container className="mt-[14px] space-y-5 font-exo sm:space-y-10">
        <Title>Featured Properties</Title>

        <Carousel>
          <CarouselContent>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <HomeCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <HomeCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <HomeCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <HomeCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <HomeCard />
            </CarouselItem>
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
