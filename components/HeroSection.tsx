import Image from "next/image";
import React from "react";
import Container from "./Container";
import BreadcrumpCustom from "./BreadcrumpCustom";

import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";

type HeroSectionType = {
  title: string;
  slogan: string;
  breadCrumpTitle: string;
};

export default function HeroSection({
  title,
  slogan,
  breadCrumpTitle,
}: HeroSectionType) {
  return (
    <Container className="relative overflow-hidden bg-scooter-50 py-8 font-exo md:pb-10">
      <Image
        src={"/BuildingIllustration.png"}
        fill
        alt="HeroSection"
        className="!left-[80%] md:!left-[max(50vw,50%)]"
      />
      <div className="relative z-[1000] w-[95%] space-y-10 pb-20 sm:w-[90%]">
        <BreadcrumpCustom>
          <BreadcrumbItem>
            <BreadcrumbPage>{breadCrumpTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumpCustom>
        <div className="space-y-2">
          <p className="text-[clamp(38px,6vw,64px)] font-bold leading-[min(auto,88px)]">
            {title}
          </p>
          <p className="text-[clamp(20px,3vw,28px)] font-semibold leading-[min(auto,36px)]">
            {slogan}
          </p>
        </div>
      </div>
    </Container>
  );
}
