import Image from "next/image";
import React from "react";

export default function HomeCard() {
  return (
    <>
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          boxShadow: "0 0 1px 0 #0c1a4b3d, 0 3px 8px -1px #3333480d",
        }}
      >
        <div className="absolute top-[27px] z-50 flex h-[26px] w-[73px] items-center gap-1 rounded-r-full bg-shades-white p-1 pr-2">
          <div className="h-2 w-2 rounded-full bg-scooter-600"></div>
          <p className="text-xs">For sale</p>
        </div>

        <div className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"></div>

        <div className="space-y-4">
          <div className="relative h-[292px] w-full">
            <Image src={"/card1.png"} fill alt="image" />
          </div>
          <div className="space-y-4 px-4 pb-4">
            <div className="space-y-1">
              <p className="text-2xl font-semibold">£4,250</p>
              <p className="font-semibold text-scooter-900">
                Semi detached house
              </p>
              <p>Southfield Road, Oxford OX4</p>
            </div>
            <div className="flex h-[56px] w-full items-center justify-between rounded-xl bg-shades-black p-4 text-shades-white">
              <p>3</p>
              <p>2</p>
              <p>Semi-furnished</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
