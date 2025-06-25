import HeroSection from "@/components/HeroSection";
import Reviews from "@/components/Reviews";
import ReviewsSkeleton from "@/components/ReviewsSkeleton";
import { params } from "@/types/types";
import React, { Suspense } from "react";

const pathArray = [
  {
    path: "Home",
    href: "/",
  },
  {
    path: `Reviews `,
    type: "page",
  },
];

type SearchParams = Promise<params>;

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <>
      <HeroSection
        pathArray={pathArray}
        title={`Customer reviews`}
        slogan={`See what our client’s are saying`}
      />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews params={params} />
      </Suspense>
    </>
  );
}
