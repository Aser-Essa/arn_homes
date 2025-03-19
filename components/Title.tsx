import React from "react";

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className="font-exo text-[28px] font-semibold sm:text-5xl">
        {children}
      </p>
    </>
  );
}
