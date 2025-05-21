import React from "react";
import MessageCard from "./MessageCard";
import { getChats, getProperty } from "@/lib/data-service";
import { auth } from "@clerk/nextjs/server";

export default async function MessagesList() {
  const { userId } = await auth();

  const chatData = await getChats(userId ? String(userId) : "");

  if (!chatData) {
    return <div className="p-4 text-red-500">No chats found.</div>;
  }

  const { chats } = chatData;

  const chatCardsData = await Promise.all(
    chats.map(async (chat) => {
      const { property } = await getProperty(chat.property_id);
      return { chat, property };
    }),
  );

  return (
    <>
      <div className="mt-4 space-y-5">
        {chatCardsData?.map(({ chat, property }, idx) => (
          <MessageCard
            key={`${chat?.id} ${idx}`}
            chat={chat}
            property={property}
          />
        ))}
      </div>
    </>
  );
}
