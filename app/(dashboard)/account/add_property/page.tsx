import CreateEditPropertyFormCard from "@/components/CreateEditPropertyFormCard";
import CreateEditPropertyPageWrapper from "@/components/CreateEditPropertyPageWrapper";

export default function AddPropertyPage() {
  const propertyId = crypto.randomUUID();

  return (
    <>
      <CreateEditPropertyPageWrapper propertyId={propertyId}>
        <CreateEditPropertyFormCard propertyId={propertyId} type="create" />
      </CreateEditPropertyPageWrapper>
    </>
  );
}
