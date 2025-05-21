import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import ToogleFavorite from "./ToogleFavorite";
import Link from "next/link";
import { Property } from "@/types/types";
import { BsArrowUpRight } from "react-icons/bs";

type HomeCardType = {
  property: Property;
  className?: string;
};

export default function HomeCard({ property, className }: HomeCardType) {
  const {
    id,
    title,
    address,
    images,
    extras,
    bed_number,
    bath_number,
    category,
  } = property;

  const { price, monthly_rent } = extras || {};

  return (
    <Link href={`/property/${id}`} target="_blank">
      <div
        className={cn(
          "box-shadow relative overflow-hidden rounded-xl",
          className,
        )}
      >
        <div className="absolute top-[27px] z-50 flex h-[26px] w-[73px] items-center gap-1 rounded-r-full bg-shades-white p-1 pr-2">
          <div className="h-2 w-2 rounded-full bg-scooter-600"></div>
          <p className="text-xs">For {category}</p>
        </div>

        <ToogleFavorite className={"absolute right-4 top-4 z-50"} />

        <div className="space-y-4">
          <div className="relative h-[292px] w-full">
            <div className="absolute inset-0 z-[10] flex items-center justify-center bg-[#0d0e0f66] opacity-0 transition-all hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-shades-white">
                <BsArrowUpRight className="h-6 w-6" />
              </div>
            </div>
            <Image src={images?.at(0) || "/"} fill alt="image" />
          </div>
          <div className="space-y-4 px-4 pb-4">
            <div className="space-y-1">
              <p className="text-2xl font-semibold">
                {category === "rent"
                  ? `${formatPrice(Number(monthly_rent))}/Month`
                  : formatPrice(Number(price))}
              </p>
              <p className="font-semibold text-scooter-900">{title}</p>
              <p>{address}</p>
            </div>
            <div className="flex h-[56px] w-full items-center justify-between rounded-xl bg-shades-black p-4 text-shades-white">
              <div className="mx-1 flex items-center gap-2">
                <Image
                  src={"/icons/bed.svg"}
                  width={20}
                  height={14}
                  alt="bed"
                />
                <p>{bed_number}</p>
              </div>
              <div className="mx-1 flex items-center gap-2">
                <Image
                  src={"/icons/shower.svg"}
                  width={20}
                  height={14}
                  alt="bed"
                />
                <p>{bath_number}</p>
              </div>

              <div className="mx-1 flex items-center gap-2">
                <Image
                  src={"/icons/furnished.svg"}
                  width={20}
                  height={14}
                  alt="bed"
                />
                <p className="text-nowrap text-sm">Semi-furnished</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
