import React from "react";
import Container from "./Container";
import { Button } from "./ui/button";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SideMobileMenu from "./SideMobileMenu";

type HeaderType = {
  className?: string;
};

export default function Header({ className }: HeaderType) {
  return (
    <>
      <Container
        className={cn(
          "box-shadow relative z-[100000] flex h-[98px] items-center justify-between py-5 font-exo",
          className,
        )}
      >
        <Logo />
        <NavLinks />

        <Button className="hidden h-[58px] items-center gap-2 md:px-3 md:py-2 min-[820px]:flex lg:px-6 lg:py-4">
          <Image
            src={"/icons/home_price.svg"}
            width={18}
            height={18}
            alt="home"
            className="mt-[-4px]"
          />
          Add Listing
        </Button>
        <SideMobileMenu />
      </Container>
    </>
  );
}
