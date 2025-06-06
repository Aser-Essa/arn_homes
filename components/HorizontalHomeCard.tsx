import React from "react";
import { Property } from "@/types/types";
import Image from "next/image";
import { BsCardImage } from "react-icons/bs";
import PropertyInfoCard from "./PropertyInfoCard";
import Link from "next/link";
import { cn } from "@/lib/utils";

type HorizontalHomeCardType = {
  property: Property;
  className?: string;
};

export default function HorizontalHomeCard({
  property,
  className,
}: HorizontalHomeCardType) {
  const { images, id } = property;
  return (
    <Link href={`/property/${id}`} target="_blank">
      <div className="box-shadow relative flex rounded-[20px]">
        <div className={cn("relative aspect-video w-full flex-1", className)}>
          <Image
            src={images?.at(0) ?? "/HerosectionBG2.jpg"}
            fill
            alt="image"
            className="rounded-l-[20px]"
          />
          <div className="absolute bottom-4 right-4 z-[1000] flex h-[32px] items-center justify-center gap-1 rounded-xl bg-shades-white px-2 py-1 text-sm">
            <BsCardImage />
            {1}/{images?.length}
          </div>
        </div>

        <PropertyInfoCard property={property} />
      </div>
    </Link>
  );
}
