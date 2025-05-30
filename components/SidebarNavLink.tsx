"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

type SidebarNavLinkType = {
  href: string;
  icon: React.ReactNode;
  children: string;
  numberOfNotifications?: number;
  unreadMessageCount?: number;
};

export default function SidebarNavLink({
  href,
  icon,
  children,
  numberOfNotifications,
  unreadMessageCount,
}: SidebarNavLinkType) {
  const path = usePathname();

  const isActive = path.includes(href);

  return (
    <>
      <li
        className={cn(
          "h-[42px] cursor-pointer text-nowrap rounded-xl px-4 py-2 font-medium transition-all hover:bg-scooter-50 min-[1100px]:text-lg",
          isActive && "sm:bg-scooter-50",
        )}
      >
        <Link href={href} className="flex items-center gap-2">
          <div className="block sm:hidden lg:block">{icon}</div>
          <p className="flex-1">{children}</p>
          {numberOfNotifications && (
            <p className="font-medium max-sm:flex max-sm:aspect-square max-sm:w-7 max-sm:items-center max-sm:justify-center max-sm:rounded-full max-sm:bg-shades-off-white lg:text-lg">
              {numberOfNotifications}
            </p>
          )}
          {unreadMessageCount && unreadMessageCount > 0 && (
            <p className="font-medium max-sm:flex max-sm:aspect-square max-sm:w-7 max-sm:items-center max-sm:justify-center max-sm:rounded-full max-sm:bg-shades-off-white lg:text-lg">
              {unreadMessageCount}
            </p>
          )}
          <IoIosArrowForward className="ml-6 block h-5 w-5 sm:hidden" />
        </Link>
      </li>
    </>
  );
}
