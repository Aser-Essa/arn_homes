"use client";
import { toogleFavorite } from "@/lib/data-service";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";

export default function ToogleFavorite({
  className,
  isSaved = false,
  property_id,
  category,
}: {
  isSaved: boolean;
  className?: string;
  property_id: string;
  category: string;
}) {
  const [isFavorite, setIsFavorite] = useState(isSaved);

  const { user } = useUser();
  if (!user) return null; // Ensure user is available
  const { id } = user;

  async function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite((isFavorite) => !isFavorite);
    await toogleFavorite({
      user_id: id ? String(id) : "",
      property_id,
      category,
    });
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
