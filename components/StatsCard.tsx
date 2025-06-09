import Link from "next/link";
import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  subtitle: string;
  href: string;
  color: "blue" | "red" | "green" | "purple";
  loading?: boolean;
  hasNotification?: boolean;
}

export default function StatsCard({
  icon,
  title,
  value,
  subtitle,
  href,
  color,
  loading,
  hasNotification,
}: StatsCardProps) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-100",
    red: "text-red-600 bg-red-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <Link href={href} className="group">
      <div className="box-shadow relative rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        {hasNotification && (
          <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-red-500"></div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className={`rounded-lg p-3 ${colorClasses[color]}`}>{icon}</div>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-medium text-gray-600">{title}</h3>
          {loading ? (
            <div className="mb-2 h-8 animate-pulse rounded bg-gray-200"></div>
          ) : (
            <p className="mb-1 text-2xl font-bold text-gray-900">{value}</p>
          )}
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
