"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { FaBars } from "react-icons/fa6";
import AddPropertyButton from "./AddPropertyButton";
import Logo from "./Logo";
import NavLink from "./NavLink";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function SideMobileMenu() {
  const navLinks = [
    {
      label: "Home",
      href: "/",
      icon: "/icons/home.svg",
    },
    {
      label: "For sale",
      href: "/properties/sale",
      icon: "/icons/store.svg",
    },
    {
      label: "For rent",
      href: "/properties/rent",
      icon: "/icons/home-activity.svg",
    },
    {
      label: "For investment",
      href: "/properties/investment",
      icon: "/icons/building-coins.svg",
    },
    {
      label: "Blog",
      href: "/blog",
      icon: "/icons/blog.svg",
    },
  ];

  return (
    <div className="min-[820px]:!hidden">
      <Sheet>
        <SheetTrigger asChild>
          <FaBars className="h-6 w-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="z-[10000000000] w-[85%] overflow-y-auto text-nowrap rounded-l-lg p-6 pt-8 font-exo">
          <SheetHeader className="mb-10 pl-2">
            <SheetTitle className="flex items-end gap-2 text-start text-xl font-bold leading-4 sm:text-2xl">
              <p>Arn Homes</p>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <ul className="flex flex-col gap-7 text-nowrap py-2">
            {navLinks.map(({ label, href, icon }, idx) => (
              <NavLink
                key={`${label} ${idx}`}
                href={href}
                icon={icon}
                className="gap-3 px-2 text-lg font-medium"
              >
                {label}
              </NavLink>
            ))}
            <SignedOut>
              <div className="px-2 text-lg font-medium">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <NavLink
                href="/account"
                icon="/icons/user-circle.svg"
                className="gap-3 px-2 text-lg font-medium"
              >
                Account
              </NavLink>
            </SignedIn>
          </ul>

          <AddPropertyButton className="absolute bottom-6 left-6 flex h-[58px] w-[calc(100%-48px)] items-center gap-2 text-lg" />

          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
