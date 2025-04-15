import React from "react";
import HomeCard from "./HomeCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPropertiesForSales } from "@/lib/data-service";
import Container from "./Container";
import { cn } from "@/lib/utils";

export default async function FeaturedProperties({
  title,
  className,
}: {
  title: React.ReactNode;
  className?: string;
}) {
  const { data } = await getPropertiesForSales({});

  return (
    <Container className={cn(className)}>
      {title}
      <Carousel>
        <CarouselContent>
          {data.map(
            ({
              id,
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
                  id={id}
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
  );
}
