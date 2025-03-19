import Image from "next/image";
import React from "react";

export default function BlogCard() {
  return (
    <>
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          boxShadow: "0 0 1px 0 #0c1a4b3d, 0 3px 8px -1px #3333480d",
        }}
      >
        <div className="space-y-5">
          <div className="relative h-[292px] w-full">
            <Image src={"/card1.png"} fill alt="image" />
          </div>
          <div className="space-y-2 px-4">
            <p className="text-lg font-semibold">
              Which properties are selling best right now?
            </p>
            <p>
              The demand for 3 and 4-bedroom family homes has peaked as buyers
              with reduced bud...
            </p>
          </div>
          <div className="flex items-center gap-2.5 px-4 pb-4">
            <Image src={"/avatar.png"} width={40} height={40} alt="Avatar" />
            <div className="text-sm">
              <p className="font-semibold">Bruono Marcos</p>
              <p>Jan 19, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
