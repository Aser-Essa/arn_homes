import { NotificationData } from "@/types/types";
import EmptyNotifications from "./EmptyNotifications";
import NotificationsList from "./NotificationsList";
import EmptyNotificationFilter from "./EmptyNotificationFilter";
import { auth } from "@clerk/nextjs/server";
import NotificationActions from "./NotificationActions";
import NotificationFilters from "./NotificationFilters";
import { getNotificationsCount } from "@/lib/queries/notifications";

interface NotificationsClientProps {
  notifications: NotificationData[];
  notification_type: string;
}

export default async function NotificationsClient({
  notifications,
  notification_type,
}: NotificationsClientProps) {
  let { userId } = await auth();
  userId = userId ? String(userId) : "";

  const filteredCount = await getNotificationsCount({
    userId,
    type: notification_type,
  });

  const allNotificationsCount = await getNotificationsCount({
    userId,
  });

  if (allNotificationsCount === 0) {
    return <EmptyNotifications />;
  }

  return (
    <>
      <div className="mt-6 space-y-6">
        <NotificationActions />
        <NotificationFilters notification_type={notification_type} />
        <div className="space-y-3">
          <NotificationsList notifications={notifications} />
          <EmptyNotificationFilter
            notification_type={notification_type}
            filteredCount={filteredCount}
          />
        </div>
      </div>
    </>
  );
}
