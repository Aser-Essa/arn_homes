import React from "react";
import CustomSelect from "./CustomSelect";

type selectItemObj = {
  value: string | number;
  label: string;
};

type BedroomsBathroomsSelectType = {
  bedOptions: selectItemObj[];
  bathOptions: selectItemObj[];
  setBed: React.Dispatch<React.SetStateAction<string>>;
  setBath: React.Dispatch<React.SetStateAction<string>>;
  bed_N: string | string[] | undefined;
  bath_N: string | string[] | undefined;
  openKey: string;
  handleOpenChange: (key: string) => (open: boolean) => void;
};

export default function BedroomsBathroomsSelect({
  bedOptions,
  bathOptions,
  setBed,
  setBath,
  bed_N,
  bath_N,
  openKey,
  handleOpenChange,
}: BedroomsBathroomsSelectType) {
  return (
    <>
      <div className="flex items-center justify-between gap-6 border-b border-shades-off-white pb-6">
        <div className="flex-1 space-y-2.5">
          <p className="text-lg font-medium">Bedrooms</p>
          <CustomSelect
            className="min-w-full"
            placeholder="Beds"
            selectItems={bedOptions}
            onValueChange={(value) => setBed(value)}
            defaultValue={bed_N}
            open={openKey === "bed"}
            onOpenChange={handleOpenChange("bed")}
          />
        </div>
        <div className="flex-1 space-y-2.5">
          <p className="text-lg font-medium">Bathrooms</p>
          <CustomSelect
            className="min-w-full"
            placeholder="Baths"
            selectItems={bathOptions}
            onValueChange={(value) => setBath(value)}
            defaultValue={bath_N}
            open={openKey === "bath"}
            onOpenChange={handleOpenChange("bath")}
          />
        </div>
      </div>
    </>
  );
}
