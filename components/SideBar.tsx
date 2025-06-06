import Image from "next/image";
import React from "react";
import SidebarNavLink from "./SidebarNavLink";
import { IoMail, IoHeart, IoNotifications } from "react-icons/io5";
import SignOutBtn from "./SignOutBtn";
import { MdOutlineStarHalf } from "react-icons/md";
import { auth } from "@clerk/nextjs/server";
import {
  getMyProperties,
  getSavedProperties,
  getUnreadMessageCount,
} from "@/lib/data-service";

export default async function SideBar() {
  const { userId } = await auth();

  const category = ["sale", "rent", "investment"];

  const { count: myPropertiesCount } = await getMyProperties({
    userId: userId ? String(userId) : "",
    category: "",
    status: "",
  });

  const { unreadMessageCount } = await getUnreadMessageCount(
    userId ? String(userId) : "",
  );

  const savedPropertiesCountArray: number[] = await Promise.all(
    category.map(async (cat) => {
      const { count } = await getSavedProperties({
        userId: userId ? String(userId) : "",
        category: cat,
      });
      return Number(count);
    }),
  );

  const savedPropertiesCount = savedPropertiesCountArray.reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return (
    <div className="box-shadow relative h-full w-full space-y-6 px-3 py-3.5 shadow-shades-white md:w-[24vw] md:py-10 lg:px-6">
      <div className="hidden h-12 w-full cursor-pointer items-center gap-2 rounded-xl border-l-[5px] border-amber-600 bg-gray-900 px-6 pl-[11px] pr-4 font-exo text-shades-white transition-all hover:text-scooter-600 md:flex md:text-lg lg:text-xl">
        <Image
          src={"/icons/dashboard.svg"}
          width={24}
          height={24}
          alt="dashboard"
        />
        <p>Dashboard</p>
      </div>
      <ul className="space-y-2.5">
        <SidebarNavLink
          href="/account"
          icon={
            <Image
              src={"/icons/small-logo.svg"}
              width={26}
              height={26}
              alt="icon"
              className="relative -left-1"
            />
          }
          numberOfNotifications={myPropertiesCount ? myPropertiesCount : 0}
        >
          My properties
        </SidebarNavLink>
        <SidebarNavLink
          href="/account/messages"
          icon={<IoMail className="h-5 w-5" />}
          numberOfNotifications={unreadMessageCount ? unreadMessageCount : 0}
        >
          Messages
        </SidebarNavLink>

        <SidebarNavLink
          href="/account/saved_properties"
          icon={<IoHeart className="h-5 w-5" />}
          numberOfNotifications={
            savedPropertiesCount ? savedPropertiesCount : 0
          }
        >
          Saved properties
        </SidebarNavLink>

        <SidebarNavLink
          href="/account/notifications"
          icon={<IoNotifications className="h-5 w-5" />}
        >
          Notifications
        </SidebarNavLink>
      </ul>

      <ul>
        <SidebarNavLink
          href="/account/profile"
          icon={
            <Image
              src={"/icons/user-circle.svg"}
              width={20}
              height={20}
              alt="icon"
            />
          }
        >
          Profile
        </SidebarNavLink>
      </ul>

      <ul className="space-y-2.5">
        <p className="px-4 py-2 text-lg font-medium text-gray-300">Settings</p>
        <SidebarNavLink
          href="/account/preferences"
          icon={
            <Image
              src={"/icons/preferences.svg"}
              width={24}
              height={24}
              alt="icon"
            />
          }
        >
          preferences
        </SidebarNavLink>
        <SidebarNavLink
          href="/account/change_password"
          icon={
            <Image src={"/icons/edit.svg"} width={24} height={24} alt="icon" />
          }
        >
          Change password
        </SidebarNavLink>
        <SidebarNavLink
          href="/account/change_email"
          icon={
            <Image src={"/icons/edit.svg"} width={24} height={24} alt="icon" />
          }
        >
          Change Email
        </SidebarNavLink>

        <SignOutBtn />
      </ul>

      <ul className="space-y-2.5">
        <SidebarNavLink
          href="/account/profile"
          icon={<MdOutlineStarHalf className="h-6 w-6" />}
        >
          Rate us
        </SidebarNavLink>
      </ul>

      <button className="bottom-10 flex cursor-pointer items-center gap-2 px-4 py-2 font-medium text-red-500 transition-all sm:absolute lg:text-lg">
        <Image src={"/icons/delete.svg"} width={24} height={24} alt="delete" />
        <p>Delete account</p>
      </button>
    </div>
  );
}
