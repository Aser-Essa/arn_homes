import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <>
      <Link href={"/"} className="flex items-end gap-2 leading-4">
        <p className="text-nowrap text-xl font-semibold">Arn Homes</p>
        <Image src={"/Logo.svg"} width={47} height={47} alt="Logo" />
      </Link>
    </>
  );
}
