import { refreshNotification } from "@/lib/actions/notifications";
import { Bell, RefreshCw } from "lucide-react";
import FormActionButton from "./FormActionButton";

export default function EmptyNotifications() {
  return (
    <>
      <div className="py-12 pb-0 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Bell className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No notifications yet
        </h3>
        <p className="mb-10 text-gray-600">
          When you receive messages, property updates, or tour requests,
          they&apos;ll appear here.
        </p>
        <form action={refreshNotification}>
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
