import CreateEditPropertyFormCard from "@/components/CreateEditPropertyFormCard";
import CreateEditPropertyPageWrapper from "@/components/CreateEditPropertyPageWrapper";
import { getProperty } from "@/lib/queries/properties";
import { reverseTransformedPropertyData } from "@/lib/utils";
import { params } from "@/types/types";
import React from "react";

type Params = Promise<params>;

export default async function page({ params }: { params: Params }) {
  const { id } = await params;
  const propertyId = id ? String(id) : "";
  const { property } = await getProperty(propertyId);

  if (!property) {
    return <p className="text-red-500">Property not found.</p>;
  }

  const transformedProperty = reverseTransformedPropertyData({
    property,
  });

  return (
    <>
      <CreateEditPropertyPageWrapper propertyId={propertyId}>
        <CreateEditPropertyFormCard
          propertyId={propertyId}
          property={property}
          defaultValues={transformedProperty}
          type="edit"
        />
      </CreateEditPropertyPageWrapper>
    </>
  );
}
