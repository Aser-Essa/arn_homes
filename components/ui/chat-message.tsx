import { ChatMessage } from "@/hooks/use-realtime-chat";
import { cn, formatTo12HourTime } from "@/lib/utils";
import { User } from "@/types/types";
import Image from "next/image";

interface ChatMessageItemProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  showHeader: boolean;
  sender: User;
}

export const ChatMessageItem = ({
  message,
  isOwnMessage,
  showHeader,
  sender,
}: ChatMessageItemProps) => {
  const formattedTime = formatTo12HourTime(message.sent_at);

  return (
    <div
      className={`mt-2 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div className={cn("flex w-fit flex-col gap-1 md:max-w-[80%]")}>
        {showHeader && (
          <div
            className={cn("flex items-center gap-2 px-3 text-xs", {
              "flex-row-reverse justify-end": isOwnMessage,
            })}
          >
            <span className="font-medium">{sender.full_name}</span>
          </div>
        )}

        <div className="flex items-end gap-2.5">
          {!isOwnMessage && (
            <Image
              src={sender.avatar}
              width={32}
              height={32}
              alt=""
              className="rounded-[8px]"
            />
          )}

          <div
            className={cn(
              "flex w-full flex-wrap items-end gap-2.5 rounded-xl p-4 text-lg",
              isOwnMessage
                ? "bg-scooter-50 text-shades-black"
                : "bg-shades-off-white",
            )}
          >
            <p className="w-full whitespace-pre-wrap break-words text-base">
              {message.content}
            </p>
            <p className="hidden w-full text-nowrap text-right text-xs sm:block">
              {formattedTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
