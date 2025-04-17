import React from "react";
import Container from "./Container";
import Title from "./Title";
import ArticleCard from "./ArticleCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Blog() {
  return (
    <>
      <Container className="mt-14 space-y-5 font-exo sm:space-y-10">
        <Title>Blog</Title>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ArticleCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ArticleCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ArticleCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ArticleCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <ArticleCard />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Container>
    </>
  );
}
