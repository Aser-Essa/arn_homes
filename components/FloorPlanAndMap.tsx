import Image from "next/image";
import React from "react";
import Map from "./Map";
import { getCoordinates } from "@/lib/data-service";

type FloorPlanAndMapType = {
  floor_plan: string;
  state_address: string;
  title_address: string;
};

export default async function FloorPlanAndMap({
  floor_plan,
  state_address,
  title_address,
}: FloorPlanAndMapType) {
  const coordinates = await getCoordinates(`${state_address} ${title_address}`);

  if (!coordinates) {
    return null;
  }

  const { lat, lng } = coordinates;

  return (
    <div className="flex flex-col gap-[30px] lg:flex-row">
      <div className="box-shadow min-h-[403px] flex-1 space-y-5 rounded-[20px] font-exo sm:p-6">
        <p className="text-[36px] font-semibold">Floor Plan</p>
        <div className="relative aspect-square h-[343px] w-full sm:aspect-auto sm:h-[444px] sm:max-h-[444px]">
          <Image
            src={floor_plan}
            fill
            alt="floor_plan"
            className="rounded-[20px]"
          />
        </div>
      </div>

      <div className="box-shadow min-h-[403px] flex-1 space-y-5 rounded-[20px] font-exo sm:p-6">
        <p className="text-[36px] font-semibold">Map</p>

        <Map lat={lat} lng={lng} controllerClassName="bottom-3" />
      </div>
    </div>
  );
}
