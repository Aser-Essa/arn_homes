import React from "react";
import HomeCard from "./HomeCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { getProperties } from "@/lib/queries/properties";

export default async function FeaturedProperties({
  title,
  className,
}: {
  title: React.ReactNode;
  className?: string;
}) {
  const { data: properties } = await getProperties({});

  const hasProperties = Array.isArray(properties) && properties.length > 0;

  return (
    <Container className={cn(className)}>
      {title}
      {hasProperties ? (
        <Carousel>
          <CarouselContent>
            {properties.map((property) => (
              <CarouselItem
                key={property.id}
                className="sm:basis-1/2 lg:basis-1/3"
              >
                <HomeCard property={property} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-10 flex items-center justify-end gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      ) : (
        <div className="flex h-[200px] w-full items-center justify-center">
          <p className="text-shades-gray-500 text-lg font-semibold">
            No properties found
          </p>
        </div>
      )}
    </Container>
  );
}
