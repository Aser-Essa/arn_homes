import { cn, formatPrice, formatTimeAgo } from "@/lib/utils";
import { Property } from "@/types/types";
import { IoCalendar } from "react-icons/io5";
import ToogleFavorite from "./ToogleFavorite";
import PropertyInfoStats from "./PropertyInfoStats";

type PropertyInfoCardType = {
  property: Property;
};

export default function PropertyInfoCard({ property }: PropertyInfoCardType) {
  const {
    state_address,
    price,
    property_type,
    listed_in,
    bedNumber,
    bathNumber,
    description,
  } = property;

  return (
    <>
      <div className={cn("flex-1 space-y-5 text-nowrap p-5")}>
        <div className="absolute right-5 top-5">
          <ToogleFavorite className="bg-shades-off-white" />
        </div>
        <p className={cn("!mt-0 text-[36px] font-semibold")}>
          {formatPrice(price)}
        </p>
        <div className="space-y-1">
          <p className="text-[28px] font-semibold text-scooter-900">
            {property_type}
          </p>
          <p>{state_address}</p>
        </div>
        <p className="line-clamp-2 text-wrap">{description}</p>
        <div className="flex items-center gap-1">
          <IoCalendar className="h-4 w-4" />
          <p className="text-sm leading-5">Listed {formatTimeAgo(listed_in)}</p>
        </div>
        <PropertyInfoStats
          bedNumber={bedNumber}
          bathNumber={bathNumber}
          isCard={true}
        />
      </div>
    </>
  );
}
