import React from "react";

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className="font-exo text-5xl font-semibold">{children}</p>
    </>
  );
}
