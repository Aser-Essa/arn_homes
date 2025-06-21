"use client";
import React from "react";
import { motion } from "motion/react";

type EmptyNotificationFilterType = {
  notification_type: string;
  filteredCount: number;
};

export default function EmptyNotificationFilter({
  notification_type,
  filteredCount,
}: EmptyNotificationFilterType) {
  return (
    <>
      {filteredCount === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-8 text-center"
        >
          <p className="text-gray-500">
            No {notification_type.replace("_", " ")} notifications found.
          </p>
        </motion.div>
      )}
    </>
  );
}
