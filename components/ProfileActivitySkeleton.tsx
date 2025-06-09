import React from "react";

export default function ProfileActivitySkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-start space-x-3 rounded-lg bg-gray-50 p-3"
        >
          <div className="mt-0.5 h-5 w-5 animate-pulse rounded bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
