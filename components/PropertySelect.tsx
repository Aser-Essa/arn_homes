import React, { useState, useEffect } from "react";

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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function PropertySelect({
  className,
  onValueChange,
  defaultValue,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PropertySelectType) {
  const propertyTypes = [
    { label: "Show all", id: "all", value: "any" },
    { label: "Single-family", id: "single_family", value: "Single-family" },
    { label: "Condo", id: "condo", value: "Condo" },
    { label: "Multi-family", id: "multi_family", value: "Multi-family" },
    { label: "Townhome", id: "townhome", value: "Townhome" },
  ];

  const [state, setState] = useState<string[]>(
    defaultValue ? defaultValue.split(/\s*,\s*/) : [],
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen]);

  function handleClick() {
    const formattedValue = state.join(", ");
    onValueChange(formattedValue);

    if (setControlledOpen) {
      setControlledOpen(false);
    } else {
      setOpen(false);
    }
  }

  return (
    <Select
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setControlledOpen?.(value);
      }}
    >
      <SelectTrigger
        className={cn(
          "h-[50px] w-full rounded-xl border-[1.5px] border-amber-100 font-exo text-lg text-shades-black ring-0 hover:border-amber-200 data-[placeholder]:text-shades-black data-[state=open]:ring-[2px] data-[state=open]:ring-[#FCEEC2] sm:w-[218px]",
          className,
        )}
      >
        <SelectValue
          placeholder={state.length > 0 ? state.join(", ") : "Property type"}
        />
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
