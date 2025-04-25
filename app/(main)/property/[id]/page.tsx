import BackButton from "@/components/BackButton";
import Container from "@/components/Container";
import Description from "@/components/Description";
import FeaturedProperties from "@/components/FeaturedProperties";
import FloorPlanAndMap from "@/components/FloorPlanAndMap";
import PropertyDetails from "@/components/PropertyDetails";
import ScheduleAndMortgageForms from "@/components/ScheduleAndMortgageForms";
import { getProperty } from "@/lib/data-service";

type Params = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page({ params }: { params: Params }) {
  const { id } = await params;
  const { property } = await getProperty(String(id));

  const {
    description,
    Exterior,
    Interior,
    floor_plan,
    state_address,
    title_address,
    price,
  } = property;

  return (
    <Container className="mb-[200px] min-h-[100vh] space-y-10">
      <BackButton />
      <PropertyDetails property={property} />
      <Description
        description={description}
        exterior={Exterior}
        interior={Interior}
      />
      <FloorPlanAndMap
        floor_plan={floor_plan}
        state_address={state_address}
        title_address={title_address}
      />
      <ScheduleAndMortgageForms
        price={price}
        property_id={id ? String(id) : ""}
      />

      <FeaturedProperties
        className="space-y-10 !px-0 font-exo"
        title={
          <p className="text-[36px] font-semibold">Similar Properties Nearby</p>
        }
      />
    </Container>
  );
}
