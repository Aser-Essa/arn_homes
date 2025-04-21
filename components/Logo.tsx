import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <>
      <Link href={"/"} className="flex items-end gap-2 leading-4">
        <p className="hidden text-nowrap text-xl font-semibold sm:block">
          Arn Homes
        </p>
        <div className="relative h-[36px] w-[36px] sm:h-[47px] sm:w-[47px]">
          <Image src={"/Logo.svg"} fill alt="Logo" />
        </div>
      </Link>
    </>
  );
}
