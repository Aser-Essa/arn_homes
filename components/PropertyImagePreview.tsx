"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type PropertyImagePreviewType = {
  images: string[];
};

export default function PropertyImagePreview({
  images,
}: PropertyImagePreviewType) {
  const [selectedImage, setSelectedImage] = useState(0);

  function handleClick(idx: number) {
    setSelectedImage(idx);
  }

  return (
    <>
      <div className="relative min-h-full w-[600px]">
        <Image
          src={images?.at(selectedImage) ?? "/HerosectionBG2.jpg"}
          fill
          alt="image"
          className="rounded-[20px]"
        />
      </div>
      <div className="max-h-[403px] space-y-5 overflow-y-scroll">
        {images.map((image, idx) => (
          <div
            key={`${image} ${idx}`}
            className={cn(
              "relative h-[70px] w-20 cursor-pointer overflow-hidden rounded-lg transition-all",
              `${idx == selectedImage && "border border-shades-black"}`,
            )}
            onClick={() => handleClick(idx)}
          >
            <Image
              src={images.at(idx) ?? "/HerosectionBG2.jpg"}
              fill
              alt="image"
            />
          </div>
        ))}
      </div>
    </>
  );
}
