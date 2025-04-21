import React from "react";
import Container from "./Container";
import DateSort from "./DateSort";
import { params } from "@/types/types";

type SearchForSaleHeaderType = {
  params: params;
  numberOfProperties: number | null;
};

export default function SearchForSaleHeader({
  params,
  numberOfProperties,
}: SearchForSaleHeaderType) {
  const state_address = params?.state_address;

  return (
    <Container className="space-y-2.5">
      <p className="text-[28px] font-semibold sm:text-[36px]">
        Properties for sale in {state_address}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[28px] font-semibold text-scooter-900">
          {numberOfProperties} results
        </p>
        <DateSort params={params} className={"!min-w-[185px]"} />
      </div>
    </Container>
  );
}
