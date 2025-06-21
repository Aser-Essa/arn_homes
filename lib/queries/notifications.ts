import { NotificationData } from "@/types/types";
import { supabase } from "../supabase";

export async function getUserNotifications({
  userId,
  type,
}: {
  userId: string;
  type: string;
}): Promise<NotificationData[]> {
  const types = ["message", "property", "tour", "saved_property", "system"];

  let query = supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (type && types.includes(type) && type !== "all") {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }

  return data || [];
}

export async function getNotificationsCount({
  userId,
  type = "all",
  is_read,
}: {
  userId: string;
  type?: string;
  is_read?: boolean;
}): Promise<number> {
  let query = supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (type && type.toLowerCase() !== "all") {
    query = query.eq("type", type);
  }

  if (typeof is_read === "boolean") {
    query = query.eq("is_read", is_read);
  }

  const { count, error } = await query;

  if (error) {
    console.error("Error fetching unread count:", error);
    return 0;
  }

  return count || 0;
}
