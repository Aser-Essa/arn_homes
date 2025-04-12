"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

export default function ToogleFavorite({ className }: { className?: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite((isFavorite) => !isFavorite);
  }

  return (
    <>
      <div
        className={cn(
          "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-white",
          className,
        )}
        onClick={handleClick}
      >
        {isFavorite ? (
          <Image
            src={"/icons/fillheart.svg"}
            width={18}
            height={18}
            alt="heart"
          />
        ) : (
          <Image
            src={"/icons/outlineheart.svg"}
            width={18}
            height={18}
            alt="heart"
          />
        )}
      </div>
    </>
  );
}
