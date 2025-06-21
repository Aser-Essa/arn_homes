"use client";
import React from "react";
import { AnimatePresence } from "motion/react";
import NotificationItem from "./NotificationItem";
import { NotificationData } from "@/types/types";

interface NotificationsListType {
  notifications: NotificationData[];
}

export default function NotificationsList({
  notifications,
}: NotificationsListType) {
  return (
    <>
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            index={index}
            notification={notification}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
