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
    <div className="flex gap-[30px]">
      <div className="box-shadow mb-[10000px] mt-10 min-h-[403px] flex-1 space-y-5 rounded-[20px] p-6 font-exo">
        <p className="text-[36px] font-semibold">Floor Plan</p>
        <div className="relative h-[444px] w-full">
          <Image
            src={floor_plan}
            fill
            alt="floor_plan"
            className="rounded-[20px]"
          />
        </div>
      </div>

      <div className="box-shadow mb-[10000px] mt-10 min-h-[403px] flex-1 space-y-5 rounded-[20px] p-6 font-exo">
        <p className="text-[36px] font-semibold">Map</p>

        <Map lat={lat} lng={lng} />
      </div>
    </div>
  );
}
