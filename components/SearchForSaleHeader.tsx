import React from "react";
import Container from "./Container";
import DateSort from "./DateSort";

type SearchForSaleHeaderType = {
  params: { [key: string]: string | string[] | undefined };
  numberOfProperties: number;
};

export default function SearchForSaleHeader({
  params,
  numberOfProperties,
}: SearchForSaleHeaderType) {
  const search_title = params?.search_title;

  return (
    <Container className="space-y-2.5">
      <p className="text-[36px] font-semibold">
        Properties for sale in {search_title}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[28px] font-semibold text-scooter-900">
          {numberOfProperties} results
        </p>
        <DateSort params={params} />
      </div>
    </Container>
  );
}
