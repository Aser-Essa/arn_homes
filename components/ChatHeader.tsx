"use client";
import { deleteChatForUser } from "@/lib/data-service";
import { User } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoTrash } from "react-icons/io5";

type ChatHeaderType = {
  title: string;
  images: string[];
  sender: User;
  chatId: string;
};

export default function ChatHeader({
  title,
  images,
  sender,
  chatId,
}: ChatHeaderType) {
  const { full_name } = sender;
  const router = useRouter();
  const { user } = useUser();
  const { id } = user || {};

  async function handleClickDelete() {
    await deleteChatForUser({
      userId: id ? String(id) : "",
      chatId,
    });
    router.push("/account/messages");
  }

  return (
    <div className="space-y-5">
      <p className="hidden text-[24px] font-semibold sm:block lg:text-[28px]">
        Messages
      </p>
      <div className="flex items-center gap-4">
        <Link href={"/account/messages"}>
          <IoIosArrowBack className="h-6 w-6 cursor-pointer" />
        </Link>
        <div className="flex items-start gap-4">
          <div className="h-[50px] w-[50px] bg-shades-off-white">
            {images && images.length > 0 && (
              <Image
                width={50}
                height={50}
                src={images[0]}
                alt="property"
                className="h-full w-full rounded-sm object-cover"
              />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-scooter-700"> {title}</p>
            <p className="text-sm font-semibold text-amber-600">{full_name}</p>
          </div>
        </div>

        <button
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-shades-off-white text-red-600"
          onClick={handleClickDelete}
        >
          <IoTrash />
        </button>
      </div>
    </div>
  );
}
