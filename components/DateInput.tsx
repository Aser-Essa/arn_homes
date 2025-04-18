"use client";

import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

type DateInputType = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export default function DateInput({ date, setDate }: DateInputType) {
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
              onSelect={setDate}
              initialFocus
              className="w-full"
            />
          </PopoverContent>
        </div>
      </Popover>
    </>
  );
}
