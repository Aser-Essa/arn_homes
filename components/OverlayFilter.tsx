"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { params } from "@/types/types";
import { VscSettings } from "react-icons/vsc";
import BedroomsBathroomsSelect from "./BedroomsBathroomsSelect";
import FurnishedSelect from "./FurnishedSelect";
import PriceRangeSelect from "./PriceRangeSelect";
import PropertyTypeSelect from "./PropertyTypeSelect";
import SortOrder from "./SortOrder";

type selectItemObj = {
  value: string | number;
  label: string;
};

type OverlayFilterType = {
  params: params;
  bedOptions: selectItemObj[];
  bathOptions: selectItemObj[];
  category?: string | string[] | undefined;
};

export default function OverlayFilter({
  params,
  bedOptions,
  bathOptions,
  category,
}: OverlayFilterType) {
  const {
    bed_N,
    bath_N,
    min_Price,
    max_Price,
    property_Type,
    price_Duration,
    furniture_type,
    time_sort,
  } = params;

  const router = useRouter();
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [furnitureType, setFurnitureType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceDuration, setPriceDuration] = useState("");
  const [timeSort, setTimeSort] = useState("");

  function handleClickReset() {
    router.push(`?`);
  }

  function handleClickSubmit() {
    const params = new URLSearchParams(window.location.search);
    const filters = {
      bed_N: bed,
      bath_N: bath,
      min_Price: minPrice,
      max_Price: maxPrice,
      property_Type: propertyType,
      furniture_type: furnitureType,
      time_sort: timeSort,
      price_Duration: priceDuration,
    };
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value?.toLowerCase() !== "any") {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    router.push(`/search/${category}?${params.toString()}`);
  }

  useEffect(() => {
    setBed(bed_N ? String(bed_N) : "");
    setBath(bath_N ? String(bath_N) : "");
    setMinPrice(min_Price ? String(min_Price) : "");
    setMaxPrice(max_Price ? String(max_Price) : "");
    setPropertyType(property_Type ? String(property_Type) : "");
    setPriceDuration(price_Duration ? String(price_Duration) : "");
    setFurnitureType(furniture_type ? String(furniture_type) : "");
  }, [
    bath_N,
    bed_N,
    max_Price,
    min_Price,
    price_Duration,
    property_Type,
    furniture_type,
  ]);

  const [openKey, setOpenKey] = useState("");

  const handleOpenChange = (key: string) => (open: boolean) => {
    if (open) {
      setOpenKey(key);
    } else {
      setOpenKey("");
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="h-[50px] ring-0">
            <VscSettings className="!h-5 !w-5" />

            <p className="hidden sm:block">Filters</p>
          </Button>
        </SheetTrigger>
        <SheetContent className="z-[10000000000] w-[87%] overflow-y-auto text-nowrap rounded-l-xl px-4 pb-0 pt-10 font-exo sm:max-w-[60%] sm:px-8 lg:max-w-[43%] lg:px-12">
          <SheetHeader className="mb-10">
            <SheetTitle className="text-start text-xl font-semibold sm:text-2xl">
              Filter your search results
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-6">
            <BedroomsBathroomsSelect
              setBed={setBed}
              setBath={setBath}
              bedOptions={bedOptions}
              bathOptions={bathOptions}
              bed_N={bed_N}
              bath_N={bath_N}
              openKey={openKey}
              handleOpenChange={handleOpenChange}
            />

            <PriceRangeSelect
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              setPriceDuration={setPriceDuration}
              priceDurationState={priceDuration}
              maxPriceState={maxPrice}
              minPriceState={minPrice}
              min_Price={min_Price}
              max_Price={max_Price}
              category={category}
              openKey={openKey}
              handleOpenChange={handleOpenChange}
            />

            <PropertyTypeSelect
              property_Type={property_Type}
              setPropertyType={setPropertyType}
              open={openKey === "property_type"}
              onOpenChange={handleOpenChange("property_type")}
            />

            <FurnishedSelect
              furniture_type={furniture_type}
              setFurnitureType={setFurnitureType}
              open={openKey === "furnished_type"}
              onOpenChange={handleOpenChange("furnished_type")}
            />

            <SortOrder time_sort={time_sort} setTimeSort={setTimeSort} />
          </div>
          <SheetFooter>
            <div className="flex w-full items-center justify-between gap-6 py-10">
              <SheetClose asChild>
                <Button
                  variant={"outline"}
                  className="h-[50px] w-full"
                  onClick={handleClickReset}
                >
                  Reset filters
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="h-[50px] w-full" onClick={handleClickSubmit}>
                  Update results
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
