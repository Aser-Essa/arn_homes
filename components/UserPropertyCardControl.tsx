"use client";
import React from "react";
import { IoTrash } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { deleteMyProperty } from "@/lib/data-service";

type UserPropertyCardControlType = {
  userId: string;
  propertyId: string;
};

export default function UserPropertyCardControl({
  userId,
  propertyId,
}: UserPropertyCardControlType) {
  async function handleDeleteClick() {
    await deleteMyProperty({
      userId,
      propertyId,
    });
  }

  return (
    <>
      <div className="absolute right-5 top-5 flex items-center gap-4">
        <div
          className={cn(
            "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white xl:flex",
          )}
        >
          <Image src={"/icons/edit.svg"} width={24} height={24} alt="edit" />
        </div>

        <div
          className={cn(
            "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white xl:flex",
          )}
        >
          <Image
            src={"/icons/insight.svg"}
            width={24}
            height={24}
            alt="insight"
          />
        </div>

        <div
          className={cn(
            "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white xl:flex",
          )}
        >
          <FaPowerOff className="h-4 w-4" />
        </div>

        <div
          className={cn(
            "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white xl:flex",
          )}
          onClick={handleDeleteClick}
        >
          <IoTrash className="h-5 w-5 text-red-500" />
        </div>

        <div
          className={cn(
            "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white sm:flex xl:hidden",
          )}
        >
          <HiOutlineDotsVertical className="h-5 w-5" />
        </div>
      </div>
    </>
  );
}
