import Image from "next/image";
import React from "react";
import Stars from "./Stars";
import { BsArrowUpRight } from "react-icons/bs";

export default function ReviewCard() {
  return (
    <>
      <div
        className="space-y-4 rounded-xl bg-shades-white p-4"
        style={{
          boxShadow: "0 20px 24px -4px #ffecb30a, 0 8px 11px -4px #2d364323",
        }}
      >
        <div className="flex items-center gap-2.5">
          <Image src={"/avatar.png"} width={40} height={40} alt="Avatar" />
          <div className="text-sm">
            <p className="font-semibold">Bruono Marcos</p>
            <p>Jan 19, 2023</p>
          </div>
        </div>
        <p>
          Wanted an online agent to market my bungalow and rang loads to see how
          they answered the phone....
        </p>
        <div className="flex h-10 items-center justify-between">
          <Stars count={5} />
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-shades-black">
            <BsArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </>
  );
}
