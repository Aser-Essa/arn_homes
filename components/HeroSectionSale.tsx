import Image from "next/image";
import React from "react";
import Container from "./Container";
import BreadcrumpCustom from "./BreadcrumpCustom";

import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default function HeroSectionSale() {
  return (
    <Container className="relative h-[378px] bg-scooter-50 font-exo">
      <Image
        src={"/BuildingIllustration.png"}
        fill
        alt="HeroSection"
        className="!left-[47%]"
      />
      <div className="space-y-10 py-10">
        <BreadcrumpCustom>
          <BreadcrumbItem>
            <BreadcrumbPage>For Sale</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumpCustom>
        <div className="space-y-5">
          <p className="text-[64px] font-bold leading-[88px]">
            Properties for sale
          </p>
          <p className="text-[28px] font-semibold leading-[36px]">
            Search for the best houses for sale in your area.
          </p>
        </div>
      </div>
    </Container>
  );
}
