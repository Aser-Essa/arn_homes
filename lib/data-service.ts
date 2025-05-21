import { supabase } from "./supabase";
import { convertToMonthly } from "./utils";

type ParamsType = {
  bed_N?: string;
  bath_N?: string;
  min_Price?: string;
  max_Price?: string;
  price_Duration?: string;
  property_Type?: string;
  furniture_Type?: string;
  time_sort?: string | undefined;
  page?: string | undefined;
  state_address?: string;
};

type PropertiesType = {
  params?: ParamsType;
  perPage?: number;
  category?: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

type UserDataType = {
  id: string;
  full_name: string;
  email: string | null;
  avatar: string;
};

type getMyPropertiesType = {
  userId: string;
  category?: string;
  status?: string;
};

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

// // OLD FUNCTION
// export async function getProperties({
//   perPage = 9,
//   params = {},
// }: PropertiesType) {
//   const {
//     bed_N,
//     bath_N,
//     min_Price,
//     max_Price,
//     property_Type,
//     time_sort,
//     page,
//     state_address,
//   } = params;

//   let pageNumber = Math.max(1, Number(page) || 1);
//   let from = (pageNumber - 1) * perPage;
//   let to = from + perPage - 1;

//   const isValid = (val?: string) =>
//     val && val.toLowerCase() !== "any" && val.trim() !== "";

//   let query = supabase.from("homes_for_sale").select("*", { count: "exact" });

//   if (isValid(bed_N)) query = query.eq("bedNumber", bed_N);
//   if (isValid(bath_N)) query = query.eq("bathNumber", bath_N);
//   if (isValid(min_Price)) query = query.gte("price", Number(min_Price));
//   if (isValid(max_Price)) query = query.lte("price", Number(max_Price));
//   if (isValid(property_Type)) query = query.eq("propertytype", property_Type);

//   if (isValid(time_sort)) {
//     const days = Number(time_sort);
//     if (!isNaN(days)) {
//       const time = new Date();
//       time.setDate(time.getDate() - days);
//       query = query.gte("listed_in", time.toISOString());
//     }
//   }

//   if (isValid(state_address)) {
//     query = query.ilike("state_address", `%${state_address}%`);
//   }

//   const { count: totalCount, error: countError } = await query;
//   if (countError) throw new Error(countError.message);

//   const maxNumberOfPages = Math.ceil(Number(totalCount) / perPage);

//   pageNumber = Math.min(pageNumber, maxNumberOfPages);
//   from = (pageNumber - 1) * perPage;
//   to = from + perPage - 1;

//   const { data, count, error } = await query.range(from, to);

//   if (error) {
//     throw new Error(error.message);
//   }

//   return { data, count };
// }

// // OLD FUNCTION
// export async function getProperty(id: string) {
//   const { data: property, error } = await supabase
//     .from("homes_for_sale")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) throw new Error(error?.message);

//   return { property };
// }

export async function getProperties({
  category = "sale",
  perPage = 9,
  params = {},
}: PropertiesType) {
  const {
    bed_N,
    bath_N,
    min_Price,
    max_Price,
    property_Type,
    time_sort,
    page,
    state_address,
    price_Duration,
  } = params;

  let pageNumber = Math.max(1, Number(page) || 1);
  let from = (pageNumber - 1) * perPage;
  let to = from + perPage - 1;

  const isValid = (val?: string) =>
    val && val.toLowerCase() !== "any" && val.trim() !== "";

  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("category", category);
  // .eq("status", "reviewing");

  if (isValid(bed_N)) query = query.eq("bed_number", bed_N);
  if (isValid(bath_N)) query = query.eq("bath_number", bath_N);

  if (isValid(min_Price) && category !== "rent") {
    query = query.gte("extras->>price", Number(min_Price));
  }

  if (isValid(max_Price) && category !== "rent") {
    query = query.lte("extras->>price", Number(max_Price));
  }

  if (category === "rent" && isValid(price_Duration)) {
    if (isValid(min_Price)) {
      query = query.gte(
        "extras->>monthly_rent",
        convertToMonthly(Number(min_Price), price_Duration),
      );
    }
    if (isValid(max_Price)) {
      query = query.lte(
        "extras->>monthly_rent",
        convertToMonthly(Number(max_Price), price_Duration),
      );
    }
  }

  if (isValid(property_Type)) query = query.eq("property_type", property_Type);

  if (isValid(time_sort)) {
    const days = Number(time_sort);
    if (!isNaN(days)) {
      const time = new Date();
      time.setDate(time.getDate() - days);
      query = query.gte("listed_in", time.toISOString());
    }
  }

  if (isValid(state_address)) {
    query = query.ilike("address", `%${state_address}%`);
  }

  const { count: totalCount, error: countError } = await query;
  if (countError) throw new Error(countError.message);

  const maxNumberOfPages = Math.ceil(Number(totalCount) / perPage);
  pageNumber = Math.min(pageNumber, maxNumberOfPages);
  from = (pageNumber - 1) * perPage;
  to = from + perPage - 1;

  const { data, count, error } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
}

export async function getProperty(id: string) {
  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error?.message);

  return { property };
}

// export async function getProperty(id: string) {
//   const { data: property, error } = await supabase
//     .from("properties")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) throw new Error(error?.message);

//   return { property };
// }

export async function getMyProperties({
  userId,
  category = "sale",
  status = "active",
}: getMyPropertiesType) {
  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  if (category) {
    query = query.eq("category", category);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data: properties, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { properties, count };
}

export async function getCoordinates(
  locationInput: string,
): Promise<Coordinates | null> {
  if (!locationInput) return null;

  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY; // Make sure to define this in your .env file
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationInput)}&key=${apiKey}&limit=1`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("OpenCage API returned error:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn("No results from OpenCage for:", locationInput);
      return null;
    }

    const { lat, lng } = data.results[0].geometry;

    return { lat, lng };
  } catch (error) {
    console.error("Error during OpenCage geocoding:", error);
    return null;
  }
}

export async function getArticles({
  perPage = 9,
  params = {},
}: PropertiesType) {
  const { page } = params;

  let pageNumber = Math.max(1, Number(page) || 1);
  let from = (pageNumber - 1) * perPage;
  let to = from + perPage - 1;

  const query = supabase.from("blogs").select("*", { count: "exact" });

  const { count: totalCount, error: countError } = await query;
  if (countError) throw new Error(countError.message);

  const maxNumberOfPages = Math.ceil(Number(totalCount) / perPage);

  pageNumber = Math.min(pageNumber, maxNumberOfPages);
  from = (pageNumber - 1) * perPage;
  to = from + perPage - 1;

  const { data: articles, count, error } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return { articles, count };
}

export async function getArticle(id: string) {
  const { data: article, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error?.message);

  return { article };
}

export async function getUser(userId: string) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error?.message);

  return { user };
}

export async function createUser(userData: UserDataType) {
  try {
    const { error } = await supabase.from("users").upsert([userData]).single();

    if (error) {
      console.error("Failed to insert user:", error);
    } else {
      console.log("User inserted successfully");
    }
  } catch (err) {
    console.error("Unexpected error in createUser:", err);
  }
}

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
  const { data: chats, error: chatError } = await supabase
    .from("chats")
    .select("*")
    .or(`user_one.eq.${userId},user_two.eq.${userId}`);

  if (chatError) {
    console.error(chatError);
    return null;
  }

  return { chats };
}

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

export async function deleteChatForUser({
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
    console.error(chatError);
    return null;
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
    console.error(chatError);
    return null;
  }
  return { chat, messages };
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
  return newMessage;
}
