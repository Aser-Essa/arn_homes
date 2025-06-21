import {
  Bell,
  Calendar,
  CreditCard,
  Filter,
  Heart,
  Home,
  Mail,
} from "lucide-react";
import NotificationFilterButton from "./NotificationFilterButton";
import { getNotificationsCount } from "@/lib/queries/notifications";
import { auth } from "@clerk/nextjs/server";

const filterIcons = {
  all: <Filter className="h-4 w-4" />,
  message: <Mail className="h-4 w-4" />,
  property: <Home className="h-4 w-4" />,
  tour: <Calendar className="h-4 w-4" />,
  mortgage: <CreditCard className="h-4 w-4" />,
  saved_property: <Heart className="h-4 w-4" />,
  system: <Bell className="h-4 w-4" />,
};

const filterLabels = {
  all: "All",
  message: "Messages",
  property: "Properties",
  tour: "Tours",
  mortgage: "Mortgage",
  saved_property: "Saved",
  system: "System",
};

type FilterType = keyof typeof filterLabels;

type NotificationFilterCardType = {
  filter: FilterType;
  notification_type: string;
};

export default async function NotificationFilterCard({
  filter,
  notification_type,
}: NotificationFilterCardType) {
  let { userId } = await auth();
  userId = userId ? String(userId) : "";

  const count = await getNotificationsCount({ userId, type: filter });
  const unreadCount = await getNotificationsCount({
    userId,
    type: filter,
    is_read: false,
  });
  const isActive = notification_type === filter;

  if (count === 0 && filter !== "all") return null;
  return (
    <>
      <NotificationFilterButton
        isActive={isActive}
        count={count}
        unreadCount={unreadCount}
        filter={filter}
        icon={filterIcons[filter]}
        label={filterLabels[filter]}
      />
    </>
  );
}
