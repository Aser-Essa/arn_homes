import React from "react";
import NavLink from "./NavLink";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function NavLinks() {
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
    <>
      <ul className="hidden h-[42px] items-center gap-6 text-nowrap px-4 py-2 min-[820px]:flex">
        {navLinks.map(({ label, href, icon }, idx) => (
          <NavLink key={`${label} ${idx}`} href={href} icon={icon}>
            {label}
          </NavLink>
        ))}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <NavLink href="/account" icon="/icons/user-circle.svg">
            Account
          </NavLink>
        </SignedIn>
      </ul>
    </>
  );
}
