import CategorySwitch from "./CategorySwitch";
import { IoIosArrowBack } from "react-icons/io";

type MessagesHeaderType = {
  message_category: string;
  unreadMessageCount: number;
};

const categories = [
  { key: "direct_messages", label: "Direct messages" },
  { key: "scheduled_tours", label: "Scheduled tours" },
];

export default function MessagesHeader({
  message_category,
  unreadMessageCount,
}: MessagesHeaderType) {
  return (
    <div className="relative mt-4 flex w-full items-center justify-between md:mt-10">
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <IoIosArrowBack className="block sm:hidden" />
          <p className="text-base font-semibold sm:text-[24px] lg:text-[28px]">
            Messages
          </p>
        </div>
        <CategorySwitch
          categories={categories}
          category_val={
            message_category ? String(message_category) : "direct_messages"
          }
          category_name={"message_category"}
        />
      </div>
      <p className="hidden text-nowrap text-lg font-semibold text-scooter-700 lg:block">
        {unreadMessageCount} unread messages
      </p>
    </div>
  );
}
