"use client";
import { useRef, useState } from "react";
import ImagesSlider from "./ImagesSlider";
import ScrollImagesSelector from "./ScrollImagesSelector";
import ShowImageModal from "./ShowImageModal";

type PropertyImagePreviewType = {
  images: string[];
};

export default function PropertyImagePreview({
  images,
}: PropertyImagePreviewType) {
  const [selectedImage, setSelectedImage] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);

  console.log(images?.at(selectedImage));

  return (
    <div className="flex max-w-full flex-1 flex-wrap gap-5 lg:flex-nowrap">
      <div
        className="relative aspect-video w-full sm:min-h-[403px] lg:max-h-[450px] lg:w-[calc(100%-100px)]"
        ref={mainImageRef}
      >
        <ImagesSlider
          images={images}
          className="w-full flex-1 rounded-[20px]"
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          centerButtonIcon={
            <ShowImageModal
              imageUrl={
                images?.at(selectedImage)
                  ? String(images?.at(selectedImage))
                  : "/"
              }
            />
          }
        />
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
