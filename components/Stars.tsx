import React from "react";
import { FaStar } from "react-icons/fa6";

export default function Stars({ count }: { count: number }) {
  const stars = Array.from({ length: count });

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((_, idx) => (
        <div key={idx} className="flex h-6 w-6 items-center justify-center">
          <FaStar className="h-[18px] w-[18px] text-green-600" />
        </div>
      ))}
    </div>
  );
}
