"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddPropertyButton() {
  const router = useRouter();

  function handleClick() {
    router.push("/account/add_property");
  }

  return (
    <>
      <Button
        className="hidden h-[58px] items-center gap-2 md:px-3 md:py-2 min-[820px]:flex lg:px-6 lg:py-4"
        onClick={handleClick}
      >
        <Image
          src={"/icons/home_price.svg"}
          width={18}
          height={18}
          alt="home"
          className="mt-[-4px]"
        />
        Add Listing
      </Button>
    </>
  );
}
