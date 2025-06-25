import { getUnreadMessages } from "@/lib/queries/chats";
import { getSavedProperties } from "@/lib/queries/favorites";
import { getMyProperties } from "@/lib/queries/properties";
import { getScheduledTours } from "@/lib/queries/scheduledTours";
import { getUpcomingConfirmedTours } from "@/lib/utils";
import { endOfWeek } from "date-fns";
import { Calendar, Heart, Home, MessageCircle } from "lucide-react";
import StatsCard from "./StatsCard";

type StatsCards = {
  userId: string;
};

export default async function StatsCards({ userId }: StatsCards) {
  const { count: activePropertiesCount } = await getMyProperties({
    userId,
    category: "",
    status: "",
  });

  const { count: reviewingPropertiesCount } = await getMyProperties({
    userId,
    category: "",
    status: "reviewing",
  });

  const { count: savedPropertiesCount } = await getSavedProperties({
    userId: userId ? String(userId) : "",
  });

  const { unreadMessageCount } = await getUnreadMessages(userId);

  const { scheduledTours } = await getScheduledTours(userId);

  const now = new Date();
  const endOfThisWeek = endOfWeek(now);
  const upcomingConfirmedTours = getUpcomingConfirmedTours({
    scheduledTours,
    beforeDate: endOfThisWeek,
  });

  const loading = false;

  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<Home className="h-6 w-6" />}
          title="My Properties"
          value={activePropertiesCount || 0}
          subtitle={`${reviewingPropertiesCount || 0} under review`}
          href="/account"
          color="blue"
          loading={loading}
        />

        <StatsCard
          icon={<Heart className="h-6 w-6" />}
          title="Saved Properties"
          value={savedPropertiesCount || 0}
          subtitle="properties saved"
          href="/account/saved_properties"
          color="red"
          loading={loading}
        />

        <StatsCard
          icon={<Calendar className="h-6 w-6" />}
          title="Upcoming Tours"
          value={upcomingConfirmedTours?.length ?? 0}
          subtitle="scheduled this week"
          href=""
          color="green"
          loading={loading}
        />

        <StatsCard
          icon={<MessageCircle className="h-6 w-6" />}
          title="Messages"
          value={unreadMessageCount || 0}
          subtitle="unread messages"
          href="/account/messages"
          color="purple"
          loading={loading}
          hasNotification={unreadMessageCount > 0}
        />
      </div>
    </>
  );
}
