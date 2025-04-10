import React from "react";
import CustomSelect from "./CustomSelect";

type FurnishedSelectType = {
  furniture_Type: string;
  setfurnitureType: React.Dispatch<React.SetStateAction<string>>;
};

export default function FurnishedSelect({
  furniture_Type,
  setfurnitureType,
}: FurnishedSelectType) {
  const furnitureOptions = [
    {
      value: "Any",
      label: `Any`,
    },
    {
      value: "furnished",
      label: `Furnished`,
    },
    {
      value: "semi-furnished",
      label: "Semi-furnished",
    },
    {
      value: "unfurnished",
      label: "Unfurnished",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-6 border-b border-shades-off-white pb-6">
        <div className="flex-1 space-y-2.5">
          <p className="text-lg font-medium">Furnished options</p>
          <CustomSelect
            className="w-full"
            placeholder="Furnished options"
            selectItems={furnitureOptions}
            onValueChange={(value) => setfurnitureType(value)}
            defaultValue={furniture_Type}
          />
        </div>
      </div>
    </>
  );
}
