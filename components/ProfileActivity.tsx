import React from "react";

type ProfileActivityType = {
  icon: React.ReactNode;
  title: string;
  description: string;
  subtext?: string;
};

export default function ProfileActivity({
  icon,
  title,
  description,
  subtext,
}: ProfileActivityType) {
  return (
    <>
      <div className="flex items-start space-x-3 rounded-lg bg-shades-off-white p-3">
        <div className="mt-0.5 h-5 w-5 flex-shrink-0">{icon}</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="truncate text-sm text-gray-600">{description}</p>
          {subtext && <p className="mt-1 text-xs text-gray-500">{subtext}</p>}
        </div>
      </div>
    </>
  );
}
