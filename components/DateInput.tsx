"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isBefore, startOfDay } from "date-fns";
import Image from "next/image";

type DateInputType = {
  date: Date | undefined;
  onValueChange: () => void;
};

export default function DateInput({ date, onValueChange }: DateInputType) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-[50px] w-full justify-between rounded-xl border-amber-100 text-left text-lg font-normal text-gray-300 !ring-0 hover:bg-white",
              !date && "text-muted-foreground",
            )}
          >
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="text-lg text-gray-300">Select date</span>
            )}
            <Image
              src={"/icons/calendar.svg"}
              width={24}
              height={24}
              alt="calendar"
            />
          </Button>
        </PopoverTrigger>
        <div className="relative w-full">
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onValueChange}
              disabled={(isDate) =>
                isBefore(startOfDay(isDate), startOfDay(new Date()))
              }
              initialFocus
              className="w-full"
            />
          </PopoverContent>
        </div>
      </Popover>
    </>
  );
}
