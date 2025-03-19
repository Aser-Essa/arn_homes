import React from "react";
import Container from "./Container";
import HerosectionBG from "./HerosectionBG";

export default function HeroSection() {
  return (
    <>
      <Container className="relative flex h-[582px] w-full items-center">
        <div className="z-[100] space-y-5 font-league_spartan text-shades-white">
          <p className="text-[48px] font-extrabold leading-[50px] sm:text-[60px] sm:leading-[66px] md:text-[80px] md:leading-[88px]">
            Discover Your <br /> Dream Home
          </p>
          <p className="text-[26px] font-semibold leading-[28px] sm:text-[28px] sm:leading-[30px] md:text-[32px] md:leading-[35.5px]">
            Your one-stop real estate destination for buying,
            <br className="hidden sm:block" /> renting, and selling properties.
          </p>
        </div>
        <HerosectionBG />
      </Container>
    </>
  );
}
