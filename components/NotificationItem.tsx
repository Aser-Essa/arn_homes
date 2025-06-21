"use client";
import {
  deleteNotification,
  markNotificationAsRead,
} from "@/lib/actions/notifications";
import { cn } from "@/lib/utils";
import { NotificationData } from "@/types/types";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Calendar,
  CreditCard,
  ExternalLink,
  Eye,
  Heart,
  Home,
  Mail,
  Trash2,
} from "lucide-react";
import NotificationItemWrapper from "./NotificationItemWrapper";
import { Card } from "./ui/card";
import FormActionButton from "./FormActionButton";

interface NotificationItemProps {
  notification: NotificationData;
  index: number;
}

const notificationIcons = {
  message: <Mail className="h-4 w-4" />,
  property: <Home className="h-4 w-4" />,
  tour: <Calendar className="h-4 w-4" />,
  mortgage: <CreditCard className="h-4 w-4" />,
  saved_property: <Heart className="h-4 w-4" />,
  system: <Bell className="h-4 w-4" />,
};

const notificationColors = {
  message: "text-blue-600 bg-blue-50",
  property: "text-green-600 bg-green-50",
  tour: "text-purple-600 bg-purple-50",
  mortgage: "text-orange-600 bg-orange-50",
  saved_property: "text-pink-600 bg-pink-50",
  system: "text-gray-600 bg-gray-50",
};

const getNotificationLink = (notification: NotificationData): string | null => {
  switch (notification.type) {
    case "message":
      return "/account/messages";
    case "property":
      return notification.related_id
        ? `/properties/${notification.related_id}`
        : "/account/properties";
    case "tour":
      return notification.related_id
        ? `/account/scheduled-tours/${notification.related_id}`
        : "/account/scheduled-tours";
    case "saved_property":
      return "/account/saved-properties";
    default:
      return null;
  }
};

export default function NotificationItem({
  notification,
  index,
}: NotificationItemProps) {
  async function handleMarkAsRead() {
    if (notification.is_read) return;
    try {
      await markNotificationAsRead(notification.id);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteNotification(notification.id);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  }

  const icon = notificationIcons[notification.type];
  const colorClass = notificationColors[notification.type];
  const link = getNotificationLink(notification);

  return (
    <NotificationItemWrapper
      index={index}
      link={link}
      notification={notification}
    >
      <Card
        className={cn(
          "box-shadow border-none p-4 transition-all duration-200 hover:shadow-md",
          notification.is_read
            ? "bg-gray-50/50"
            : "border-l-4 border-l-blue-500 bg-white",
          link && "cursor-pointer",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Left side - Icon and content */}
          <div className="flex min-w-0 flex-1 gap-3">
            {/* Icon */}
            <div className={cn("h-8 flex-shrink-0 rounded-lg p-2", colorClass)}>
              {icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p
                  className={cn(
                    "text-sm leading-5",
                    notification.is_read
                      ? "text-gray-700"
                      : "font-semibold text-gray-900",
                  )}
                >
                  {notification.title}
                </p>

                {/* Unread indicator */}
                {!notification.is_read && (
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600" />
                )}
              </div>

              {notification.description && (
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                  {notification.description}
                </p>
              )}

              <div className="mt-3 flex items-center gap-4">
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(notification.created_at), {
                    addSuffix: true,
                  })}
                </span>

                {link && <ExternalLink className="h-3 w-3 text-gray-400" />}
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex flex-shrink-0 gap-1">
            {!notification.is_read && (
              <form
                action={handleMarkAsRead}
                onClick={(e) => e.stopPropagation()}
              >
                <FormActionButton
                  icon={<Eye className="h-4 w-4" />}
                  className="h-7 w-7 rounded border-none bg-transparent p-1.5 text-gray-400 !shadow-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                />
              </form>
            )}

            <form action={handleDelete} onClick={(e) => e.stopPropagation()}>
              <FormActionButton
                icon={<Trash2 className="h-4 w-4" />}
                className="h-7 w-7 rounded border-none bg-transparent p-1.5 text-gray-400 !shadow-none !transition-colors hover:bg-red-50 hover:text-red-600"
              />
            </form>
          </div>
        </div>
      </Card>
    </NotificationItemWrapper>
  );
}
