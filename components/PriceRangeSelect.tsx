import React, { useEffect, useMemo } from "react";
import CustomSelect from "./CustomSelect";
import { formatPrice } from "@/lib/utils";

type PriceRangeSelectType = {
  min_Price: string | string[] | undefined;
  max_Price: string | string[] | undefined;
  minPriceState: string;
  maxPriceState: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  setPriceDuration: React.Dispatch<React.SetStateAction<string>>;
  priceDurationState: string | string[] | undefined;
  category: string | string[] | undefined;
};

export default function PriceRangeSelect({
  min_Price,
  max_Price,
  minPriceState,
  maxPriceState,
  setMinPrice,
  setMaxPrice,
  setPriceDuration,
  priceDurationState,
  category,
}: PriceRangeSelectType) {
  const PriceOptions = useMemo(() => {
    switch (priceDurationState) {
      case "weekly":
        return [50, 100, 150, 200];
      case "yearly":
        return [5000, 10000, 15000];
      default:
        return [300, 500, 700, 1000];
    }
  }, [priceDurationState]);

  let minPriceArray = useMemo(
    () => [
      { value: "Any", label: `No min` },
      ...(category === "rent"
        ? PriceOptions.map((price) => ({
            value: price,
            label: formatPrice(price),
          }))
        : [
            { value: 10_000, label: "£10,000" },
            { value: 50_000, label: "£50,000" },
            { value: 100_000, label: "£100,000" },
            { value: 200_000, label: "£200,000" },
            { value: 500_000, label: "£500,000" },
            { value: 1_000_000, label: "£1,000,000" },
          ]),
    ],
    [PriceOptions, category],
  );

  let maxPriceArray = useMemo(
    () => [
      { value: "Any", label: `No max` },
      ...(category === "rent"
        ? PriceOptions.map((price) => ({
            value: price,
            label: formatPrice(price),
          }))
        : [
            { value: 10_000, label: "£10,000" },
            { value: 50_000, label: "£50,000" },
            { value: 100_000, label: "£100,000" },
            { value: 200_000, label: "£200,000" },
            { value: 500_000, label: "£500,000" },
            { value: 1_000_000, label: "£1,000,000" },
          ]),
    ],
    [PriceOptions, category],
  );

  const priceDurationItems = [
    { value: "Any", label: "Any" },
    { value: "weekly", label: "Per Week" },
    { value: "monthly", label: "Per Month" },
    { value: "yearly", label: "Per Year" },
  ];

  if (maxPriceState && maxPriceState != "Any") {
    minPriceArray = minPriceArray.filter(
      (el) => el.value <= maxPriceState || el.value == "Any",
    );
  }

  if (minPriceState && minPriceState != "Any") {
    maxPriceArray = maxPriceArray.filter(
      (el) => el.value >= minPriceState || el.value == "Any",
    );
  }

  useEffect(() => {
    const minOptionsValues = minPriceArray.map((el) => el.value);
    const maxOptionsValues = maxPriceArray.map((el) => el.value);

    if (!minOptionsValues.includes(Number(minPriceState))) {
      setMinPrice("Any");
    }
    if (!maxOptionsValues.includes(Number(maxPriceState))) {
      setMaxPrice("Any");
    }
  }, [
    maxPriceArray,
    maxPriceState,
    minPriceArray,
    minPriceState,
    setMaxPrice,
    setMinPrice,
  ]);

  return (
    <>
      <div className="space-y-4">
        <p className="text-lg font-medium">Price</p>
        <div className="flex items-center justify-between gap-6 border-b border-shades-off-white pb-6">
          <div className="flex-1 space-y-2.5">
            <p className="text-lg font-medium">Min price</p>
            <CustomSelect
              className="min-w-full"
              placeholder={"Min price"}
              selectItems={minPriceArray}
              onValueChange={(value) => {
                setMinPrice(value);
              }}
              defaultValue={min_Price}
              value={minPriceState ? String(minPriceState) : ""}
            />
          </div>
          <div className="flex-1 space-y-2.5">
            <p className="text-lg font-medium">Max price</p>
            <CustomSelect
              className="min-w-full"
              placeholder={"Max price"}
              selectItems={maxPriceArray}
              onValueChange={(value) => {
                setMaxPrice(value);
              }}
              defaultValue={max_Price}
              value={maxPriceState ? String(maxPriceState) : ""}
            />
          </div>
        </div>
        {category === "rent" && (
          <div className="flex-1 space-y-2.5">
            <p className="text-lg font-medium">Price per</p>

            <CustomSelect
              placeholder={"Price Duration"}
              selectItems={priceDurationItems}
              className="min-w-full"
              onValueChange={(value) => {
                setPriceDuration(value);
              }}
              defaultValue={priceDurationState}
            />
          </div>
        )}
      </div>
    </>
  );
}
