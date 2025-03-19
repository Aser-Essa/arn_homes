"use client";
import React from "react";
import Container from "./Container";
import Title from "./Title";
import { Button } from "./ui/button";
import ReviewCard from "./ReviewCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Reviews() {
  return (
    <>
      <Container className="h-[614px] space-y-10 bg-scooter-50 pt-14 font-exo">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <Title>Customer Reviews</Title>
            <Button className="h-full bg-scooter-600">See all reviews</Button>
          </div>
          <p className="text-lg font-medium">
            See what our client’s are saying
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            duration: 6000,
            watchDrag: false,
          }}
          plugins={[
            Autoplay({
              delay: 0,
            }),
          ]}
        >
          <CarouselContent className="overflow-visible">
            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ReviewCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ReviewCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ReviewCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ReviewCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ReviewCard />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Container>
    </>
  );
}
