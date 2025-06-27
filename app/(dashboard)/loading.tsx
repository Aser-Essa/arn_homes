import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-shades-white"
      role="status"
      aria-busy="true"
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="animate-pulseScale relative h-16 w-16 sm:h-[72px] sm:w-[72px]">
          <Image src="/Logo.svg" alt="Arn Homes Logo" fill />
        </div>

        <p className="animate-pulse font-medium text-shades-black">
          Loading Arn Homes...
        </p>
      </div>
    </div>
  );
}
