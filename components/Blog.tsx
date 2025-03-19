import React from "react";
import Container from "./Container";
import Title from "./Title";
import BlogCard from "./BlogCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Blog() {
  return (
    <>
      <Container className="mt-14 space-y-10 font-exo">
        <Title>Blog</Title>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <BlogCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <BlogCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <BlogCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <BlogCard />
            </CarouselItem>

            <CarouselItem className="sm:basis-[47%] lg:basis-[32%]">
              <BlogCard />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Container>
    </>
  );
}
