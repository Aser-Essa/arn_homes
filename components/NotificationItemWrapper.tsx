"use client";
import { markNotificationAsRead } from "@/lib/actions/notifications";
import { NotificationData } from "@/types/types";
import { motion } from "motion/react";
import React from "react";

type NotificationItemWrapperType = {
  index: number;
  notification: NotificationData;
  children: React.ReactNode;
  link: string | null;
};

export default function NotificationItemWrapper({
  index,
  notification,
  children,
  link,
}: NotificationItemWrapperType) {
  async function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (link) {
      if (!notification.is_read) {
        await markNotificationAsRead(notification.id).catch(console.error);
      }
      if (!(e.target instanceof Element && e.target.closest("button"))) {
        window.open(link, "_blank");
      }
    }
  }

  return (
    <div onClick={(e) => void handleClick(e)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.25,
          delay: Math.min(index * 0.05, 0.3),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
