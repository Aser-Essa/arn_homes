"use client";
import { refreshNotification } from "@/lib/actions/notifications";
import { subscribeToNotifications } from "@/lib/realtime-notifications";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function NewNotificationToast() {
  const { user } = useUser();
  const userId = user?.id ? String(user?.id) : "";

  useEffect(() => {
    const unsubscribe = subscribeToNotifications(
      userId,
      async (newNotification) => {
        toast.success(newNotification.title);
        await refreshNotification();
      },
    );

    return unsubscribe;
  }, [userId]);

  return <div></div>;
}
