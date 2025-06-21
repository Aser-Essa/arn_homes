import { getChatMessages } from "@/lib/queries/chats";
import { getUser } from "@/lib/queries/users";
import { formatDateLong } from "@/lib/utils";
import { chat, Property } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

type ChatWithProperty = chat & {
  properties: Property;
};

type MessageCardType = {
  chat: ChatWithProperty;
};

export default async function MessageCard({ chat }: MessageCardType) {
  const { id, user_one, user_two, properties } = chat;

  const { userId } = await auth();
  const senderId = user_one === userId ? user_two : user_one;
  const { user: sender } = await getUser(senderId);
  const { full_name } = sender;

  const { images, title } = properties;

  const { messages } = await getChatMessages({
    userId: userId ? String(userId) : "",
    chatId: id,
  });
  const hasOneMessageAtLeast = messages?.length > 0;

  const sortedMessages = messages.sort((a, b) =>
    a.sent_at.localeCompare(b.sent_at),
  );

  const lastMessage = sortedMessages?.at(-1);
  const lastMessageDate = formatDateLong(lastMessage?.sent_at ?? "");
  const lastMessageContent = lastMessage?.content;

  const containUnReadMessages =
    lastMessage?.status === "sent" && lastMessage?.sender_id !== userId;

  return (
    <>
      {hasOneMessageAtLeast && (
        <Link href={`/account/messages/chats/${id}`} className="relative block">
          {containUnReadMessages && (
            <div className="absolute left-2 top-2 hidden h-2 w-2 rounded-full bg-scooter-600 sm:block"></div>
          )}
          <div className="box-shadow flex w-full cursor-pointer items-center gap-2.5 rounded-xl border-b border-shades-off-white pb-2.5 pr-2.5 transition-all max-sm:shadow-none sm:h-[102px] sm:gap-4 sm:p-4 hover:sm:bg-shades-off-white">
            <div className="relative min-h-10 min-w-10 overflow-hidden rounded-[8px] sm:min-h-16 sm:min-w-16">
              <Image fill src={images?.at(0) || "/"} alt="" />
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <p className="text-sm font-semibold text-scooter-700 sm:text-lg">
                    {title}
                  </p>
                  <p className="hidden text-lg sm:block">•</p>
                  <p className="hidden text-sm sm:block">{lastMessageDate}</p>
                </div>
                <p className="text-xs font-semibold text-amber-600 sm:text-sm">
                  {full_name}
                </p>
                <p className="max-w-[35vw] overflow-hidden text-ellipsis text-xs sm:text-sm">
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
