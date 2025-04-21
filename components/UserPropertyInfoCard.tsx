import React from "react";
import UserPropertyCardControl from "./UserPropertyCardControl";
import { cn, formatPrice } from "@/lib/utils";
import PropertyInfoStats from "./PropertyInfoStats";
import { Property } from "@/types/types";
import IconText from "./IconText";

type UserPropertyInfoCardType = {
  property: Property;
};

export default function UserPropertyInfoCard({
  property,
}: UserPropertyInfoCardType) {
  const { state_address, price, property_type, bedNumber, bathNumber } =
    property;

  return (
    <>
      <div
        className={cn("flex-1 space-y-1 text-nowrap p-2 sm:space-y-5 sm:p-5")}
      >
        <UserPropertyCardControl />
        <p
          className={cn(
            "!mt-0 text-sm font-semibold sm:text-[36px] sm:leading-none",
          )}
        >
          {formatPrice(price)}
        </p>
        <div className="space-y-1">
          <p className="text-sm font-semibold leading-none text-scooter-900 sm:text-[28px]">
            {property_type}
          </p>
          <p className="text-sm sm:text-base">{state_address}</p>
        </div>
        <div className="hidden sm:block">
          <PropertyInfoStats
            bedNumber={bedNumber}
            bathNumber={bathNumber}
            isCard={false}
          />
        </div>
        <div className="flex items-center justify-between sm:hidden">
          <IconText icon={`/icons/blackbed.svg`} text={`${bedNumber}`} />
          <IconText icon={`/icons/blackshower.svg`} text={`${bathNumber}`} />
          <IconText
            icon={`/icons/blackfurnished.svg`}
            text={`Semi-furnished`}
          />
        </div>
      </div>
    </>
  );
}
