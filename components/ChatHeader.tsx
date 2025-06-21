"use client";
import { deleteMessagesForUser } from "@/lib/actions/chats";
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
    await deleteMessagesForUser({
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
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href={"/account/messages"}>
          <IoIosArrowBack className="m:w-6 h-4 w-4 cursor-pointer sm:h-6" />
        </Link>
        <div className="flex items-center gap-4 sm:items-start">
          <div className="h-10 w-10 bg-shades-off-white sm:h-[50px] sm:w-[50px]">
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
            <p className="text-sm font-semibold text-scooter-700 sm:text-lg">
              {title}
            </p>
            <p className="text-xs font-semibold text-amber-600 sm:text-sm">
              {full_name}
            </p>
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
