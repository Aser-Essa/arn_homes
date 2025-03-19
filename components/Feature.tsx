import React from "react";

export default function Feature() {
  return (
    <>
      <div
        className="flex h-[140px] items-center gap-4 rounded-xl bg-white p-4"
        style={{
          boxShadow: "0 20px 24px -4px #ffecb30a, 0 8px 11px -4px #2d364323",
        }}
      >
        <div className="aspect-square h-[88px] w-[88px] rounded-xl bg-shades-black"></div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">Hassle-Free Searching</p>
          <p>
            Say goodbye to tedious property searches. Our intuitive platform
            allows effortless filtering for hassle-free results.
          </p>
        </div>
      </div>
    </>
  );
}
