"use client";

import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { sendMessage as sendMessageToSupabase } from "@/lib/actions/chats";
import { User } from "@/types/types";

interface UseRealtimeChatProps {
  roomName: string;
  username: string;
  chatId: string;
  sender: User;
  propertyId: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  sent_at: string;
  chatId: string;
}

const EVENT_MESSAGE_TYPE = "message";

export function useRealtimeChat({
  roomName,
  username,
  chatId,
  sender,
  propertyId,
}: UseRealtimeChatProps) {
  const { user } = useUser();
  const { id } = user || {};

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [channel, setChannel] = useState<ReturnType<
    typeof supabase.channel
  > | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newChannel = supabase.channel(roomName);
    newChannel
      .on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setMessages((current) => [...current, payload.payload as ChatMessage]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        }
      });

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [roomName, username]);

  //   useEffect(() => {
  //   if (!chatId || !id) return;
  //   markMessagesAsRead({
  //     userId: id ? String(id) : "",
  //     chatId,
  //   });
  // }, [chatId, id]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return;

      // Send message to Supabase and get the real DB record
      const dbMessage = await sendMessageToSupabase({
        senderId: id!,
        receiverId: sender.id,
        propertyId,
        content,
      });

      if (!dbMessage) return; // Optional: handle errors

      const message: ChatMessage = {
        id: dbMessage.id, // use DB-generated ID
        content: dbMessage.content,
        sender_id: dbMessage.sender_id,
        sent_at: dbMessage.sent_at,
        chatId: dbMessage.chat_id,
      };

      setMessages((current) => [...current, message]);

      await channel.send({
        type: "broadcast",
        event: EVENT_MESSAGE_TYPE,
        payload: message,
      });
    },
    [channel, chatId, id, isConnected, propertyId, sender.id],
  );

  return { messages, sendMessage, isConnected };
}
