import AddPropertyFormCard from "@/components/AddPropertyFormCard";
import AddPropertyPageWrapper from "@/components/AddPropertyPageWrapper";

export default function AddPropertyPage() {
  const propertyId = crypto.randomUUID();

  return (
    <>
      <AddPropertyPageWrapper propertyId={propertyId}>
        <AddPropertyFormCard propertyId={propertyId} />
      </AddPropertyPageWrapper>
    </>
  );
}
