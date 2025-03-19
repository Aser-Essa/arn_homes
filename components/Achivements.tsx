import React from "react";
import Container from "./Container";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Achivements() {
  return (
    <>
      <Container className="relative mt-14 flex h-[331px] items-center justify-center font-exo">
        <Image
          src={"/BuildingIllustration.png"}
          fill
          alt="BuildingIllustration"
          className="z-[-10]"
        />
        <div className="absolute left-0 top-0 z-[-1] h-full w-full bg-shades-white opacity-95"></div>

        <div className="flex items-center space-x-[62px]">
          <div className="flex flex-col items-center">
            <p className="text-[48px] font-semibold text-scooter-700">
              13,000+
            </p>
            <p className="text-[28px]">Properties Listed</p>
          </div>
          <Separator
            orientation="vertical"
            className="h-[179px] bg-scooter-700"
          />
          <div className="flex flex-col items-center">
            <p className="text-[48px] font-semibold text-scooter-700">
              13,000+
            </p>
            <p className="text-[28px]">Properties Listed</p>
          </div>
          <Separator
            orientation="vertical"
            className="h-[179px] bg-scooter-700"
          />
          <div className="flex flex-col items-center">
            <p className="text-[48px] font-semibold text-scooter-700">
              13,000+
            </p>
            <p className="text-[28px]">Properties Listed</p>
          </div>
          <Separator
            orientation="vertical"
            className="h-[179px] bg-scooter-700"
          />
          <div className="flex flex-col items-center">
            <p className="text-[48px] font-semibold text-scooter-700">
              13,000+
            </p>
            <p className="text-[28px]">Properties Listed</p>
          </div>
        </div>
      </Container>
    </>
  );
}
