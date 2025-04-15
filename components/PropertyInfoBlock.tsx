import Image from "next/image";
import { Button } from "./ui/button";
import { formatPrice, formatTimeAgo } from "@/lib/utils";
import { BsShareFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import ToogleFavorite from "./ToogleFavorite";

type Property = {
  images: string[];
  state_address: string;
  price: number;
  property_type: string;
  listed_in: string;
  bedNumber: number;
  bathNumber: number;
};

type PropertyInfoBlockType = {
  property: Property;
};

export default function PropertyInfoBlock({ property }: PropertyInfoBlockType) {
  const {
    state_address,
    price,
    property_type,
    listed_in,
    bedNumber,
    bathNumber,
  } = property;

  return (
    <>
      <div className="flex-1 space-y-5 text-nowrap">
        <div className="flex h-[70px] items-center justify-between">
          <div className="flex h-[26px] w-[77px] items-center justify-center gap-1 rounded-full bg-shades-off-white p-1 pr-2">
            <div className="h-2 w-2 rounded-full bg-scooter-600"></div>
            <p className="text-xs">For sale</p>
          </div>
          <div className="flex items-center gap-5">
            <div
              className={
                "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white"
              }
            >
              <BsShareFill />
            </div>
            <ToogleFavorite className="bg-shades-off-white" />
          </div>
        </div>
        <p className="text-[36px] font-semibold">{formatPrice(price)}</p>
        <div className="space-y-1">
          <p className="text-[28px] font-semibold text-scooter-900">
            {property_type}
          </p>
          <p>{state_address}</p>
        </div>
        <div className="flex items-center gap-1">
          <IoCalendar className="h-4 w-4" />
          <p className="text-sm leading-5">Listed {formatTimeAgo(listed_in)}</p>
        </div>
        <div className="flex h-[56px] w-full items-center justify-between gap-2 rounded-xl bg-shades-off-white p-4 text-sm text-shades-black">
          <div className="mx-1 flex items-center gap-2">
            <Image
              src={"/icons/blackbed.svg"}
              width={20}
              height={14}
              alt="bed"
            />
            <p>{bedNumber} beds</p>
          </div>
          <div className="mx-1 flex items-center gap-2">
            <Image
              src={"/icons/blackshower.svg"}
              width={20}
              height={14}
              alt="bed"
            />
            <p>{bathNumber} baths</p>
          </div>
          <div className="mx-1 flex items-center gap-2">
            <Image
              src={"/icons/blackfurnished.svg"}
              width={20}
              height={14}
              alt="bed"
            />
            <p className="text-nowrap text-sm">Semi-furnished</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant={"outline"} className="h-[50px] w-full">
            <Image src={"/icons/call.svg"} width={24} height={24} alt="call" />
            Call
          </Button>
          <Button className="h-[50px] w-full">
            <Image
              src={"/icons/Direct messages.svg"}
              width={24}
              height={24}
              alt="Direct messages"
            />
            <p>Message</p>
          </Button>
        </div>
      </div>
    </>
  );
}
