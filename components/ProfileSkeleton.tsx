import React from "react";

export default function ProfileSkeleton() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200"></div>
              <div className="space-y-3">
                <div className="h-8 w-64 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 h-12 animate-pulse rounded bg-gray-200"></div>
                <div className="mb-2 h-6 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
