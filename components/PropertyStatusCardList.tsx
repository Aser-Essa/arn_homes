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
      href: "/active",
    },
    {
      text: "Reviewing",
      icon: "/icons/review.svg",
      href: "/reviewing",
    },
    {
      text: "Declined",
      icon: "/icons/declined.svg",
      href: "/declined",
    },
    {
      text: "Inactive",
      icon: "/icons/inactive.svg",
      href: "/inactive",
    },
  ];

  return (
    <div className="mt-4 space-y-4">
      {statuses?.map(({ text, icon, href }, idx) => (
        <PropertyStatusCard
          key={`${text} ${idx}`}
          text={text}
          icon={icon}
          href={`properties/${category}${href}`}
        />
      ))}
    </div>
  );
}
