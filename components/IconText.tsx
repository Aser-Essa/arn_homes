import Image from "next/image";
import React from "react";

type IconTextType = {
  icon: string;
  text: string;
};

export default function IconText({ icon, text }: IconTextType) {
  const [number, unit] = text.split(" ");
  return (
    <>
      <div className="mx-1 flex items-center gap-1 md:gap-2">
        <Image src={icon} width={20} height={14} alt="bed" />
        <div className="flex items-center gap-1">
          <p className="text-xs md:text-base">{number}</p>
          <p className="hidden text-xs md:text-base lg:block">{unit}</p>
        </div>
      </div>
    </>
  );
}
