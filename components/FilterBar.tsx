"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LuSearch } from "react-icons/lu";
import CustomSelect from "./CustomSelect";
import PriceSelect from "./PriceSelect";
import { useRouter } from "next/navigation";
import PropertySelect from "./PropertySelect";
import OverlayFilter from "./OverlayFilter";
import { cn } from "@/lib/utils";
import SearchInput from "./SearchInput";
import { params } from "@/types/types";
import toast from "react-hot-toast";

type FilterBarType = {
  params: params;
  className?: string;
  stateAddressArray?: string[];
  category?: string | string[] | undefined;
};

export default function FilterBar({
  stateAddressArray = [],
  className,
  params,
  category,
}: FilterBarType) {
  const {
    bed_N,
    bath_N,
    min_Price,
    max_Price,
    price_Duration,
    property_Type,
    state_address,
    furniture_type,
  } = params;

  const [search, setSearch] = useState(
    state_address ? String(state_address) : "",
  );
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceDuration, setPriceDuration] = useState("");
  const [furnitureType, setFurnitureType] = useState("");

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

    const filters = {
      bed_N: bed,
      bath_N: bath,
      min_Price: minPrice,
      max_Price: maxPrice,
      property_Type: propertyType,
      state_address: search,
      price_Duration: priceDuration,
      furniture_type: furnitureType,
    };

    let hasValidFilter = false;

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.toLowerCase() !== "any") {
        params.set(key, String(value));
        hasValidFilter = true;
      } else {
        params.delete(key);
      }
    });

    if (hasValidFilter) {
      router.push(`/search/${category}?${params.toString()}`, {
        scroll: false,
      });
      router.refresh();
    } else {
      toast.error("Select one filter at least");
    }
  }

  useEffect(() => {
    setBed(bed_N ? String(bed_N) : "");
    setBath(bath_N ? String(bath_N) : "");
    setMinPrice(min_Price ? String(min_Price) : "");
    setMaxPrice(max_Price ? String(max_Price) : "");
    setPropertyType(property_Type ? String(property_Type) : "");
    setPriceDuration(price_Duration ? String(price_Duration) : "");
    setSearch(state_address ? String(state_address) : "");
    setFurnitureType(furniture_type ? String(furniture_type) : "");
  }, [
    bath_N,
    bed_N,
    max_Price,
    min_Price,
    price_Duration,
    property_Type,
    state_address,
    furniture_type,
  ]);

  return (
    <>
      <div
        key={`${bed_N} ${bath_N} ${min_Price} ${max_Price} ${price_Duration} ${property_Type}`}
        className={cn(
          "box-shadow relative z-[100000] flex flex-wrap items-center justify-center gap-4 rounded-xl bg-white p-4 lg:top-[-41px]",
          className,
        )}
      >
        <SearchInput
          items={stateAddressArray}
          search={search}
          setSearch={setSearch}
          placeHolder="Enter City, Zip, Address"
        />
        <div className="hidden md:block">
          <PriceSelect
            priceDuration={priceDuration}
            setPriceDuration={setPriceDuration}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            defaultValues={{
              min_Price,
              max_Price,
              price_Duration,
            }}
            category={category}
          />
        </div>

        <div className="hidden md:block">
          <CustomSelect
            placeholder="Beds"
            selectItems={bedOptions}
            onValueChange={(value) => setBed(value)}
            defaultValue={bed_N}
          />
        </div>

        <div className="hidden md:block">
          <CustomSelect
            placeholder="Baths"
            selectItems={bathOptions}
            onValueChange={(value) => setBath(value)}
            defaultValue={bath_N}
          />
        </div>

        <div className="hidden md:block">
          <PropertySelect
            onValueChange={(value) => setPropertyType(value)}
            defaultValue={property_Type && String(property_Type)}
          />
        </div>

        <div className="flex items-center gap-4">
          <OverlayFilter
            category={category}
            params={params}
            bedOptions={bedOptions}
            bathOptions={bathOptions}
          />

          <Button type="submit" className="h-[50px]" onClick={handleClick}>
            <LuSearch className="!h-5 !w-5" />
            <p className="hidden sm:block">Search</p>
          </Button>
        </div>
      </div>
    </>
  );
}
