"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "../supabase";
import { NotificationData } from "@/types/types";

export interface CreateNotificationData {
  userId: string;
  title: string;
  description?: string;
  type: NotificationData["type"];
  relatedId?: string;
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq("id", notificationId);

    if (error) {
      console.error("Error marking notification as read:", error);
      throw new Error("Failed to mark notification as read");
    }

    revalidatePath("/account/notifications");

    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { success: false, error: "Failed to mark notification as read" };
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true, updated_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("is_read", false);

    if (error) {
      console.error("Error marking all notifications as read:", error);
      throw new Error("Failed to mark all notifications as read");
    }

    revalidatePath("/account/notifications");

    return { success: true };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return {
      success: false,
      error: "Failed to mark all notifications as read",
    };
  }
}

export async function createNotification(
  data: CreateNotificationData,
): Promise<Notification> {
  const { data: notification, error } = await supabase
    .from("notifications")
    .insert({
      user_id: data.userId,
      title: data.title,
      description: data.description || null,
      type: data.type,
      related_id: data.relatedId || null,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error creating notification:", error);
    throw new Error("Failed to create notification");
  }

  return notification;
}

export async function deleteNotification(notificationId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);

    if (error) {
      console.error("Error deleting notification:", error);
      throw new Error("Failed to delete notification");
    }

    revalidatePath("/account/notifications");

    return { success: true };
  } catch (error) {
    console.error("Error deleting notification:", error);
    return { success: false, error: "Failed to delete notification" };
  }
}

export async function refreshNotification() {
  revalidatePath("/account/notifications");
}
