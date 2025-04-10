import React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type SortOrderType = {
  time_sort: string | string[] | undefined;
  setTimeSort: React.Dispatch<React.SetStateAction<string>>;
};

export default function SortOrder({ time_sort, setTimeSort }: SortOrderType) {
  console.log(time_sort);
  return (
    <>
      <div className="flex items-center justify-between gap-6 pb-[34px]">
        <div className="flex-1 space-y-2.5">
          <p className="text-lg font-medium">Sort order</p>

          <RadioGroup
            className="grid grid-cols-2 gap-x-6"
            defaultValue={time_sort ? String(time_sort) : "Any"}
            onValueChange={setTimeSort}
          >
            <div className="flex h-[46px] items-center space-x-2.5 border-b border-shades-off-white p-2">
              <RadioGroupItem value="Any" defaultChecked={true} id="r1" />
              <Label htmlFor="r1" className="text-lg">
                Anytime
              </Label>
            </div>

            <div className="flex h-[46px] items-center space-x-2.5 border-b border-shades-off-white p-2">
              <RadioGroupItem value="1" id="r2" />
              <Label htmlFor="r2" className="text-lg">
                Last 24 hours
              </Label>
            </div>

            <div className="flex h-[46px] items-center space-x-2.5 border-b border-shades-off-white p-2">
              <RadioGroupItem value="3" id="r3" />
              <Label htmlFor="r3" className="text-lg">
                Last 3 days
              </Label>
            </div>

            <div className="flex h-[46px] items-center space-x-2.5 border-b border-shades-off-white p-2">
              <RadioGroupItem value="7" id="r4" />
              <Label htmlFor="r4" className="text-lg">
                Last 7 days
              </Label>
            </div>

            <div className="flex h-[46px] items-center space-x-2.5 border-b border-shades-off-white p-2">
              <RadioGroupItem value="14" id="r5" />
              <Label htmlFor="r5" className="text-lg">
                Last 14 days
              </Label>
            </div>

            <div className="flex h-[46px] items-center space-x-2.5 border-b border-shades-off-white p-2">
              <RadioGroupItem value="30" id="r6" />
              <Label htmlFor="r6" className="text-lg">
                Last 30 days
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
}
