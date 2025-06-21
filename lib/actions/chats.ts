"use server";

import { supabase } from "../supabase";
import { isChatExist } from "../queries/chats";
import { createMessageNotification } from "../notification-helpers";
import { getUser } from "../queries/users";

type ChatDataType = {
  senderId: string;
  receiverId: string;
  propertyId: string;
};

type sendMessageType = {
  content: string;
  senderId: string;
  sent_at?: string;
} & ChatDataType;

export async function createChat({
  senderId,
  receiverId,
  propertyId,
}: ChatDataType) {
  let chat = await isChatExist({ senderId, receiverId, propertyId });
  if (chat) {
    chat = chat?.chat;
    return { chat };
  }
  const { data: chatData, error: chatDataError } = await supabase
    .from("chats")
    .insert({
      user_one: senderId,
      user_two: receiverId,
      property_id: propertyId,
    })
    .select()
    .single();

  if (chatDataError) {
    console.error(chatDataError?.message);
    return null;
  }

  return { chat: chatData };
}

export async function sendMessage({
  senderId,
  receiverId,
  propertyId,
  content,
}: sendMessageType) {
  let result = await isChatExist({ senderId, receiverId, propertyId });

  if (!result) {
    result = await createChat({ senderId, receiverId, propertyId });
  }

  if (!result || !result.chat) {
    console.error("Chat not found or could not be created.");
    return null;
  }

  const chat = result?.chat;

  const { data: newMessage, error: messageError } = await supabase
    .from("messages")
    .insert({
      chat_id: chat?.id,
      sender_id: senderId,
      content: content,
    })
    .select()
    .single();

  if (messageError) {
    console.error(messageError);
    return null;
  }

  const { user: sender } = await getUser(senderId);

  await createMessageNotification({
    recipientUserId: receiverId,
    senderName: sender?.full_name,
    messagePreview: content,
    messageId: newMessage.id,
  });

  return newMessage;
}

export async function deleteMessagesForUser({
  userId,
  chatId,
}: {
  userId: string;
  chatId: string;
}) {
  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("id")
    .eq("chat_id", chatId);

  if (messagesError) {
    console.error("Error fetching messages for chat:", messagesError);
    return false;
  }

  if (!messages || messages.length === 0) {
    return true; // no messages to delete
  }

  // 3. Insert deletions for each message for this user
  const deletions = messages.map((m) => ({
    user_id: userId,
    message_id: m.id,
  }));

  const { error: messageDeletionError } = await supabase
    .from("message_deletions")
    .upsert(deletions, { onConflict: "user_id,message_id" });

  if (messageDeletionError) {
    console.error("Error deleting messages for user:", messageDeletionError);
    return false;
  }

  return true;
}

export async function markMessagesAsRead({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) {
  const { error } = await supabase
    .from("messages")
    .update({ status: "read" })
    .eq("chat_id", chatId)
    .neq("sender_id", userId)
    .neq("status", "read");

  if (error) {
    console.error("Error updating message status to read:", error);
    return false;
  }

  return true;
}
