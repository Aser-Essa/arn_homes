import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoIosArrowForward } from "react-icons/io";

export default function SupscripeNewsLetter() {
  return (
    <>
      <div className="relative top-[-59px] mx-auto h-[82px] w-[710px] rounded-xl bg-shades-white p-4">
        <div className="flex h-full flex-1 items-center space-x-2 rounded-xl border border-amber-200 font-exo">
          <Input
            type="text"
            placeholder="Subscribe to our newsletter "
            className="h-full w-full border-none px-4 py-3 text-lg text-shades-black shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300"
          />
          <Button
            type="submit"
            className="relative right-[-1px] h-[calc(100%+2px)]"
          >
            Subscribe
            <IoIosArrowForward className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}
