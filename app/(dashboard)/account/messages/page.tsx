import CompleteProfileBanner from "@/components/CompleteProfileBanner";
import Container from "@/components/Container";
import MessagesHeader from "@/components/MessagesHeader";
import MessagesList from "@/components/MessagesList";
import { getChats, getUnreadMessages } from "@/lib/queries/chats";
import { getScheduledTours } from "@/lib/queries/scheduledTours";
import { auth } from "@clerk/nextjs/server";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;
  const { message_category } = searchParamsValues;

  let { userId } = await auth();
  userId = userId ? String(userId) : "";

  const { chats } = await getChats(userId);

  const { unreadMessageCount } = await getUnreadMessages(userId);

  let { scheduledTours } = await getScheduledTours(userId);
  scheduledTours = scheduledTours?.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Container className="p-4 pt-6 md:!p-8 lg:!p-10">
      <CompleteProfileBanner className="hidden md:block" />
      <div className="flex h-[22px] w-fit cursor-pointer items-center gap-2 rounded-[8px] border-l-[5px] border-amber-600 bg-gray-900 py-[2px] pl-[11px] pr-4 font-exo text-xs text-shades-white transition-all hover:text-scooter-600 md:hidden md:rounded-xl">
        <p>Dashboard</p>
      </div>
      <MessagesHeader
        message_category={
          message_category ? String(message_category) : "direct_messages"
        }
        unreadMessageCount={unreadMessageCount}
      />
      <MessagesList
        chats={chats}
        scheduledTours={scheduledTours}
        message_category={
          message_category ? String(message_category) : "direct_messages"
        }
      />
    </Container>
  );
}
