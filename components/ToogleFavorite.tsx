"use client";

import { useSavedPropertiesRealtime } from "@/hooks/useSavedPropertiesRealtime";
import { refresh, toogleFavorite } from "@/lib/actions/favorites";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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
  const userId = user?.id || "";

  useEffect(() => {
    setIsFavorite(isSaved); // Sync with new SSR value on re-render
  }, [isSaved]);

  useSavedPropertiesRealtime(userId, async ({ eventType }) => {
    if (eventType === "INSERT") {
      toast.success("Property Saved Successfully");
    } else if (eventType === "DELETE") {
      toast.success("Property Removed Successfully");
    }
    await refresh();
  });

  if (!userId) return null;

  async function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    await toogleFavorite({
      user_id: userId,
      property_id,
      category,
    });
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-white",
        className,
      )}
      onClick={handleClick}
    >
      <Image
        src={isFavorite ? "/icons/fillheart.svg" : "/icons/outlineheart.svg"}
        width={18}
        height={18}
        alt="heart"
      />
    </div>
  );
}
