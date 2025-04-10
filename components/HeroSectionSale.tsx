import Image from "next/image";
import React from "react";
import Container from "./Container";
import BreadcrumpCustom from "./BreadcrumpCustom";

import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default function HeroSectionSale() {
  return (
    <Container className="relative overflow-hidden bg-scooter-50 py-8 font-exo md:py-10">
      <Image
        src={"/BuildingIllustration.png"}
        fill
        alt="HeroSection"
        className="!left-[80%] md:!left-[max(50vw,50%)]"
      />
      <div className="relative z-[1000] w-[95%] space-y-10 py-10 sm:w-[90%]">
        <BreadcrumpCustom>
          <BreadcrumbItem>
            <BreadcrumbPage>For Sale</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumpCustom>
        <div className="space-y-5">
          <p className="text-[clamp(38px,6vw,64px)] font-bold leading-[min(auto,88px)]">
            Properties for sale
          </p>
          <p className="text-[clamp(20px,3vw,28px)] font-semibold leading-[min(auto,36px)]">
            Search for the best houses for sale in your area.
          </p>
        </div>
      </div>
    </Container>
  );
}
