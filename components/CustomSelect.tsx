"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type selectItemObj = {
  value: string | number;
  label: string;
};

type CustomSelectType = {
  placeholder: string;
  selectItems: selectItemObj[];
  className?: string;
  defaultValue?: number | string | string[] | undefined;
  value?: string;
  onValueChange: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function CustomSelect({
  className,
  placeholder,
  selectItems = [],
  onValueChange,
  defaultValue,
  value,
  open,
  onOpenChange,
}: CustomSelectType) {
  return (
    <Select
      onValueChange={(value) => onValueChange(value)}
      defaultValue={defaultValue ? String(defaultValue) : ""}
      value={value}
      open={open}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger
        className={cn(
          "h-[50px] min-w-[142px] max-w-[142px] rounded-xl border-[1.5px] border-amber-100 font-exo text-lg text-shades-black ring-0 hover:border-amber-200 data-[placeholder]:text-shades-black data-[state=open]:ring-[2px] data-[state=open]:ring-[#FCEEC2]",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-xl font-exo" portal={false}>
        <SelectGroup>
          {selectItems.map(({ value, label }) => (
            <SelectItem key={label} value={String(value)}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
