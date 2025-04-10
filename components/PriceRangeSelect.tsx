import React from "react";
import CustomSelect from "./CustomSelect";

type PriceRangeSelectType = {
  min_Price: string | string[] | undefined;
  max_Price: string | string[] | undefined;
  minPriceState: string;
  maxPriceState: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
};

export default function PriceRangeSelect({
  min_Price,
  max_Price,
  minPriceState,
  maxPriceState,
  setMinPrice,
  setMaxPrice,
}: PriceRangeSelectType) {
  let minPriceArray = [
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

  let maxPriceArray = [
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

  if (minPriceState && minPriceState != "Any") {
    minPriceArray = minPriceArray.filter(
      (el) => el.value <= minPriceState || el.value == "Any",
    );
  }

  if (maxPriceState && maxPriceState != "Any") {
    maxPriceArray = maxPriceArray.filter(
      (el) => el.value >= maxPriceState || el.value == "Any",
    );
  }

  return (
    <>
      <div className="space-y-4">
        <p className="text-lg font-medium">Price</p>
        <div className="flex items-center justify-between gap-6 border-b border-shades-off-white pb-6">
          <div className="flex-1 space-y-2.5">
            <p className="text-lg font-medium">Min price</p>

            <CustomSelect
              className="w-full"
              placeholder={"Min price"}
              selectItems={minPriceArray}
              onValueChange={(value) => {
                setMinPrice(value);
              }}
              defaultValue={min_Price}
            />
          </div>
          <div className="flex-1 space-y-2.5">
            <p className="text-lg font-medium">Max price</p>
            <CustomSelect
              className="w-full"
              placeholder={"Max price"}
              selectItems={maxPriceArray}
              onValueChange={(value) => {
                setMaxPrice(value);
              }}
              defaultValue={max_Price}
            />
          </div>
        </div>
      </div>
    </>
  );
}
