import React from "react";
import PropertySelect from "./PropertySelect";

type PropertyTypeSelectType = {
  property_Type: string | string[] | undefined;
  setPropertyType: React.Dispatch<React.SetStateAction<string>>;
};

export default function PropertyTypeSelect({
  property_Type,
  setPropertyType,
}: PropertyTypeSelectType) {
  return (
    <>
      <div className="flex items-center justify-between gap-6 border-b border-shades-off-white pb-6">
        <div className="flex-1 space-y-2.5">
          <p className="text-lg font-medium">Property type</p>
          <PropertySelect
            className="sm:w-full"
            onValueChange={(value) => setPropertyType(value)}
            defaultValue={property_Type && String(property_Type)}
          />
        </div>
      </div>
    </>
  );
}
