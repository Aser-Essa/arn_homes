import React from "react";
import Container from "./Container";
import Title from "./Title";
import HomeCard from "./HomeCard";
import { getPropertiesForSales } from "@/lib/data-service";
import DateSort from "./DateSort";

import Pagenation from "./Pagenation";

type PropertiesForSaleType = {
  params: { [key: string]: string | string[] | undefined };
};

export default async function PropertiesForSale({
  params,
}: PropertiesForSaleType) {
  const { data: PropertiesData, count } = await getPropertiesForSales({
    params: { time_sort: String(params?.time_sort) },
  });

  return (
    <>
      <Container className="mt-10 space-y-10 lg:mt-[15px]">
        <div className="flex items-center justify-between">
          <Title>Properties For Sale</Title>
          <DateSort params={params} className={"hidden sm:flex"} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(340px,1fr))] gap-8">
          {PropertiesData.map((property) => (
            <HomeCard key={property.url} property={property} />
          ))}
        </div>

        <Pagenation count={count} />
      </Container>
    </>
  );
}
