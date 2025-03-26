import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomSelect from "./CustomSelect";
import { PriceAbbreviation } from "@/lib/utils";

type PriceSelectType = {
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  setPriceDuration: React.Dispatch<React.SetStateAction<string>>;
  defaultValues: {
    min_Price: string;
    max_Price: string;
    price_Duration: string;
  };
};

export default function PriceSelect({
  setMinPrice,
  setMaxPrice,
  setPriceDuration,
  defaultValues,
}: PriceSelectType) {
  const minPrice = [
    {
      value: "Any",
      label: `No min`,
    },
    {
      value: 10_000,
      label: `£10,000`,
    },
    {
      value: 50_000,
      label: `£50,000`,
    },
    {
      value: 100_000,
      label: `£100,000`,
    },
    {
      value: 200_000,
      label: `£200,000`,
    },
    {
      value: 500_000,
      label: `£500,000`,
    },
    {
      value: 1_000_000,
      label: `£1,000,000`,
    },
  ];

  const maxPrice = [
    {
      value: "Any",
      label: `No max`,
    },
    {
      value: 10_000,
      label: `£10,000`,
    },
    {
      value: 50_000,
      label: `£50,000`,
    },
    {
      value: 100_000,
      label: `£100,000`,
    },
    {
      value: 200_000,
      label: `£200,000`,
    },
    {
      value: 500_000,
      label: `£500,000`,
    },
    {
      value: 1_000_000,
      label: `£1,000,000`,
    },
  ];

  const priceDuration = [
    {
      label: "Month",
      value: "month",
    },
    {
      label: "Week",
      value: "week",
    },
    {
      label: "Year",
      value: "year",
    },
  ];

  const { min_Price, max_Price, price_Duration } = defaultValues;

  const formatedPrice =
    (min_Price || max_Price || price_Duration) &&
    `${min_Price ? PriceAbbreviation(Number(min_Price)) : "No min"} - ${max_Price ? PriceAbbreviation(Number(max_Price)) : "No max"} - ${price_Duration || "Price Per Month"} `;

  return (
    <>
      <Select>
        <SelectTrigger className="h-[50px] w-[142px] rounded-xl border border-amber-100 font-exo text-lg text-shades-black ring-0 data-[placeholder]:text-shades-black">
          <SelectValue placeholder={formatedPrice || "Price"} />
        </SelectTrigger>
        <SelectContent className="rounded-xl font-exo">
          <SelectGroup>
            <div className="flex w-[594px] items-center gap-4 p-4">
              <CustomSelect
                placeholder={"Min price"}
                selectItems={minPrice}
                className="w-[170px]"
                onValueChange={(value) => setMinPrice(value)}
                defaultValue={min_Price}
              />

              <CustomSelect
                placeholder={"Max price"}
                selectItems={maxPrice}
                className="w-[170px]"
                onValueChange={(value) => setMaxPrice(value)}
                defaultValue={max_Price}
              />
              <CustomSelect
                placeholder={"Price per month"}
                selectItems={priceDuration}
                className="w-[190px]"
                onValueChange={(value) => setPriceDuration(value)}
                defaultValue={price_Duration}
              />
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
