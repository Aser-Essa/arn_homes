"use client";
import { Separator } from "@radix-ui/react-separator";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import InteriorExteriorPreview from "./InteriorExteriorPreview";

type dataListType = {
  title: string;
  points: string[];
};

type DescriptionType = {
  description: string;
  exterior: dataListType[];
  interior: dataListType[];
};

export default function Description({
  description,
  exterior,
  interior,
}: DescriptionType) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("70px");

  function handleClick() {
    const scrollHeight = contentRef.current?.scrollHeight || 70;
    setIsOpen((isOpen) => !isOpen);
    setHeight(!isOpen ? `${scrollHeight}px` : "70px");
  }

  return (
    <div className="box-shadow hidden-box-shadow-on-mobile min-h-[403px] space-y-6 rounded-[20px] font-exo sm:p-6">
      <div className="space-y-5">
        <p className="text-[36px] font-semibold">Description</p>
        <div className="space-y-2.5">
          <div
            ref={contentRef}
            style={{ maxHeight: height }}
            className="overflow-hidden transition-all duration-500 ease-in-out"
          >
            <p className="text-ellipsis">{description}</p>
          </div>
          <button
            className="flex items-center gap-1 text-scooter-700"
            onClick={handleClick}
          >
            <p className="text-lg font-semibold">
              {isOpen ? "See less" : "See full description"}
            </p>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
      </div>

      <Separator className="h-[1px] w-full bg-gray-50" />

      <div className="space-y-5">
        <p className="text-[36px] font-semibold">Property features</p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <InteriorExteriorPreview
            data={exterior}
            title={"Exterior Features"}
          />

          <InteriorExteriorPreview
            data={interior}
            title={"Interior Features"}
          />
        </div>
      </div>
    </div>
  );
}
