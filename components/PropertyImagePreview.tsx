"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import ScrollImagesSelector from "./ScrollImagesSelector";
import { BsCardImage } from "react-icons/bs";

type PropertyImagePreviewType = {
  images: string[];
};

export default function PropertyImagePreview({
  images,
}: PropertyImagePreviewType) {
  const [selectedImage, setSelectedImage] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full max-w-full flex-1 flex-wrap gap-5 lg:flex-nowrap">
      <div
        className="relative aspect-video w-full flex-1 sm:min-h-[403px] lg:max-h-[450px]"
        ref={mainImageRef}
      >
        <Image
          src={images?.at(selectedImage) ?? "/HerosectionBG2.jpg"}
          fill
          alt="image"
          className="rounded-[20px]"
        />
        <div className="absolute bottom-4 right-4 z-[1000] flex h-[32px] items-center justify-center gap-1 rounded-xl bg-shades-white px-2 py-1 text-sm">
          <BsCardImage />
          {selectedImage + 1}/{images?.length}
        </div>
      </div>

      <ScrollImagesSelector
        images={images}
        mainImageRef={mainImageRef}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
