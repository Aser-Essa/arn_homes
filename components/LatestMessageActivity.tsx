import { getChats } from "@/lib/queries/chats";
import { formatTimeAgo } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import ProfileActivity from "./ProfileActivity";

export default async function LatestMessageActivity({
  userId,
}: {
  userId?: string;
}) {
  const { chats } = await getChats(userId ? String(userId) : "");

  const lastMessage = chats?.at(0)?.last_message;

  return (
    <>
      <ProfileActivity
        icon={
          <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
        }
        title={"Latest Message"}
        description={lastMessage?.content || "No messages yet"}
        subtext={
          lastMessage?.sent_at
            ? formatTimeAgo(lastMessage?.sent_at)
            : "No recent messages"
        }
      />
    </>
  );
}
