import { getChats, getUserMessages } from "@/lib/data-service";
import { formatTimeAgo } from "@/lib/utils";
import { message } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import ProfileActivity from "./ProfileActivity";
import { MessageCircle } from "lucide-react";

export default async function LatestMessageActivity() {
  const { userId } = await auth();

  const chatData = await getChats(userId ? String(userId) : "");

  if (!chatData) {
    return <div className="p-4 text-red-500">No chats found.</div>;
  }

  const { chats } = chatData;

  const contactUsersIds = Array.from(
    new Set([
      ...chats.map(({ user_one }) => user_one),
      ...chats.map(({ user_two }) => user_two),
    ]),
  );

  const messagesArrays = await Promise.all(
    contactUsersIds.map(
      async (id) => (await getUserMessages({ userId: id })).messages,
    ),
  );

  const messages: message[] = messagesArrays.flat();

  const sortedMessages = messages.sort((a, b) => {
    return new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime();
  });

  const lastMessage = sortedMessages?.at(0);

  return (
    <>
      <ProfileActivity
        icon={
          <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
        }
        title={"Latest Message"}
        description={lastMessage?.content || ""}
        subtext={formatTimeAgo(lastMessage?.sent_at || "")}
      />
    </>
  );
}
