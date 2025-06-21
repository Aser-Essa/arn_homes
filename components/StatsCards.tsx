import React from "react";
import StatsCard from "./StatsCard";
import { Calendar, Heart, Home, MessageCircle } from "lucide-react";
import { getMyProperties } from "@/lib/queries/properties";
import { getUnreadMessages } from "@/lib/queries/chats";
import { getSavedProperties } from "@/lib/queries/favorites";

type StatsCards = {
  userId: string;
};

export default async function StatsCards({ userId }: StatsCards) {
  const categories = ["sale", "rent", "investment"];

  const activeProperties = await getMyProperties({
    userId,
    category: "",
    status: "",
  });

  const reviewingProperties = await getMyProperties({
    userId,
    category: "",
    status: "reviewing",
  });

  const savedPropertiesCountArray: number[] = await Promise.all(
    categories.map(async (cat) => {
      const { count } = await getSavedProperties({
        userId: userId ? String(userId) : "",
        category: cat,
      });
      return Number(count);
    }),
  );

  const savedPropertiesCount = savedPropertiesCountArray.reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const { unreadMessageCount } = await getUnreadMessages(userId);

  const loading = false;

  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<Home className="h-6 w-6" />}
          title="My Properties"
          value={activeProperties.count || 0}
          subtitle={`${reviewingProperties.count || 0} under review`}
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
          value={0}
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
