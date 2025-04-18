import React from "react";
import Container from "./Container";
import { Button } from "./ui/button";
import NavLinks from "./NavLinks";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <Container
        className={
          "box-shadow relative z-[100000] flex h-[98px] items-center justify-between py-5 font-exo"
        }
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
        <FaBars className="h-6 w-6 cursor-pointer min-[820px]:hidden" />
      </Container>
    </>
  );
}
