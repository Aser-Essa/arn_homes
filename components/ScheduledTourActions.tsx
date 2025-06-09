import { Button } from "@/components/ui/button";
import { updateSceduleTourStauts } from "@/lib/actions";
import { ScheduledTourData } from "@/types/types";
import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ScheduledTourActions({
  scheduledTour,
}: {
  scheduledTour: ScheduledTourData;
}) {
  const { id } = scheduledTour;

  async function handleConfirmTour() {
    try {
      toast.success("Tour confirmed successfully");
      await updateSceduleTourStauts({ id, status: "confirmed" });
    } catch {
      toast.error("Failed to confirm the tour. Please try again.");
    }
  }

  async function handleCancleTour() {
    try {
      toast.success("Tour cancelled successfully");
      await updateSceduleTourStauts({ id, status: "cancelled" });
    } catch {
      toast.error("Failed to cancel the tour. Please try again.");
    }
  }

  return (
    <>
      <div className="flex gap-3 border-t border-gray-100 pt-4">
        <form action={handleConfirmTour}>
          <Button className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700">
            <CheckCircle className="h-4 w-4" />
            Confirm Tour
          </Button>
        </form>

        <form action={handleCancleTour}>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            <XCircle className="h-4 w-4" />
            Cancel Tour
          </Button>
        </form>
      </div>
    </>
  );
}
