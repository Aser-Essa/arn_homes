import { getUnreadMessages } from "@/lib/data-service";
import { Heart, MessageCircle, Search } from "lucide-react";
import ActionButton from "./ActionButton";
import { currentUser } from "@clerk/nextjs/server";

export default async function QuickActions() {
  const user = await currentUser();

  if (!user) return <></>;

  const userId = user?.id ? String(user?.id) : "";
  const { unreadMessageCount } = await getUnreadMessages(userId);

  return (
    <>
      <div className="box-shadow rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Quick Actions
        </h2>

        <div className="space-y-4">
          <>
            <ActionButton
              icon={<Search className="h-5 w-5" />}
              title="Browse Properties"
              description="Find your dream property"
              href="/properties/sale"
              color="blue"
            />
            <ActionButton
              icon={<Heart className="h-5 w-5" />}
              title="View Saved Properties"
              description="Review your saved listings"
              href="/account/saved_properties"
              color="red"
            />
          </>

          <ActionButton
            icon={<MessageCircle className="h-5 w-5" />}
            title="Messages"
            description="Chat with agents and sellers"
            href="/account/messages"
            color="purple"
            hasNotification={unreadMessageCount > 0}
          />
        </div>
      </div>
    </>
  );
}
