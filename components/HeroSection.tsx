import React from "react";
import Container from "./Container";
import HerosectionBG from "./HerosectionBG";

export default function HeroSection() {
  return (
    <>
      <Container className="relative flex h-[582px] w-full items-center">
        <div className="font-league_spartan z-[100] space-y-5 text-shades-white">
          <p className="text-[80px] font-extrabold leading-[88px]">
            Discover Your <br /> Dream Home
          </p>
          <p className="text-[32px] font-semibold leading-[35.5px]">
            Your one-stop real estate destination for buying,
            <br /> renting, and selling properties.
          </p>
        </div>
        <HerosectionBG />
      </Container>
    </>
  );
}
