import { Property } from "@/types/types";
import React from "react";
import InfoCard from "./InfoCard";

export default function PropertyInfoCards({
  property,
}: {
  property: Property;
}) {
  const { property_type, bed_number, bath_number, area, extras } = property;
  const { monthly_rent, is_furnished } = extras;
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard label="Property Type" value={property_type} />
        <InfoCard label="Bedrooms" value={bed_number} />
        <InfoCard label="Bathrooms" value={bath_number} />
        <InfoCard label="Area" value={`${area} sq ft`} />
        <InfoCard label="Monthly Rent" value={`$${monthly_rent}`} />
        <InfoCard label="Furnished" value={is_furnished ? "Yes" : "No"} />
      </div>
    </>
  );
}
