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
      <div
        className={cn("flex w-fit max-w-[75%] flex-col gap-1", {
          "items-end": isOwnMessage,
        })}
      >
        {showHeader && (
          <div
            className={cn("flex items-center gap-2 px-3 text-xs", {
              "flex-row-reverse justify-end": isOwnMessage,
            })}
          >
            <span className={"font-medium"}>{sender.full_name}</span>
          </div>
        )}

        <div className="flex items-end gap-2.5">
          {!isOwnMessage && (
            <div>
              <Image
                src={sender.avatar}
                width={32}
                height={32}
                alt=""
                className="rounded-[8px]"
              />
            </div>
          )}

          <div
            className={cn(
              "flex w-fit items-end gap-[50px] rounded-xl p-4 text-lg",
              isOwnMessage
                ? "bg-scooter-50 text-shades-black"
                : "bg-shades-off-white",
            )}
          >
            <p>{message.content}</p>
            <span className="text-nowrap text-xs">{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
