import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ScrollImagesSelectorType = {
  images: string[];
  mainImageRef: React.RefObject<HTMLDivElement | null>;
  selectedImage: number | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
};

export default function ScrollImagesSelector({
  images,
  mainImageRef,
  selectedImage,
  setSelectedImage,
}: ScrollImagesSelectorType) {
  const [height, setHeight] = useState(0);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function handleClick(idx: number) {
    setSelectedImage(idx);
  }

  const updateFadeVisibility = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setShowTopFade(container.scrollTop > 0);
    setShowBottomFade(
      container.scrollTop + container.clientHeight < container.scrollHeight,
    );
    setShowLeftFade(container.scrollLeft > 0);
    setShowRightFade(
      container.scrollLeft + container.clientWidth < container.scrollWidth,
    );
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    updateFadeVisibility();
    container.addEventListener("scroll", updateFadeVisibility);
    return () => container.removeEventListener("scroll", updateFadeVisibility);
  }, [updateFadeVisibility, images]);

  useEffect(() => {
    const mainContainer = mainImageRef.current;
    if (!mainContainer) return;
    const updateHeight = () => {
      const newHeight = mainContainer?.getBoundingClientRect().height;
      setHeight(newHeight);
      updateFadeVisibility();
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(mainContainer);
    updateHeight();
    return () => observer.disconnect();
  }, [updateFadeVisibility, mainImageRef]);

  return (
    <>
      <div className="relative overflow-auto">
        <div
          className="flex min-w-20 space-x-5 space-y-0 overflow-auto lg:block lg:space-x-0 lg:space-y-5"
          style={{ maxHeight: height }}
          ref={scrollContainerRef}
        >
          {images.map((image: string, idx: number) => (
            <div
              key={`${image} ${idx}`}
              className={cn(
                "relative min-h-[70px] min-w-20 cursor-pointer overflow-hidden rounded-lg transition-all",
                `${idx == selectedImage && "border border-shades-black"}`,
              )}
              onClick={() => handleClick(idx)}
            >
              <Image
                src={image ?? "/HerosectionBG2.jpg"}
                fill
                loading="lazy"
                alt={`Preview image ${idx + 1}`}
              />
            </div>
          ))}
        </div>
        {showTopFade && (
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-5 w-full bg-gradient-to-b from-white to-transparent" />
        )}
        {showBottomFade && (
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-5 w-full bg-gradient-to-t from-white to-transparent" />
        )}
        {showRightFade && (
          <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-full w-5 bg-gradient-to-l from-white to-transparent" />
        )}
        {showLeftFade && (
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-full w-5 bg-gradient-to-r from-white to-transparent" />
        )}
      </div>
    </>
  );
}
