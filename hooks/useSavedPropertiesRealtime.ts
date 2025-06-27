"use client";

import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

type SavedPropertyPayload = {
  property_id: string;
  eventType: "INSERT" | "DELETE";
};

export function useSavedPropertiesRealtime(
  userId: string,
  callback: (payload: SavedPropertyPayload) => void,
) {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("saved_properties")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "saved_properties",
        },
        (payload) => {
          const { eventType } = payload;
          const data = eventType === "DELETE" ? payload.old : payload.new;
          if (!data?.id) return;
          callback({
            property_id: data.property_id,
            eventType: eventType as "INSERT" | "DELETE",
          });
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "saved_properties",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("DELETE EVENT PAYLOAD:", payload);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, callback]);
}
