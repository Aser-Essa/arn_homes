"use client";
import React, { useState } from "react";
import Container from "./Container";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LuSearch } from "react-icons/lu";
import CustomSelect from "./CustomSelect";
import PriceSelect from "./PriceSelect";
import { useRouter } from "next/navigation";
import PropertySelect from "./PropertySelect";

type FilterBarType = {
  params: {
    bed_N: string;
    bath_N: string;
    min_Price: string;
    max_Price: string;
    price_Duration: string;
    property_Type: string;
  };
};

export default function FilterBar({ params }: FilterBarType) {
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceDuration, setPriceDuration] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const router = useRouter();

  const { bed_N, bath_N, min_Price, max_Price, price_Duration, property_Type } =
    params;

  console.log(price_Duration);

  const bedOptions = [
    { value: "Any", label: "Any" },
    { value: 1, label: "1 Bed" },
    { value: 2, label: "2 Beds" },
    { value: 3, label: "3 Beds" },
    { value: 4, label: "4 Beds" },
    { value: 5, label: "5 Beds" },
    { value: 6, label: "6 Beds" },
  ];

  const bathOptions = [
    { value: "Any", label: "Any" },
    { value: 1, label: "1 Bath" },
    { value: 2, label: "2 Baths" },
    { value: 3, label: "3 Baths" },
    { value: 4, label: "4 Baths" },
    { value: 5, label: "5 Baths" },
    { value: 6, label: "6 Baths" },
  ];

  function handleClick() {
    const params = new URLSearchParams();

    if (bed) params.append("bed_N", bed);
    if (bath) params.append("bath_N", bath);
    if (minPrice) params.append("min_Price", String(minPrice));
    if (maxPrice) params.append("max_Price", String(maxPrice));
    if (priceDuration) params.append("price_Duration", priceDuration);
    if (propertyType) params.append("property_Type", propertyType);

    router.push(`?${params.toString()}`);
  }

  return (
    <>
      <Container>
        <div
          className="relative top-[-41px] z-[100000] flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4"
          style={{
            boxShadow: "0 20px 24px -4px #ffecb30a, 0 8px 11px -4px #2d36430a",
          }}
        >
          <Input
            type="text"
            placeholder="Enter City, Zip, Address"
            className="h-[50px] w-[230px] rounded-xl border-amber-100 px-4 py-3 !text-lg shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
          />

          <PriceSelect
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setPriceDuration={setPriceDuration}
            defaultValues={{ min_Price, max_Price, price_Duration }}
          />

          <CustomSelect
            placeholder="Beds"
            selectItems={bedOptions}
            onValueChange={(value) => setBed(value)}
            defaultValue={bed_N}
          />

          <CustomSelect
            placeholder="Baths"
            selectItems={bathOptions}
            onValueChange={(value) => setBath(value)}
            defaultValue={bath_N}
          />

          <PropertySelect
            onValueChange={(value) => setPropertyType(value)}
            defaultValue={property_Type}
          />

          <Button type="submit" className="h-[50px]" onClick={handleClick}>
            <LuSearch className="!h-5 !w-5" />
            <p className="hidden md:block">Search</p>
          </Button>
        </div>
      </Container>
    </>
  );
}
