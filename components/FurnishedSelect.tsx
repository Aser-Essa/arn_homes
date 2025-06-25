import React from "react";
import CustomSelect from "./CustomSelect";

type FurnishedSelectType = {
  furniture_type: string | string[] | undefined;
  setFurnitureType: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FurnishedSelect({
  furniture_type,
  setFurnitureType,
  open,
  onOpenChange,
}: FurnishedSelectType) {
  const furnitureOptions = [
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
            className="min-w-full"
            placeholder="Furnished options"
            selectItems={furnitureOptions}
            onValueChange={(value) => setFurnitureType(value)}
            defaultValue={furniture_type || "furnished"}
            open={open}
            onOpenChange={onOpenChange}
          />
        </div>
      </div>
    </>
  );
}
