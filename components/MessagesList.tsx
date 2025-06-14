import { chat, message, Property, ScheduledTourData } from "@/types/types";
import MessageCard from "./MessageCard";
import ScheduledTourCard from "./ScheduledTourCard";

type ChatWithProperty = chat & {
  properties: Property;
};

type MessagesListType = {
  chats: ChatWithProperty[];
  unReadMessages: message[];
  message_category: string;
  scheduledTours: ScheduledTourData[];
};

export default async function MessagesList({
  chats,
  unReadMessages,
  message_category,
  scheduledTours,
}: MessagesListType) {
  return (
    <>
      <div className="mt-4 space-y-5 sm:mt-5">
        {message_category === "direct_messages" ? (
          <>
            {chats?.map((chat, idx) => (
              <MessageCard
                key={`${chat?.id} ${idx}`}
                chat={chat}
                unReadMessages={unReadMessages}
              />
            ))}
          </>
        ) : (
          scheduledTours?.map((tour, idx) => (
            <ScheduledTourCard key={`${tour?.id} ${idx}`} tour={tour} />
          ))
        )}
      </div>
    </>
  );
}
