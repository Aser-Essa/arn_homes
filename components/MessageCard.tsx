import { getChatMessages, getUser } from "@/lib/data-service";
import { formatDateLong } from "@/lib/utils";
import { Property } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

type MessageCardType = {
  chat: {
    id: string;
    property_id: string;
    user_one: string;
    user_two: string;
  };
  property: Property;
};

export default async function MessageCard({ chat, property }: MessageCardType) {
  const { images, title } = property;
  const { id, user_one, user_two } = chat;
  const senderId = user_one === user_two ? user_two : user_one;

  const { userId } = await auth();

  const { user: sender } = await getUser(senderId);
  const { full_name } = sender;

  const Data = await getChatMessages({
    userId: userId ? String(userId) : "",
    chatId: id,
  });
  if (!Data) {
    return <div className="p-4 text-red-500">No messages found.</div>;
  }

  const { messages } = Data;

  const sortedMessages = messages.sort((a, b) =>
    a.sent_at.localeCompare(b.sent_at),
  );

  const lastMessage = sortedMessages?.at(-1);

  const lastMessageDate = formatDateLong(lastMessage?.sent_at);
  const lastMessageContent = lastMessage?.content;

  const hasOneMessageAtLeast = messages?.length > 0;

  return (
    <>
      {hasOneMessageAtLeast && (
        <Link href={`/account/messages/${id}`} className="block">
          <div className="box-shadow flex h-[102px] w-full cursor-pointer items-center gap-4 rounded-xl p-4 transition-all hover:bg-shades-off-white">
            <div className="relative min-h-16 min-w-16 overflow-hidden rounded-[8px]">
              <Image fill src={images?.at(0) || "/"} alt="" />
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <p className="text-lg font-semibold text-scooter-700">
                    {title}
                  </p>
                  <p className="text-lg">•</p>
                  <p className="text-sm">{lastMessageDate}</p>
                </div>
                <p className="text-sm font-semibold text-amber-600">
                  {full_name}
                </p>
                <p className="max-w-[35vw] overflow-hidden text-ellipsis text-sm">
                  {lastMessageContent}
                </p>
              </div>
              <IoIosArrowForward className="h-5 w-5" />
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
