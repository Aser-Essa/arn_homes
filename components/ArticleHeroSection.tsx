import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiFacebook } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa6";

import { FaXTwitter } from "react-icons/fa6";
import CopyLinkButton from "./CopyLinkButton";
import Container from "./Container";
import BreadcrumbCustom from "./BreadcrumbCustom";
import { IoShareSocial } from "react-icons/io5";

type ArticleHeroSectionType = {
  title: string;
  image: string;
};

export default function ArticleHeroSection({
  title,
  image,
}: ArticleHeroSectionType) {
  const pathArray = [
    {
      path: "Home",
      href: "/",
    },
    {
      path: "Blog",
      href: "/blog",
    },
    {
      path: title,
      type: "page",
    },
  ];

  return (
    <Container>
      <BreadcrumbCustom pathArray={pathArray} />
      <div className="relative mt-6 aspect-video h-[221px] w-full overflow-hidden rounded-[20px] sm:h-[400px]">
        <Image
          src={image}
          fill
          alt={"HeroSection Image"}
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 flex items-center gap-5 p-5 sm:hidden">
          <Link
            href={"/"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
          >
            <IoShareSocial className="h-5 w-5" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 hidden items-center gap-5 p-5 sm:flex">
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
            <FaXTwitter className="h-5 w-5" />
          </Link>

          <Link
            href={"/"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
          >
            <FaWhatsapp className="h-6 w-6" />
          </Link>

          <Link
            href={"/"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-shades-white"
          >
            <SlSocialLinkedin className="h-5 w-5" />
          </Link>

          <CopyLinkButton
            className={
              "flex h-10 items-center justify-center gap-2 rounded-full bg-shades-white px-4 py-[7px] font-medium"
            }
          >
            <>
              <Image
                src={"/icons/chain.svg"}
                width={24}
                height={24}
                alt="chain"
              />
              <p>Copy link</p>
            </>
          </CopyLinkButton>
        </div>
      </div>
    </Container>
  );
}
