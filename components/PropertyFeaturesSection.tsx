import React from "react";
import { PropertyFeaturesModal } from "./PropertyFeaturesModal";

export default function PropertyFeaturesSection() {
  return (
    <>
      <div className="w-full space-y-2">
        <p className="text-base font-medium capitalize">Add Features</p>
        <div className="grid w-full grid-cols-2 gap-2">
          <PropertyFeaturesModal type={"exterior"} />
          <PropertyFeaturesModal type={"interior"} />
        </div>
      </div>
    </>
  );
}
