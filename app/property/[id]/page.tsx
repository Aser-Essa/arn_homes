import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import Description from "@/components/Description";
import FloorPlanAndMap from "@/components/FloorPlanAndMap";
import PropertyDetails from "@/components/PropertyDetails";
import { getProperty } from "@/lib/data-service";

type Params = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page({ params }: { params: Params }) {
  const { id } = await params;
  const { property } = await getProperty(String(id));

  console.log(property);

  return (
    <Container className="min-h-[100vh]">
      <BackButton />
      <PropertyDetails property={property} />
      <Description
        description={property?.description}
        exterior={property?.Exterior}
        interior={property?.Interior}
      />
      <FloorPlanAndMap
        floor_plan={property?.floor_plan}
        state_address={property?.state_address}
        title_address={property?.title_address}
      />
    </Container>
  );
}
