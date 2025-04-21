import React from "react";
import PropertyStatusCard from "./PropertyStatusCard";

type PropertyStatusCardListType = {
  category: string;
};

export default function PropertyStatusCardList({
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

  return (
    <div className="mt-4 space-y-4">
      {statuses?.map(({ text, icon, status }, idx) => (
        <PropertyStatusCard
          key={`${text} ${idx}`}
          text={text}
          icon={icon}
          href={`account/properties?category=${category}&status=${status}`}
        />
      ))}
    </div>
  );
}
