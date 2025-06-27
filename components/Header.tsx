import React from "react";
import Container from "./Container";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import SideMobileMenu from "./SideMobileMenu";
import AddPropertyButton from "./AddPropertyButton";

type HeaderType = {
  className?: string;
};

export default function Header({ className }: HeaderType) {
  return (
    <>
      <Container
        className={cn(
          "box-shadow fixed left-0 top-0 z-[1000000000] flex h-[98px] w-full items-center justify-between bg-shades-white py-5 font-exo",
          className,
        )}
      >
        <Logo />
        <NavLinks />
        <AddPropertyButton
          className={
            "hidden h-[58px] items-center gap-2 md:px-3 md:py-2 min-[820px]:flex lg:px-6 lg:py-4"
          }
        />
        <SideMobileMenu />
      </Container>
    </>
  );
}
