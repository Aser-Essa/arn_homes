"use client";
import Container from "./Container";
import Title from "./Title";
import { Button } from "./ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ReviewCard from "./ReviewCard";
import { Review } from "@/types/types";
import { useRouter } from "next/navigation";

type ReviewsSectionType = {
  reviews: Review[];
};

export default function ReviewsSection({ reviews }: ReviewsSectionType) {
  const router = useRouter();

  function handleClick() {
    router?.push("/reviews");
  }

  return (
    <>
      <Container className="h-[614px] space-y-10 overflow-x-hidden bg-scooter-50 pt-14 font-exo">
        <div className="space-y-2 sm:space-y-5">
          <div className="flex items-center justify-between">
            <Title>Customer Reviews</Title>
            <Button
              className="hidden h-full bg-scooter-600 hover:bg-scooter-500 sm:block"
              onClick={handleClick}
            >
              See all reviews
            </Button>
          </div>
          <p className="text-lg font-medium">
            See what our client’s are saying
          </p>
          <Button className="h-12 bg-scooter-600 hover:bg-scooter-500 sm:hidden">
            See all reviews
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            duration: 8000,
            watchDrag: false,
          }}
          plugins={[
            Autoplay({
              delay: 0,
            }),
          ]}
        >
          <CarouselContent className="overflow-visible">
            {reviews?.map((review, idx) => (
              <CarouselItem
                key={`${review?.name}-${idx}`}
                className="sm:basis-[47%] lg:basis-[32%]"
              >
                <ReviewCard reviewData={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </>
  );
}
