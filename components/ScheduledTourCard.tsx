import { formatDateLong } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Badge } from "./ui/badge";

type ScheduledTourCardProps = {
  tour: {
    id: string;
    name: string; // ✅ Include the name here
    scheduled_date: string;
    scheduled_time: string;
    status: string;
    properties: {
      id: string;
      title: string;
      images: string[];
    };
  };
};

export default function ScheduledTourCard({ tour }: ScheduledTourCardProps) {
  const { id, name, scheduled_date, scheduled_time, status, properties } = tour;
  const { title, images } = properties;

  const formattedDate = formatDateLong(scheduled_date);
  const formattedTime = scheduled_time?.slice(0, 5);

  function getStatusColor(status: string) {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  }

  return (
    <Link
      href={`/account/messages/scheduled_tour/${id}`}
      className="relative block"
    >
      <div className="box-shadow flex w-full cursor-pointer items-center gap-2.5 rounded-xl border-b border-shades-off-white pb-2.5 pr-2.5 transition-all max-sm:shadow-none sm:h-[102px] sm:gap-4 sm:p-4 hover:sm:bg-shades-off-white">
        <div className="relative min-h-10 min-w-10 overflow-hidden rounded-[8px] sm:min-h-16 sm:min-w-16">
          <Image
            fill
            src={images?.[0] || "/fallback-image.jpg"}
            alt={title}
            className="object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <p className="text-sm font-semibold text-scooter-700 sm:text-lg">
                {title}
              </p>
              <p className="hidden text-lg sm:block">•</p>
              <p className="hidden w-[100px] text-sm sm:block">
                {formattedDate}
              </p>
              <Badge className={`capitalize ${getStatusColor(status)}`}>
                {status}
              </Badge>
            </div>
            <p className="text-xs font-semibold text-amber-600 sm:text-sm">
              Tour Time: {formattedTime}
            </p>
            <p className="text-xs font-medium text-gray-800 sm:text-sm">
              Scheduled by: {name}
            </p>
          </div>
          <IoIosArrowForward className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
}
