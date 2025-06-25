import React from "react";
import Container from "./Container";
import SupscripeNewsLetter from "./SupscripeNewsLetter";
import Image from "next/image";
import { Separator } from "./ui/separator";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <Container className="relative pt-[18px] font-exo">
        <Image
          src={"/BuildingIllustration.png"}
          fill
          alt="BuildingIllustration"
          className="z-[-10]"
        />
        <div className="absolute left-0 top-0 z-[-1] h-full w-full bg-shades-black opacity-95"></div>
        <SupscripeNewsLetter />
        <div className="space-y-14 py-4">
          <div className="flex flex-wrap items-start justify-between gap-[43px]">
            <ul className="space-y-6 font-semibold text-shades-white">
              <li>
                <Link href={"/account/add_property"}>Sell your property</Link>
              </li>
              <li>
                <Link href={"/account/add_property"}>Let your property</Link>
              </li>
              <li>
                <Link href={"/account/add_property"}>Invest your property</Link>
              </li>
            </ul>

            <ul className="space-y-6 font-semibold text-shades-white">
              <li>
                <Link href={"/properties/rent"}>Rent a property</Link>
              </li>
              <li>
                <Link href={"/properties/sale"}>Buy a property</Link>
              </li>
              <li>
                <Link href={"/properties/invest"}>Invest in a property</Link>
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
                href="https://www.facebook.com/profile.php?id=61577868894129"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
              >
                <FaFacebookF className="h-5 w-5" />
              </Link>
              <Link
                href="/https://www.linkedin.com/in/asser-essa-a03407341/"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
              >
                <FaYoutube className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/asser_essa_/"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-end font-medium leading-none text-shades-white">
              &copy; 2025 Arn Homes Limited. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
