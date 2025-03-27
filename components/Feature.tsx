import Image from "next/image";
import React from "react";

type FeatureType = {
  icon: string;
  title: string;
  description: string;
};

export default function Feature({ icon, title, description }: FeatureType) {
  return (
    <>
      <div
        className="flex h-fit items-center gap-4 rounded-xl bg-white p-4 sm:h-[140px]"
        style={{
          boxShadow: "0 20px 24px -4px #ffecb30a, 0 8px 11px -4px #2d364323",
        }}
      >
        <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-xl bg-shades-black sm:h-[88px] sm:w-[88px]">
          <div className="relative h-6 w-6 sm:h-12 sm:w-12">
            <Image src={icon} fill alt={icon} />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">{title}</p>
          <p className="line-clamp-2 hidden overflow-hidden text-ellipsis sm:block">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
