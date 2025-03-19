import React, { Fragment } from "react";
import Container from "./Container";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Stats() {
  const statsCards = [
    {
      number: "13,000+",
      label: "Properties Listed",
    },
    {
      number: "8,782+",
      label: "Property Sales",
    },
    {
      number: "5,014+",
      label: "Property Rented",
    },
    {
      number: "95.7%",
      label: "Satisfied Clients",
    },
  ];

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

        <div className="flex items-center justify-center gap-10 space-x-[clamp(14px,3.2vw,62px)] max-sm:flex-wrap sm:justify-normal sm:gap-0">
          {statsCards.map(({ number, label }) => (
            <Fragment key={label}>
              <div className="flex flex-col items-center">
                <p className="text-[clamp(22px,3vw,48px)] font-semibold text-scooter-700">
                  {number}
                </p>
                <p className="text-nowrap text-[clamp(18px,2vw,28px)]">
                  {label}
                </p>
              </div>
              <Separator
                orientation="vertical"
                className="h-[120px] bg-scooter-700 last:hidden max-sm:hidden md:h-[140px] lg:h-[179px]"
              />
            </Fragment>
          ))}
        </div>
      </Container>
    </>
  );
}
