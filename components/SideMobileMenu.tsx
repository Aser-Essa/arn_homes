"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { FaBars } from "react-icons/fa6";
import NavLink from "./NavLink";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from "./Logo";

export default function SideMobileMenu() {
  const navLinks = [
    {
      label: "Home",
      href: "/",
      icon: "/icons/home.svg",
    },
    {
      label: "For sale",
      href: "/sale",
      icon: "/icons/store.svg",
    },
    {
      label: "For rent",
      href: "/rent",
      icon: "/icons/home-activity.svg",
    },
    {
      label: "For investment",
      href: "/investment",
      icon: "/icons/building-coins.svg",
    },
    {
      label: "Blog",
      href: "/blog",
      icon: "/icons/blog.svg",
    },
  ];

  return (
    <div className="sm:!hidden">
      <Sheet>
        <SheetTrigger asChild>
          <FaBars className="h-6 w-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="z-[100000] w-[85%] overflow-y-auto text-nowrap rounded-l-lg p-6 pt-8 font-exo">
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
              <div className="px-2">
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

          <Button className="absolute bottom-6 left-6 flex h-[58px] w-[calc(100%-48px)] items-center gap-2 text-lg">
            <Image
              src={"/icons/home_price.svg"}
              width={18}
              height={18}
              alt="home"
              className="mt-[-4px]"
            />
            Add Listing
          </Button>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
