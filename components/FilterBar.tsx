"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LuSearch } from "react-icons/lu";
import CustomSelect from "./CustomSelect";
import PriceSelect from "./PriceSelect";
import { useRouter } from "next/navigation";
import PropertySelect from "./PropertySelect";
import OverlayFilter from "./OverlayFilter";
import { cn } from "@/lib/utils";
import SearchInput from "./SearchInput";

type FilterBarType = {
  params: { [key: string]: string | string[] | undefined };
  className?: string;
  stateAddressArray?: string[];
};

export default function FilterBar({
  stateAddressArray = [],
  className,
  params,
}: FilterBarType) {
  const { bed_N, bath_N, min_Price, max_Price, price_Duration, property_Type } =
    params;

  const [search, setSearch] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const router = useRouter();

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
    const params = new URLSearchParams(window.location.search);
    if (bed) params.set("bed_N", bed);
    if (bath) params.set("bath_N", bath);
    if (minPrice) params.set("min_Price", String(minPrice));
    if (maxPrice) params.set("max_Price", String(maxPrice));
    if (propertyType) params.set("property_Type", propertyType);
    if (search) params.set("search_title", search);
    router.push(`/search/sale?${params.toString()}`);
    router.refresh();
  }

  return (
    <>
      <div
        key={`${bed_N} ${bath_N} ${min_Price} ${max_Price} ${price_Duration} ${property_Type}`}
        className={cn(
          "box-shadow relative z-[100000] flex flex-wrap items-center justify-evenly gap-4 rounded-xl bg-white p-4 lg:top-[-41px]",
          className,
        )}
      >
        <SearchInput
          items={stateAddressArray}
          search={search}
          setSearch={setSearch}
        />
        <div className="hidden gap-4 md:flex">
          <PriceSelect
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            defaultValues={{
              min_Price,
              max_Price,
              price_Duration,
            }}
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
            defaultValue={property_Type && String(property_Type)}
          />
        </div>

        <OverlayFilter
          params={params}
          bedOptions={bedOptions}
          bathOptions={bathOptions}
        />

        <Button type="submit" className="h-[50px]" onClick={handleClick}>
          <LuSearch className="!h-5 !w-5" />
          <p className="hidden sm:block">Search</p>
        </Button>
      </div>
    </>
  );
}
