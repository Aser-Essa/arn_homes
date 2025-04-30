"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ListingTypeSelectorType = {
  value: string;
  onChange: (value: string) => void;
};

export default function ListingTypeSelector({
  value,
  onChange,
}: ListingTypeSelectorType) {
  return (
    <div>
      <Tabs value={value} onValueChange={onChange}>
        <TabsList className="h-[44px] w-full border border-amber-100 bg-amber-50 !text-base">
          <TabsTrigger value="sale" className="h-full w-full">
            For Sale
          </TabsTrigger>
          <TabsTrigger value="rent" className="h-full w-full">
            For Rent
          </TabsTrigger>
          <TabsTrigger value="investment" className="h-full w-full">
            Investment
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
