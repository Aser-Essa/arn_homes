import { cn } from "@/lib/utils";
import React from "react";
interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  colorClass?: string;
}

export default function CardHeader({
  icon,
  title,
  colorClass = "bg-blue-50",
}: SectionHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className={cn(`rounded-lg p-2`, colorClass)}>{icon}</div>
        <p className="text-lg font-semibold text-gray-900">{title}</p>
      </div>
    </>
  );
}
