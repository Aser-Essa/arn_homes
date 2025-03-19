import React from "react";
import Container from "./Container";
import { Button } from "./ui/button";
import NavLinks from "./NavLinks";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";

export default function Header() {
  return (
    <>
      <Container
        className={"flex h-[98px] items-center justify-between py-5 font-exo"}
      >
        <Logo />
        <NavLinks />
        <Button className="hidden h-[58px] md:px-3 md:py-2 min-[820px]:block lg:px-6 lg:py-4">
          Add Listing
        </Button>
        <FaBars className="h-6 w-6 cursor-pointer min-[820px]:hidden" />
      </Container>
    </>
  );
}
