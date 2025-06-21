"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface NotificationFilterButtonType {
  filter: string;
  isActive: boolean;
  count: number;
  unreadCount: number;
  icon: React.ReactNode;
  label: string;
}

export default function NotificationFilterButton({
  filter,
  isActive,
  count,
  unreadCount,
  icon,
  label,
}: NotificationFilterButtonType) {
  const router = useRouter();

  function handleClick() {
    const params = new URLSearchParams(window.location.search);
    params.set("notification_type", filter);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          "relative flex flex-col items-center gap-2 rounded-lg border p-3 transition-all duration-200",
          isActive
            ? "border-scooter-600 bg-scooter-50 text-scooter-700"
            : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100",
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>

        <div className="text-center">
          <div className="text-xs font-semibold">{label}</div>
          <div className="text-xs font-semibold">{count}</div>
        </div>
      </button>
    </>
  );
}
