import {
  markAllNotificationsAsRead,
  refreshNotification,
} from "@/lib/actions/notifications";
import { getNotificationsCount } from "@/lib/queries/notifications";
import { auth } from "@clerk/nextjs/server";
import { CheckCheck, RefreshCw } from "lucide-react";
import FormActionButton from "./FormActionButton";

export default async function NotificationActions() {
  let { userId } = await auth();
  userId = userId ? String(userId) : "";

  const count = await getNotificationsCount({ userId });
  const unreadCount = await getNotificationsCount({
    userId,
    is_read: false,
  });

  const hasUnread = unreadCount > 0;

  async function handleMarkAllAsRead() {
    "use server";
    if (!hasUnread) return;
    try {
      if (userId) {
        await markAllNotificationsAsRead();
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  }

  if (count === 0) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-between gap-8 rounded-lg border border-gray-200 bg-white p-4 max-sm:w-full sm:flex-row">
          <div className="text-sm text-gray-600">
            {count} total notifications
            {hasUnread && (
              <span className="ml-2 font-medium text-scooter-700">
                ({unreadCount} unread)
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {hasUnread && (
              <form action={handleMarkAllAsRead}>
                <FormActionButton
                  icon={<CheckCheck className="mr-2 h-4 w-4" />}
                >
                  Mark all as read
                </FormActionButton>
              </form>
            )}
            <form action={refreshNotification} className="block sm:hidden">
              <FormActionButton
                icon={<RefreshCw className={`mr-2 h-4 w-4`} />}
                iconAnimation="animate-spin"
              >
                Refresh
              </FormActionButton>
            </form>
          </div>
        </div>
        <form action={refreshNotification} className="hidden sm:block">
          <FormActionButton
            icon={<RefreshCw className={`mr-2 h-4 w-4`} />}
            iconAnimation="animate-spin"
          >
            Refresh
          </FormActionButton>
        </form>
      </div>
    </>
  );
}
