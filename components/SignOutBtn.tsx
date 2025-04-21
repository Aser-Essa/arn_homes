import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export default function SignOutBtn() {
  return (
    <>
      <SignedIn>
        <SignOutButton>
          <div className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all hover:bg-scooter-50 lg:text-lg">
            <Image
              src={"/icons/signout.svg"}
              width={24}
              height={24}
              alt="icon"
              className="hidden lg:block"
            />
            <p className="">Sign out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </>
  );
}
