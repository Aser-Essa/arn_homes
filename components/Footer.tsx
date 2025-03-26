import React from "react";
import Container from "./Container";
import SupscripeNewsLetter from "./SupscripeNewsLetter";
import Image from "next/image";
import { Separator } from "./ui/separator";

import { FiFacebook } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { LiaYoutube } from "react-icons/lia";
import { CiInstagram } from "react-icons/ci";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <Container className="relative mt-[80px] pt-[18px] font-exo">
        <Image
          src={"/BuildingIllustration.png"}
          fill
          alt="BuildingIllustration"
          className="z-[-10]"
        />
        <div className="absolute left-0 top-0 z-[-1] h-full w-full bg-shades-black opacity-95"></div>
        <SupscripeNewsLetter />
        <div className="space-y-14">
          <div className="flex flex-wrap items-start justify-between gap-[43px]">
            <ul className="space-y-6 font-semibold text-shades-white">
              <li>
                <Link href={"/"}>Sell your property</Link>
              </li>
              <li>
                <Link href={"/"}>Let your property</Link>
              </li>
              <li>
                <Link href={"/"}>Invest your property</Link>
              </li>
            </ul>

            <ul className="space-y-6 font-semibold text-shades-white">
              <li>
                <Link href={"/"}>Rent a property</Link>
              </li>
              <li>
                <Link href={"/"}>Buy a property</Link>
              </li>
              <li>
                <Link href={"/"}>Invest in a property</Link>
              </li>
            </ul>

            <ul className="space-y-6 font-semibold text-shades-white">
              <li>
                <Link href={"/"}>About us</Link>
              </li>
              <li>
                <Link href={"/"}>Contact us</Link>
              </li>
            </ul>

            <ul className="space-y-6 font-semibold text-shades-white">
              <li>
                <Link href={"/"}>Privacy policy</Link>
              </li>
              <li>
                <Link href={"/"}>Terms of use</Link>
              </li>
            </ul>
          </div>
          <Separator className="bg-gray-400" />
          <div className="space-y-4">
            <div className="flex items-center justify-end gap-6">
              <Link
                href={"/"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
              >
                <FiFacebook className="h-6 w-6" />
              </Link>

              <Link
                href={"/"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
              >
                <SlSocialLinkedin className="h-6 w-6" />
              </Link>

              <Link
                href={"/"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
              >
                <LiaYoutube className="h-6 w-6" />
              </Link>

              <Link
                href={"/"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
              >
                <CiInstagram className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-end font-medium leading-[44px] text-shades-white">
              &copy; 2023 Arn Homes Limited. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
