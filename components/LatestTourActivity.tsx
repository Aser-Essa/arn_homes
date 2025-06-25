import { getProperty } from "@/lib/queries/properties";
import { getScheduledTours } from "@/lib/queries/scheduledTours";
import { formatScheduledTour, getUpcomingConfirmedTours } from "@/lib/utils";
import { endOfDay } from "date-fns";
import React from "react";
import ProfileActivity from "./ProfileActivity";
import { Clock } from "lucide-react";

export default async function LatestTourActivity({
  userId,
}: {
  userId: string;
}) {
  let nextTourDateTime = "";
  let propertyTitle = "";
  const { scheduledTours } = await getScheduledTours(userId);

  const now = new Date();
  const endOfThisDay = endOfDay(now);
  const upcomingConfirmedTours = getUpcomingConfirmedTours({
    scheduledTours,
    beforeDate: endOfThisDay,
  });

  const sortedTours = upcomingConfirmedTours.sort((a, b) => {
    return (
      new Date(a.scheduled_date).getTime() -
      new Date(b.scheduled_date).getTime()
    );
  });
  const nextTour = sortedTours?.at(0);

  if (nextTour) {
    const { scheduled_date, scheduled_time, property_id } = nextTour;
    nextTourDateTime = formatScheduledTour(scheduled_date, scheduled_time);
    const { property } = await getProperty(property_id);
    propertyTitle = property?.title || "";
  }

  return (
    <>
      <ProfileActivity
        icon={
          <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
        }
        title={"Next Tour"}
        description={nextTourDateTime || "No upcoming tours"}
        subtext={
          propertyTitle ? `Tour for ${propertyTitle}` : "No scheduled property"
        }
      />
    </>
  );
}
