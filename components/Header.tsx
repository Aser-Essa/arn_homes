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
          "box-shadow relative z-[100000] flex h-[98px] items-center justify-between py-5 font-exo",
          className,
        )}
      >
        <Logo />
        <NavLinks />
        <AddPropertyButton />
        <SideMobileMenu />
      </Container>
    </>
  );
}
