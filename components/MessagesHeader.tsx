import { params } from "@/types/types";
import CategorySwitch from "./CategorySwitch";

type MessagesHeaderType = {
  params: params;
  unreadMessageCount: number;
};

const categories = [
  { key: "direct_messages", label: "Direct messages" },
  { key: "scheduled_tours", label: "Scheduled tours" },
];

export default function MessagesHeader({
  params,
  unreadMessageCount,
}: MessagesHeaderType) {
  const { message_category } = params;

  return (
    <div className="relative mt-10 flex w-full items-center justify-between">
      <p className="text-[24px] font-semibold lg:text-[28px]">Messages</p>
      <CategorySwitch
        categories={categories}
        category_val={
          message_category ? String(message_category) : "direct_messages"
        }
        category_name={"message_category"}
      />
      <p className="hidden text-lg font-semibold text-scooter-700 lg:block">
        {unreadMessageCount} unread messages
      </p>
    </div>
  );
}
