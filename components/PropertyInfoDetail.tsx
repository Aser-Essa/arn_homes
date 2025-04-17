import { cn, formatPrice, formatTimeAgo } from "@/lib/utils";
import { Property } from "@/types/types";
import { BsShareFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import ToogleFavorite from "./ToogleFavorite";
import PropertyInfoStats from "./PropertyInfoStats";
import PropertyActionButtons from "./PropertyActionButtons";

type PropertyInfoDetailType = {
  property: Property;
  card?: boolean;
};

export default function PropertyInfoDetail({
  property,
  card,
}: PropertyInfoDetailType) {
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
      <div className={cn("flex-1 space-y-5 text-nowrap", card && "p-5")}>
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
        <p className={cn("text-[36px] font-semibold", card && "!mt-0")}>
          {formatPrice(price)}
        </p>
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

        <PropertyInfoStats bedNumber={bedNumber} bathNumber={bathNumber} />
        <PropertyActionButtons />
      </div>
    </>
  );
}
