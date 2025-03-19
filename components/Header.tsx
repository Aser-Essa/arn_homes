import React from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <>
      <Container
        className={"flex h-[98px] items-center justify-between py-5 font-exo"}
      >
        <Link href={"/"} className="flex items-end gap-2 leading-4">
          <p className="text-xl font-semibold">Arn Homes</p>
          <Image src={"/Logo.svg"} width={47} height={47} alt="Logo" />
        </Link>
        <NavLinks />
        <Button className="h-[58px] px-6 py-4">Add Listing</Button>
      </Container>
    </>
  );
}
