"use client";

import { cn } from "@/lib/utils";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatMessage, useRealtimeChat } from "@/hooks/use-realtime-chat";
import { ChatMessageItem } from "./chat-message";
import { User } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "./textarea";
import { GrAttachment } from "react-icons/gr";
import { markMessagesAsRead } from "@/lib/actions/chats";

interface RealtimeChatProps {
  roomName: string;
  username: string;
  onMessage?: (messages: ChatMessage[]) => void;
  messages?: ChatMessage[];
  sender: User;
  chatId: string;
  propertyId: string;
}

/**
 * Realtime chat component
 * @param roomName - The name of the room to join. Each room is a unique chat.
 * @param username - The username of the user
 * @param onMessage - The callback function to handle the messages. Useful if you want to store the messages in a database.
 * @param messages - The messages to display in the chat. Useful if you want to display messages from a database.
 * @returns The chat component
 */
export const RealtimeChat = ({
  roomName,
  username,
  onMessage,
  messages: initialMessages = [],
  sender,
  chatId,
  propertyId,
}: RealtimeChatProps) => {
  const { user } = useUser();
  const { id } = user || {};

  const { containerRef, scrollToBottom } = useChatScroll();

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName,
    username,
    sender,
    chatId,
    propertyId,
  });

  const [newMessage, setNewMessage] = useState("");

  // Merge realtime messages with initial messages
  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...realtimeMessages];

    const uniqueMessages = mergedMessages.filter(
      (message, index, self) =>
        index ===
        self.findIndex(
          (m) =>
            m.id === message.id ||
            (m.content === message.content &&
              m.sent_at === message.sent_at &&
              m.sender_id === message.sender_id),
        ),
    );

    return uniqueMessages.sort((a, b) => a.sent_at.localeCompare(b.sent_at));
  }, [initialMessages, realtimeMessages]);

  useEffect(() => {
    if (onMessage) {
      onMessage(allMessages);
    }
  }, [allMessages, onMessage]);

  useEffect(() => {
    markMessagesAsRead({
      userId: id ? String(id) : "",
      chatId,
    });
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [allMessages, chatId, id, scrollToBottom]);

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim() || !isConnected) return;

      sendMessage(newMessage);
      setNewMessage("");
    },
    [newMessage, isConnected, sendMessage],
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(e);
    }
  }

  return (
    <div className="box-shadow text-foreground mt-5 flex h-[704px] w-full flex-col rounded-[20px] p-6 antialiased">
      <div ref={containerRef} className="flex-1 space-y-4 overflow-y-auto">
        {allMessages.length === 0 ? (
          <div className="text-muted-foreground text-center text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : null}
        <div className="space-y-5">
          {allMessages.map((message) => {
            // const prevMessage = index > 0 ? allMessages[index - 1] : null;
            const showHeader = false;
            // !prevMessage || prevMessage.user.name !== message.user.name;

            return (
              <div
                key={message.id}
                className="duration-300 animate-in fade-in slide-in-from-bottom-4"
              >
                <ChatMessageItem
                  message={message}
                  isOwnMessage={message.sender_id === id}
                  showHeader={showHeader}
                  sender={sender}
                />
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="mt-5 flex w-full flex-col items-end gap-5"
      >
        <div className="flex w-full items-start gap-2.5">
          <div className="flex !h-10 !w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white">
            <GrAttachment />
          </div>
          <Textarea
            className={cn(
              "h-fit min-h-[50px] w-full resize-none rounded-xl border-[1.5px] border-amber-100 px-4 py-3 text-start !text-base outline-none ring-0 transition-all duration-300 placeholder:text-lg placeholder:text-gray-300 focus:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2] lg:h-[200px] lg:p-4",
            )}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            // disabled={!isConnected}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Button
          className="aspect-square h-[50px] rounded-xl text-lg font-medium duration-300 animate-in fade-in slide-in-from-right-4"
          type="submit"
          disabled={!(isConnected && newMessage.trim())}
        >
          <p>Send</p>
          <Send className="!size-5" />
        </Button>
      </form>
    </div>
  );
};
