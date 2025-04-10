import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import CustomCheckBox from "./CustomCheckBox";
import { Button } from "./ui/button";

type PropertySelectType = {
  onValueChange: (formattedValue: string) => void;
  defaultValue: string | undefined;
  className?: string;
};

export default function PropertySelect({
  className,
  onValueChange,
  defaultValue,
}: PropertySelectType) {
  const propertyTypes = [
    { label: "Show all", id: "all", value: "all" },
    { label: "Bungalow", id: "bungalow", value: "bungalow" },
    { label: "Villa", id: "villa", value: "villa" },
    { label: "Apartment", id: "apartment", value: "apartment" },
    { label: "Studio Flat", id: "studio_flat", value: "studio_flat" },
    { label: "Penthouse", id: "penthouse", value: "penthouse" },
    { label: "Land/Plot", id: "land_plot", value: "land_plot" },
    { label: "Maisonette", id: "maisonette", value: "maisonette" },
    { label: "Office", id: "office", value: "office" },
  ];

  const [state, setState] = useState(defaultValue?.split(", ") || []);

  const [property_type, setPropertyType] = useState(
    defaultValue || "Property type",
  );

  function handleClick() {
    const formattedValue = state.slice().reverse().join(", ");
    setPropertyType(formattedValue);
    onValueChange(formattedValue);
  }

  return (
    <Select>
      <SelectTrigger
        className={cn(
          "h-[50px] w-full rounded-xl border-[1.5px] border-amber-100 font-exo text-lg text-shades-black ring-0 hover:border-amber-200 data-[placeholder]:text-shades-black data-[state=open]:ring-[2px] data-[state=open]:ring-[#FCEEC2] sm:w-[218px]",
          className,
        )}
      >
        <SelectValue placeholder={property_type} />
      </SelectTrigger>
      <SelectContent className="rounded-xl !p-0 font-exo">
        <SelectGroup>
          {propertyTypes.map(({ label, id, value }) => (
            <CustomCheckBox
              key={id}
              label={label}
              id={id}
              value={value}
              setState={setState}
              state={state}
            />
          ))}
          <Button className="m-4 h-[50px] w-[186px]" onClick={handleClick}>
            Apply
          </Button>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
