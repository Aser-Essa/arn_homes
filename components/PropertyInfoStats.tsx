import React from "react";
import IconText from "./IconText";
import { cn } from "@/lib/utils";

type PropertyInfoStatsType = {
  bedNumber: number;
  bathNumber: number;
  isCard?: boolean;
};

export default function PropertyInfoStats({
  bedNumber,
  bathNumber,
  isCard,
}: PropertyInfoStatsType) {
  const statsMode = isCard ? "" : "black";

  return (
    <>
      <div
        className={cn(
          "flex h-[56px] w-full items-center justify-between gap-2 rounded-xl p-4 text-sm",
          isCard
            ? "bg-shades-black text-shades-off-white"
            : "bg-shades-off-white text-shades-black",
        )}
      >
        <IconText
          icon={`/icons/${statsMode}bed.svg`}
          text={`${bedNumber} beds`}
        />
        <IconText
          icon={`/icons/${statsMode}shower.svg`}
          text={`${bathNumber} baths`}
        />
        <IconText
          icon={`/icons/${statsMode}furnished.svg`}
          text={`Semi-furnished`}
        />
      </div>
    </>
  );
}
