import CompleteProfileBanner from "@/components/CompleteProfileBanner";
import Container from "@/components/Container";
import MessagesHeader from "@/components/MessagesHeader";
import MessagesList from "@/components/MessagesList";
import {
  getChats,
  getProperty,
  getUnreadMessageCount,
} from "@/lib/data-service";
import { auth } from "@clerk/nextjs/server";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  const { userId } = await auth();

  const chatData = await getChats(userId ? String(userId) : "");

  if (!chatData) {
    return <div className="p-4 text-red-500">No chats found.</div>;
  }

  const { chats } = chatData;

  const chatCardsData = await Promise.all(
    chats.map(async (chat) => {
      const { property } = await getProperty(chat.property_id);
      return { chat, property };
    }),
  );

  const { unreadMessageCount, unReadMessages } = await getUnreadMessageCount(
    userId ? String(userId) : "",
  );

  return (
    <Container className="mb-[1000px] p-4 pt-6 md:!p-8 lg:!p-10">
      <CompleteProfileBanner className="hidden md:block" />
      <div className="flex h-[22px] w-fit cursor-pointer items-center gap-2 rounded-[8px] border-l-[5px] border-amber-600 bg-gray-900 py-[2px] pl-[11px] pr-4 font-exo text-xs text-shades-white transition-all hover:text-scooter-600 md:hidden md:rounded-xl">
        <p>Dashboard</p>
      </div>
      <MessagesHeader
        params={searchParamsValues}
        unreadMessageCount={unreadMessageCount}
      />
      <MessagesList
        chatCardsData={chatCardsData}
        unReadMessages={unReadMessages ? unReadMessages : []}
      />
    </Container>
  );
}
