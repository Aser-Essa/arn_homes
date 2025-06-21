import React from "react";
import PropertyStatusCard from "./PropertyStatusCard";
import { getMyProperties } from "@/lib/queries/properties";
import { auth } from "@clerk/nextjs/server";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type PropertyStatusCardListType = {
  category: string;
};

export default async function PropertyStatusCardList({
  category,
}: PropertyStatusCardListType) {
  const statuses = [
    {
      text: "Active",
      icon: "/icons/active.svg",
      status: "active",
    },
    {
      text: "Reviewing",
      icon: "/icons/review.svg",
      status: "reviewing",
    },
    {
      text: "Declined",
      icon: "/icons/declined.svg",
      status: "declined",
    },
    {
      text: "Inactive",
      icon: "/icons/inactive.svg",
      status: "inactive",
    },
  ];

  const { userId } = await auth();

  if (!userId) {
    toast.error("User not authenticated");
    redirect("/sign-in");
  }

  const counts = Object.fromEntries(
    await Promise.all(
      statuses.map(async ({ status }) => {
        const { count } = await getMyProperties({
          userId,
          status: status,
          category,
        });
        return [[status], count];
      }),
    ),
  );

  return (
    <div className="mt-4 space-y-4">
      {statuses?.map(({ text, icon, status }, idx) => (
        <PropertyStatusCard
          key={`${text} ${idx}`}
          text={text}
          icon={icon}
          href={`/account/properties?category=${category}&status=${status}`}
          count={counts[status]}
        />
      ))}
    </div>
  );
}
