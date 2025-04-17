import Image from "next/image";
import React from "react";

type IconTextType = {
  icon: string;
  text: string;
};

export default function IconText({ icon, text }: IconTextType) {
  return (
    <>
      <div className="mx-1 flex items-center gap-2">
        <Image src={icon} width={20} height={14} alt="bed" />
        <p>{text}</p>
      </div>
    </>
  );
}
