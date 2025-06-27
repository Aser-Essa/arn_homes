"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AddPropertyButton({
  className,
}: {
  className: string;
}) {
  const router = useRouter();

  function handleClick() {
    router.push("/account/add_property");
  }

  return (
    <>
      <Button className={cn(className)} onClick={handleClick}>
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
