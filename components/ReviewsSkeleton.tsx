import React from "react";
import Container from "./Container";

export default function ReviewsSkeleton() {
  return (
    <Container className="mb-[200px] mt-14 space-y-5 font-exo sm:space-y-10">
      <div className="mb-28 mt-14 space-y-5">
        <p className="text-4xl font-semibold">Loading reviews...</p>
        <div className="grid gap-[30px] sm:grid-cols-[repeat(auto-fill,_minmax(450px,1fr))]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[200px] w-full animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
