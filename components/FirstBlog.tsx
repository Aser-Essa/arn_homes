import Image from "next/image";
import React from "react";
import Container from "./Container";

type FirstBlogType = {
  image: string;
};

export default function FirstBlog({ image }: FirstBlogType) {
  return (
    <Container>
      <div className="box-shadow relative mt-1.5 hidden rounded-[20px] md:flex">
        {/* aspect-[605/496] */}
        <div className="relative w-full flex-1">
          <Image src={image} fill alt="image" className="rounded-l-[20px]" />
        </div>
        <div className={"flex-1 space-y-5 p-6"}>
          <p className="text-[36px] font-semibold leading-[44px]">
            Which properties are selling best right now?{" "}
          </p>
          <p className="line-clamp-[9]">
            Explore the hottest property trends in the UK! From charming urban
            flats to serene countryside estates, our latest blog dives into the
            top-selling properties that are capturing buyers&apos; hearts.
            Discover what makes these homes stand out in the competitive market,
            and find your own slice of British real estate. Unlock the secrets
            behind the UK&apos;s most in-demand properties. Our blog article
            shines a spotlight on the homes that are redefining the real estate
            scene. Join us on this exploration as we dissect the essence of
            their desirability. Unearth the magic behind UK&apos;s
            most-talked-about properties. Our blog delv...
          </p>
          <div className="flex max-h-20 min-h-20 items-center gap-2.5">
            <Image src={"/avatar (1).png"} width={80} height={80} alt="" />
            <div className="text-xl">
              <p className="font-semibold">Guy Hawkins</p>
              <p className="text-shades-grey">Jun 21, 2021</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
