import { chat, Property, ScheduledTourData } from "@/types/types";
import MessageCard from "./MessageCard";
import ScheduledTourCard from "./ScheduledTourCard";

type ChatWithProperty = chat & {
  properties: Property;
};

type MessagesListType = {
  chats: ChatWithProperty[];
  message_category: string;
  scheduledTours: ScheduledTourData[];
};

export default async function MessagesList({
  chats,
  message_category,
  scheduledTours,
}: MessagesListType) {
  return (
    <>
      <div className="mt-4 space-y-5 sm:mt-5">
        {message_category === "direct_messages" ? (
          <>
            {chats?.length > 0 ? (
              <>
                {chats?.map((chat, idx) => (
                  <MessageCard key={`${chat?.id} ${idx}`} chat={chat} />
                ))}
              </>
            ) : (
              <div className="flex h-[250px] w-full items-center justify-center">
                <p className="text-shades-gray-500 text-lg font-semibold">
                  No Messages found
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {scheduledTours?.length > 0 ? (
              <>
                {scheduledTours?.map((tour, idx) => (
                  <ScheduledTourCard key={`${tour?.id} ${idx}`} tour={tour} />
                ))}
              </>
            ) : (
              <div className="flex h-[250px] w-full items-center justify-center">
                <p className="text-shades-gray-500 text-lg font-semibold">
                  No scheduled tours found
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
