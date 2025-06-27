"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";

type ImagesSliderType = {
  images: string[];
  className?: string;
  selectedImage?: number;
  setSelectedImage?: Dispatch<SetStateAction<number>>;
  centerButtonIcon: React.ReactNode;
};

export default function ImagesSlider({
  images,
  selectedImage = 0,
  setSelectedImage = () => {},
  className,
  centerButtonIcon,
}: ImagesSliderType) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setSelectedImage(api.selectedScrollSnap());
    });
  }, [api, setSelectedImage]);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(selectedImage);
  }, [api, selectedImage]);

  return (
    <>
      <Carousel
        className={cn("h-full w-full flex-1 overflow-hidden", className)}
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="!h-full">
          {Array.from({ length: images?.length || 1 }).map((_, index) => (
            <CarouselItem key={index} className="!h-full">
              <div className={cn("relative h-full")}>
                <Image
                  src={images?.at(index) ?? "/HerosectionBG2.jpg"}
                  fill
                  alt="image"
                  className="rounded-l-xl sm:rounded-l-[20px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 z-[1000] flex h-[32px] items-center justify-center gap-1 rounded-xl bg-shades-white px-2 py-1 text-sm">
          <BsCardImage />
          {current}/{images?.length}
        </div>

        <div className="absolute inset-0 z-[10] flex items-center justify-center rounded-l-[20px] bg-[#0d0e0f66] opacity-0 transition-all hover:opacity-100">
          {centerButtonIcon}
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <CarouselPrevious className="absolute left-5 top-1/2 !h-6 !w-6 -translate-y-1/2 rounded border-none shadow-none hover:bg-gray-50 disabled:opacity-60" />
            <CarouselNext className="absolute right-5 top-1/2 !h-6 !w-6 -translate-y-1/2 rounded border-none shadow-none hover:bg-gray-50 disabled:opacity-60" />
          </div>
        </div>
      </Carousel>
    </>
  );
}
