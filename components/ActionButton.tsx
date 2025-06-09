import Link from "next/link";
import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: "blue" | "red" | "green" | "purple";
  hasNotification?: boolean;
}

export default function ActionButton({
  icon,
  title,
  description,
  href,
  color,
  hasNotification,
}: ActionButtonProps) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-100",
    red: "text-red-600 bg-red-50 hover:bg-red-100",
    green: "text-green-600 bg-green-50 hover:bg-green-100",
    purple: "text-purple-600 bg-purple-50 hover:bg-purple-100",
  };

  return (
    <>
      <Link href={href} className="group block">
        <div
          className={`relative flex h-[84px] items-center space-x-3 rounded-lg p-4 transition-colors ${colorClasses[color]}`}
        >
          {hasNotification && (
            <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></div>
          )}

          <div className="flex-shrink-0">{icon}</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="text-xs text-gray-600">{description}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
