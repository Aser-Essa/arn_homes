import { updateSceduleTourStauts } from "@/lib/actions/scheduledTours";
import { ScheduledTourData } from "@/types/types";
import { CheckCircle, XCircle } from "lucide-react";
import FormActionButton from "./FormActionButton";

export default function ScheduledTourActions({
  scheduledTour,
  isOwner,
}: {
  scheduledTour: ScheduledTourData;
  isOwner: boolean;
}) {
  const { id, user_id, scheduled_date, properties } = scheduledTour;
  const propertyTitle = properties?.title ?? "";

  if (!isOwner) return null;

  return (
    <div className="flex gap-3 border-t border-gray-100 pt-4">
      <form action={updateSceduleTourStauts}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="visitorUserId" value={user_id} />
        <input type="hidden" name="propertyTitle" value={propertyTitle} />
        <input type="hidden" name="scheduledDate" value={scheduled_date} />
        <input type="hidden" name="status" value="confirmed" />
        <FormActionButton
          className="flex h-[36px] items-center gap-2 !rounded-xl border-none !bg-green-600 px-4 py-2 !text-sm !text-white !shadow-none hover:!bg-green-700"
          icon={<CheckCircle className="h-4 w-4" />}
        >
          Confirm Tour
        </FormActionButton>
      </form>

      <form action={updateSceduleTourStauts}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="visitorUserId" value={user_id} />
        <input type="hidden" name="propertyTitle" value={propertyTitle} />
        <input type="hidden" name="scheduledDate" value={scheduled_date} />
        <input type="hidden" name="status" value="cancelled" />

        <FormActionButton
          className="flex h-[36px] items-center gap-2 !rounded-xl !border-red-200 px-4 py-2 !text-sm !text-red-600 !shadow-none hover:bg-red-50"
          icon={<XCircle className="h-4 w-4" />}
        >
          Cancel Tour
        </FormActionButton>
      </form>
    </div>
  );
}
