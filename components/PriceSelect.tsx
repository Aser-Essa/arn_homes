import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice, PriceAbbreviation } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import CustomSelect from "./CustomSelect";

type PriceSelectType = {
  setPriceDuration: React.Dispatch<React.SetStateAction<string>>;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  defaultValues: {
    min_Price: string | string[] | undefined;
    max_Price: string | string[] | undefined;
    price_Duration: string | string[] | undefined;
  };
  priceDuration: string | string[] | undefined;
  category: string | string[] | undefined;
};

export default function PriceSelect({
  setPriceDuration,
  setMinPrice,
  setMaxPrice,
  defaultValues,
  category,
  priceDuration,
}: PriceSelectType) {
  const { min_Price, max_Price, price_Duration } = defaultValues;
  const [minPriceValue, setMinPriceValue] = useState(min_Price);
  const [maxPriceValue, setMaxPriceValue] = useState(max_Price);

  const PriceOptions = useMemo(() => {
    switch (priceDuration) {
      case "weekly":
        return [50, 100, 150, 200];
      case "yearly":
        return [5000, 10000, 15000];
      default:
        return [300, 500, 700, 1000];
    }
  }, [priceDuration]);

  let minPrice = useMemo(
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

  let maxPrice = useMemo(
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

  const formatedPrice =
    (min_Price || max_Price || price_Duration) &&
    `${min_Price !== "Any" ? PriceAbbreviation(Number(min_Price)) : "No min"} - ${max_Price !== "Any" ? PriceAbbreviation(Number(max_Price)) : "No max"}${category === "rent" ? ` - ${price_Duration || "monthly"}` : ""}`;

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

  useEffect(() => {
    const minOptionsValues = minPrice.map((el) => el.value);
    const maxOptionsValues = maxPrice.map((el) => el.value);
    if (
      !minOptionsValues.includes(Number(minPriceValue)) &&
      min_Price !== "Any"
    ) {
      setMinPrice("Any");
      setMinPriceValue("Any");
    }
    if (
      !maxOptionsValues.includes(Number(maxPriceValue)) &&
      max_Price !== "Any"
    ) {
      setMaxPrice("Any");
      setMaxPriceValue("Any");
    }
  }, [
    maxPrice,
    maxPriceValue,
    max_Price,
    minPrice,
    minPriceValue,
    min_Price,
    setMaxPrice,
    setMinPrice,
  ]);

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
              defaultValue={minPriceValue}
              value={minPriceValue ? String(minPriceValue) : ""}
            />

            <CustomSelect
              placeholder={"Max price"}
              selectItems={maxPrice}
              className="max-w-[170px]"
              onValueChange={(value) => {
                setMaxPrice(value);
                setMaxPriceValue(value);
              }}
              defaultValue={maxPriceValue}
              value={maxPriceValue ? String(maxPriceValue) : ""}
            />

            {category === "rent" && (
              <CustomSelect
                placeholder={"Price Duration"}
                selectItems={priceDurationItems}
                className="max-w-[170px]"
                onValueChange={(value) => {
                  setPriceDuration(value);
                }}
                defaultValue={priceDuration}
              />
            )}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
