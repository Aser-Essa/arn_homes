import React from "react";
import Container from "./Container";
import Title from "./Title";
import HomeCard from "./HomeCard";
import { getHomesForSales } from "@/lib/data-service";
import DateSort from "./DateSort";

type PropertiesForSaleType = {
  params: {
    bed_N: string;
    bath_N: string;
    min_Price: string;
    max_Price: string;
    price_Duration: string;
    property_Type: string;
  };
};

export default async function PropertiesForSale({
  params,
}: PropertiesForSaleType) {
  const data = await getHomesForSales(params);

  return (
    <>
      <Container className="mt-[15px] space-y-10">
        <div className="flex items-center justify-between">
          <Title>Properties For Sale</Title>
          <DateSort />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(340px,1fr))] gap-8">
          {data.map(
            ({
              url,
              title_address,
              state_address,
              images,
              price,
              bedNumber,
              bathNumber,
            }) => (
              <HomeCard
                key={url}
                title_address={title_address}
                state_address={state_address}
                image={images?.at(0)}
                price={price}
                bedNumber={bedNumber}
                bathNumber={bathNumber}
              />
            ),
          )}
        </div>
      </Container>
    </>
  );
}
