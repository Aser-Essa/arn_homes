import React from "react";
import Container from "./Container";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

export default function CompleteProfileBanner() {
  return (
    <>
      <Container className="relative h-[248px] w-full overflow-hidden bg-scooter-50 !px-4 !py-6 font-exo sm:h-[214px] sm:rounded-xl sm:!p-6">
        <div className="mb-6 flex h-[22px] w-fit cursor-pointer items-center gap-2 rounded-[8px] border-l-[5px] border-amber-600 bg-gray-900 py-[2px] pl-[11px] pr-4 font-exo text-xs text-shades-white transition-all hover:text-scooter-600 sm:rounded-xl md:hidden">
          <p>Dashboard</p>
        </div>
        <div className="absolute !left-[80%] bottom-0 h-[170px] w-[576px] md:!left-[max(42vw,50%)]">
          <Image src={"/BuildingIllustration.png"} fill alt="HeroSection" />
        </div>
        <div className="relative z-[1000] w-[95%] space-y-5 pb-20 sm:w-[90%]">
          <div className="space-y-2.5">
            <p className="text-[24px] font-bold sm:text-[clamp(30px,3vw,36px)]">
              Welcome to your account
            </p>
            <p className="text-[clamp(16px,1.5vw,18px)]">
              Complete your profile to seamlessly connect with property
              <br className="hidden lg:block" /> owners and do so much more.
            </p>
          </div>
          <button className="flex h-10 items-center gap-2 rounded-[50px] border-[1.5px] border-scooter-600 px-4 py-2 text-sm font-medium hover:bg-[#cdfffc7f] sm:text-base">
            <p>Complete profile</p>
            <IoIosArrowForward />
          </button>
        </div>
      </Container>
    </>
  );
}
