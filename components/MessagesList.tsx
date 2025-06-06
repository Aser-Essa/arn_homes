import React from "react";
import MessageCard from "./MessageCard";
import { chat, message, Property } from "@/types/types";

type MessagesListType = {
  chatCardsData: {
    chat: chat;
    property: Property;
  }[];
  unReadMessages: message[];
};

export default async function MessagesList({
  chatCardsData,
  unReadMessages,
}: MessagesListType) {
  return (
    <>
      <div className="mt-4 space-y-5 sm:mt-5">
        {chatCardsData?.map(({ chat, property }, idx) => (
          <MessageCard
            key={`${chat?.id} ${idx}`}
            chat={chat}
            property={property}
            unReadMessages={unReadMessages}
          />
        ))}
      </div>
    </>
  );
}
