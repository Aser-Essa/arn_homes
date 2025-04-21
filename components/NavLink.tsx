"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkType = {
  href: string;
  icon?: string;
  children: React.ReactNode;
};

export default function NavLink({ href, icon, children }: NavLinkType) {
  const path = usePathname();
  // const isActive = "rounded-xl bg-scooter-50 p-2";

  const isActive =
    (href.split("/").join("").length > 0 && path.includes(href)) ||
    (href === "" && path === "") ||
    (href === "/" && path === "/");

  return (
    <>
      <li>
        <Link
          href={href}
          className={cn(
            "flex items-center gap-1",
            isActive && "rounded-xl bg-scooter-50 p-2",
          )}
        >
          {isActive && icon && (
            <Image
              src={icon}
              width={18}
              height={18}
              alt="home"
              className="mt-[-4px]"
            />
          )}
          <p>{children}</p>
        </Link>
      </li>
    </>
  );
}
