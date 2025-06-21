import CardHeader from "@/components/CardHeader";
import Container from "@/components/Container";
import NotificationsClient from "@/components/NotificationsClient";
import { Card } from "@/components/ui/card";
import { getUserNotifications } from "@/lib/queries/notifications";
import { params } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";

type searchParams = Promise<params>;

type NotificationsPageType = {
  searchParams: searchParams;
};

const filters = [
  "all",
  "message",
  "property",
  "tour",
  "saved_property",
  "system",
];

export default async function NotificationsPage({
  searchParams,
}: NotificationsPageType) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let { notification_type } = await searchParams;
  notification_type = notification_type ? String(notification_type) : "all";
  notification_type = filters.includes(notification_type)
    ? notification_type
    : "all";

  const notifications = await getUserNotifications({
    userId,
    type: notification_type,
  });

  return (
    <Container className="w-full space-y-7 !px-4 !py-6 md:w-[76vw] md:!p-10">
      <Card className="box-shadow w-full border-none p-6">
        <CardHeader
          icon={<Bell className="h-5 w-5 text-amber-600" />}
          title="Notifications"
          colorClass="bg-amber-50"
        />
        <NotificationsClient
          notifications={notifications}
          notification_type={notification_type}
        />
      </Card>
    </Container>
  );
}
