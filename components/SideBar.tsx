import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { IoHeart, IoMail, IoNotifications } from "react-icons/io5";
import SidebarNavLink from "./SidebarNavLink";
import SignOutBtn from "./SignOutBtn";
import { getMyProperties } from "@/lib/queries/properties";
import { getUnreadMessages } from "@/lib/queries/chats";
import { getSavedProperties } from "@/lib/queries/favorites";
import { getNotificationsCount } from "@/lib/queries/notifications";
import FormActionButton from "./FormActionButton";
import { deleteUser } from "@/lib/actions/users";
import Link from "next/link";

export default async function SideBar() {
  let { userId } = await auth();
  userId = userId ? String(userId) : "";

  const category = ["sale", "rent", "investment"];

  const { count: myPropertiesCount } = await getMyProperties({
    userId,
    category: "",
    status: "",
  });

  const { unreadMessageCount } = await getUnreadMessages(userId);

  const savedPropertiesCountArray: number[] = await Promise.all(
    category.map(async (cat) => {
      const { count } = await getSavedProperties({
        userId,
        category: cat,
      });
      return Number(count);
    }),
  );

  const savedPropertiesCount = savedPropertiesCountArray.reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const notifivationsCount = await getNotificationsCount({
    userId,
    is_read: false,
  });

  return (
    <div className="box-shadow relative h-full min-h-[825px] w-full space-y-6 px-3 py-3.5 shadow-shades-white md:w-[24vw] md:py-10 lg:px-6">
      <div className="hidden h-12 w-full cursor-pointer items-center gap-2 rounded-xl border-l-[5px] border-amber-600 bg-gray-900 px-6 pl-[11px] pr-4 font-exo text-shades-white transition-all hover:text-scooter-600 md:flex md:text-lg lg:text-xl">
        <Image
          src={"/icons/dashboard.svg"}
          width={24}
          height={24}
          alt="dashboard"
        />
        <Link href={"/account"}>Dashboard</Link>
      </div>
      <ul className="space-y-2.5">
        <div className="hidden sm:block">
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
        </div>
        <div className="block sm:hidden">
          <SidebarNavLink
            href="/account/properties?category=sale&status=active"
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
        </div>
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
          numberOfNotifications={notifivationsCount ? notifivationsCount : 0}
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

      <ul className="sm:space-y-2.5">
        <p className="px-4 py-2 text-lg font-medium text-gray-300">Settings</p>
        {/* <SidebarNavLink
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
        </SidebarNavLink> */}
        {/* <SidebarNavLink
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
        </SidebarNavLink> */}

        <SignOutBtn />
      </ul>

      {/* <ul className="space-y-2.5">
        <SidebarNavLink
          href="/account/rate-us"
          icon={<MdOutlineStarHalf className="h-6 w-6" />}
        >
          Rate us
        </SidebarNavLink>
      </ul> */}

      <form action={deleteUser} className="px-4">
        <FormActionButton
          className="bottom-10 flex cursor-pointer items-center gap-2 border-none !bg-white !p-0 px-4 py-2 font-medium !shadow-none transition-all sm:absolute lg:text-lg"
          icon={
            <Image
              src={"/icons/delete.svg"}
              width={24}
              height={24}
              alt="delete"
            />
          }
        >
          <p className="text-base text-red-500 sm:text-lg">Delete account</p>
        </FormActionButton>
      </form>
    </div>
  );
}
