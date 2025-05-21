import ChatHeader from "@/components/ChatHeader";
import Container from "@/components/Container";
import { RealtimeChat } from "@/components/ui/realtime-chat";
import { ChatMessage } from "@/hooks/use-realtime-chat";
import { getChatMessages, getProperty, getUser } from "@/lib/data-service";
import { params } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type Params = Promise<params>;

export default async function page({ params }: { params: Params }) {
  const { userId } = await auth();

  const { id } = await params;
  const chatId = id ? String(id) : "";
  const chatData = await getChatMessages({
    userId: userId ? String(userId) : "",
    chatId,
  });

  if (!chatData) {
    return <div className="p-4 text-red-500">Chat not found.</div>;
  }

  const { chat, messages } = chatData;

  const { property_id, user_one, user_two } = chat;

  const senderId = user_one === userId ? user_two : user_one;

  const { user: sender } = await getUser(senderId);
  const { user: user } = await getUser(userId ? String(userId) : "");

  const { property } = await getProperty(property_id);
  const { title, images } = property;

  return (
    <Container className="w-full !px-4 !py-6 md:h-[946px] md:w-[76vw] md:overflow-y-scroll md:!p-10">
      <ChatHeader
        title={title}
        images={images}
        sender={sender}
        chatId={chatId}
      />
      <RealtimeChat
        roomName={chatId}
        username={user.full_name}
        messages={messages as ChatMessage[]}
        propertyId={property_id}
        sender={sender}
        chatId={chatId}
      />
    </Container>
  );
}
