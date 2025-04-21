import React from "react";
import NavLink from "./NavLink";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function NavLinks() {
  return (
    <>
      <ul className="hidden h-[42px] items-center gap-6 text-nowrap px-4 py-2 min-[820px]:flex">
        <NavLink href="/" icon="/icons/home.svg">
          Home
        </NavLink>
        <NavLink href="/sale" icon="/icons/store.svg">
          For sale
        </NavLink>
        <NavLink href="/rent" icon="/icons/home-activity.svg">
          For rent
        </NavLink>
        <NavLink href="/investment" icon="/icons/building-coins.svg">
          For investment
        </NavLink>
        <NavLink href="/blog" icon="/icons/blog.svg">
          Blog
        </NavLink>

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
