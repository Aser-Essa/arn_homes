import { supabase } from "../supabase";

type ChatDataType = {
  senderId: string;
  receiverId: string;
  propertyId: string;
};

export async function isChatExist({
  senderId,
  receiverId,
  propertyId,
}: ChatDataType) {
  const { data: chatData, error: chatError } = await supabase
    .from("chats")
    .select("*")
    .or(
      [
        `and(user_one.eq.${senderId},user_two.eq.${receiverId},property_id.eq.${propertyId})`,
        `and(user_one.eq.${receiverId},user_two.eq.${senderId},property_id.eq.${propertyId})`,
      ].join(","),
    )
    .single();

  if (chatError) {
    console.error(chatError);
    return null;
  }

  return { chat: chatData };
}

export async function getChats(userId: string) {
  const { data: chats, error } = await supabase
    .from("user_chats_with_last_message")
    .select("*")
    .or(`user_one.eq.${userId},user_two.eq.${userId}`)
    .order("sent_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const chatsData = chats.map((row) => ({
    id: row.chat_id,
    property_id: row.chat_property_id,
    user_one: row.user_one,
    user_two: row.user_two,
    created_at: row.chat_created_at,
    properties: {
      id: row.property_id,
      user_id: row.user_id,
      title: row.title,
      address: row.address,
      state: row.state,
      bed_number: row.bed_number,
      bath_number: row.bath_number,
      area: row.area,
      description: row.description,
      property_type: row.property_type,
      category: row.category,
      status: row.status,
      listed_in: row.listed_in,
      floor_plan: row.floor_plan,
      images: row.images,
      interior: row.interior,
      exterior: row.exterior,
      extras: row.extras,
    },
    last_message: row.message_id
      ? {
          id: row.message_id,
          sender_id: row.sender_id,
          content: row.content,
          sent_at: row.sent_at,
          status: row.message_status,
        }
      : null,
  }));

  return { chats: chatsData };
}

export async function getChatMessages({
  userId,
  chatId,
}: {
  userId: string;
  chatId: string;
}) {
  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  if (chatError && chatError.code !== "PGRST116") {
    throw new Error(chatError.message);
  }

  const { data: deletedMessages } = await supabase
    .from("message_deletions")
    .select("message_id")
    .eq("user_id", userId);

  const deletedMessageIds = deletedMessages?.map((m) => m.message_id) ?? [];

  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .not("id", "in", `(${deletedMessageIds.join(",")})`)
    .order("sent_at", { ascending: true });

  if (messagesError) {
    throw new Error(messagesError.message);
  }

  return { chat, messages };
}

export async function getUserMessages({ userId }: { userId: string }) {
  const { data: deletedMessages } = await supabase
    .from("message_deletions")
    .select("message_id")
    .eq("user_id", userId);

  const deletedMessageIds = deletedMessages?.map((m) => m.message_id) ?? [];

  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("*")
    .eq("sender_id", userId)
    .not("id", "in", `(${deletedMessageIds.join(",")})`)
    .order("sent_at", { ascending: true });

  if (messagesError) {
    throw new Error(messagesError.message);
  }
  return { messages };
}

export async function getUnreadMessages(userId: string) {
  const {
    data: unReadMessages,
    error,
    count,
  } = await supabase
    .from("messages")
    .select("*", { count: "exact" }) // `head: true` makes it return only the count
    .neq("sender_id", userId) // Only count messages not sent by the user
    .eq("status", "sent"); // Only messages that haven't been read

  if (error) {
    console.error("Failed to get unread messages count:", error);
    return { unreadMessageCount: 0, data: [] };
  }

  const unreadMessageCount: number = count ?? 0;

  return { unreadMessageCount, unReadMessages };
}
