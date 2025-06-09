import { Badge } from "@/components/ui/badge";
import { formatDateLong, formatDateTime, formatTime } from "@/lib/utils";
import { Calendar, Clock, Clock3, MapPin, Phone, User } from "lucide-react";
import { InfoRow } from "./InfoRow";
import { ScheduledTourData } from "@/types/types";

export default function VisitorDetailsInfo({
  scheduledTour,
}: {
  scheduledTour: ScheduledTourData;
}) {
  const { name, phone, scheduled_date, scheduled_time, status, created_at } =
    scheduledTour;

  function getStatusColor(status: string) {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoRow
          icon={<User className="h-4 w-4 text-gray-500" />}
          label="Name"
          value={name}
        />
        <InfoRow
          icon={<Phone className="h-4 w-4 text-gray-500" />}
          label="Phone"
          value={phone}
        />
        <InfoRow
          icon={<Calendar className="h-4 w-4 text-gray-500" />}
          label="Date"
          value={formatDateLong(scheduled_date)}
        />
        <InfoRow
          icon={<Clock className="h-4 w-4 text-gray-500" />}
          label="Time"
          value={formatTime(scheduled_time)}
        />
        <InfoRow
          icon={<MapPin className="h-4 w-4 text-gray-500" />}
          label="Status"
          value={
            <Badge className={`capitalize ${getStatusColor(status)}`}>
              {status}
            </Badge>
          }
        />
        <InfoRow
          icon={<Clock3 className="h-4 w-4 text-gray-500" />}
          label="Booked At"
          value={formatDateTime(created_at)}
        />
      </div>
    </>
  );
}
