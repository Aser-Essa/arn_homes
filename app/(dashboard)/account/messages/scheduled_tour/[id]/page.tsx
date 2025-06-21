import Container from "@/components/Container";
import ScheduledTourHeader from "@/components/ScheduledTourHeader";
import ScheduledTourPropertyCard from "@/components/ScheduledTourPropertyCard";
import VisitorDetailsCard from "@/components/VisitorDetailsCard";
import { getScheduledTour } from "@/lib/queries/scheduledTours";
import { params } from "@/types/types";

type Params = Promise<params>;

export default async function page({ params }: { params: Params }) {
  let { id } = await params;
  id = id ? String(id) : "";
  const { scheduledTour } = await getScheduledTour(id);

  const { properties } = scheduledTour;

  return (
    <Container className="w-full space-y-7 !px-4 !py-6 md:w-[76vw] md:!p-10">
      <ScheduledTourHeader />
      <div className="space-y-8">
        <VisitorDetailsCard scheduledTour={scheduledTour} />
        <ScheduledTourPropertyCard property={properties} />
      </div>
    </Container>
  );
}
