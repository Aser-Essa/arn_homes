import React from "react";
import Container from "./Container";
import Title from "./Title";
import HomeCard from "./HomeCard";
import DateSort from "./DateSort";

import Pagenation from "./Pagenation";
import { params } from "@/types/types";
import { getProperties } from "@/lib/queries/properties";

type PropertiesType = {
  params: params;
  category?: string | string[] | undefined;
};

export default async function Properties({ params, category }: PropertiesType) {
  let { page, time_sort } = params;
  page = page ? String(page) : "";
  time_sort = page ? String(time_sort) : "";

  const { data: PropertiesData, count } = await getProperties({
    params: { page, time_sort },
    category: category ? String(category) : "sale",
  });

  if (count === 0) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <p className="text-shades-gray-500 text-lg font-semibold">
          No properties found
        </p>
      </div>
    );
  }

  return (
    <>
      <Container className="mt-10 space-y-10 lg:mt-[15px]">
        <div className="flex items-center justify-between">
          <Title>Properties For {category}</Title>
          <DateSort params={params} className={"hidden sm:flex"} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(340px,1fr))] gap-8">
          {PropertiesData.map((property) => (
            <HomeCard key={property.id} property={property} />
          ))}
        </div>

        <Pagenation count={count} />
      </Container>
    </>
  );
}
