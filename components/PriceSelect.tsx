import React, { useState } from "react";

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
    min_Price: string | string[] | undefined;
    max_Price: string | string[] | undefined;
    price_Duration: string | string[] | undefined;
  };
};

export default function PriceSelect({
  setMinPrice,
  setMaxPrice,
  defaultValues,
}: PriceSelectType) {
  let minPrice = [
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

  let maxPrice = [
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

  const { min_Price, max_Price, price_Duration } = defaultValues;

  const [minPriceValue, setMinPriceValue] = useState(min_Price);
  const [maxPriceValue, setMaxPriceValue] = useState(max_Price);

  if (maxPriceValue && maxPriceValue != "Any") {
    minPrice = minPrice.filter(
      (el) => el.value <= maxPriceValue || el.value == "Any",
    );
  }

  if (minPriceValue && minPriceValue != "Any") {
    maxPrice = maxPrice.filter(
      (el) => el.value >= minPriceValue || el.value == "Any",
    );
  }

  const formatedPrice =
    (min_Price || max_Price || price_Duration) &&
    `${min_Price !== "Any" ? PriceAbbreviation(Number(min_Price)) : "No min"} - ${max_Price !== "Any" ? PriceAbbreviation(Number(max_Price)) : "No max"} - ${price_Duration || "Price Per Month"} `;

  return (
    <Select>
      <SelectTrigger className="h-[50px] w-full rounded-xl border border-amber-100 font-exo text-lg text-shades-black ring-0 data-[placeholder]:text-shades-black sm:w-[142px]">
        <SelectValue placeholder={formatedPrice || "Price"} />
      </SelectTrigger>
      <SelectContent className="rounded-xl font-exo">
        <SelectGroup>
          <div className="flex w-fit items-center gap-4 p-4">
            <CustomSelect
              placeholder={"Min price"}
              selectItems={minPrice}
              className="max-w-[170px]"
              onValueChange={(value) => {
                setMinPrice(value);
                setMinPriceValue(value);
              }}
              defaultValue={min_Price}
            />

            <CustomSelect
              placeholder={"Max price"}
              selectItems={maxPrice}
              className="max-w-[170px]"
              onValueChange={(value) => {
                setMaxPrice(value);
                setMaxPriceValue(value);
              }}
              defaultValue={max_Price}
            />
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// const priceDuration = [
//   {
//     label: "Month",
//     value: "month",
//   },
//   {
//     label: "Week",
//     value: "week",
//   },
//   {
//     label: "Year",
//     value: "year",
//   },
// ];

//  <CustomSelect
//    placeholder={"Price per month"}
//    selectItems={priceDuration}
//    className="w-[190px]"
//    onValueChange={(value) => setPriceDuration(value)}
//    defaultValue={price_Duration}
//  />
