"use client";
import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type AccordionListType = {
  title: string;
  points: string[];
};

export default function AccordionList({ title, points }: AccordionListType) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setheight] = useState("0px");
  const contentRef = useRef<HTMLLIElement>(null);

  function handleClick() {
    const scrollHeight = contentRef.current?.scrollHeight || 70;
    setIsOpen((open) => !open);
    setheight(!isOpen ? `${scrollHeight}px` : "0px");
  }

  return (
    <li className="mb-5">
      <div
        className="flex h-[34px] cursor-pointer items-center"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-scooter-700"></span>
          {title}
        </div>
        {isOpen ? (
          <IoIosArrowUp className="ml-1 h-3 w-3" />
        ) : (
          <IoIosArrowDown className="ml-1 h-3 w-3" />
        )}
      </div>
      <li
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all ease-linear"
      >
        <ul className="">
          {points.map((point: string) => (
            <li key={point} className="ml-4">
              - {point}
            </li>
          ))}
        </ul>
      </li>
    </li>
  );
}
