import { NotificationData } from "@/types/types";
import { supabase } from "./supabase";

export function subscribeToNotifications(
  userId: string,
  callback: (notification: NotificationData) => void,
) {
  const channel = supabase
    .channel("notifications")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as NotificationData);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
