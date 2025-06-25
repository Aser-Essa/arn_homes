import { cn, formatPrice, formatTimeAgo } from "@/lib/utils";
import { Property } from "@/types/types";
import { IoCalendar } from "react-icons/io5";
import ToogleFavorite from "./ToogleFavorite";
import PropertyInfoStats from "./PropertyInfoStats";
import { auth } from "@clerk/nextjs/server";
import { isPropertySaved } from "@/lib/queries/favorites";

type PropertyInfoCardType = {
  property: Property;
};

export default async function PropertyInfoCard({
  property,
}: PropertyInfoCardType) {
  const {
    id,
    address,
    extras,
    property_type,
    listed_in,
    bed_number,
    bath_number,
    description,
    category,
  } = property;

  const { price, monthly_rent, furniture_type } = extras || {};

  const { userId } = await auth();

  const isSaved = await isPropertySaved({
    user_id: userId ? String(userId) : "",
    property_id: id,
  });

  return (
    <>
      <div className={cn("flex-1 space-y-5 text-nowrap p-5")}>
        <div className="absolute right-5 top-5">
          <ToogleFavorite
            className="bg-shades-off-white"
            isSaved={isSaved}
            property_id={id}
            category={category}
          />
        </div>
        <p className={cn("!mt-0 text-[36px] font-semibold")}>
          {category === "rent"
            ? `${formatPrice(Number(monthly_rent))}/Month`
            : formatPrice(Number(price))}
        </p>
        <div className="space-y-1">
          <p className="text-[28px] font-semibold text-scooter-900">
            {property_type}
          </p>
          <p>{address}</p>
        </div>
        <p className="line-clamp-2 text-wrap">{description}</p>
        <div className="flex items-center gap-1">
          <IoCalendar className="h-4 w-4" />
          <p className="text-sm leading-5">Listed {formatTimeAgo(listed_in)}</p>
        </div>
        <PropertyInfoStats
          bedNumber={bed_number}
          bathNumber={bath_number}
          isCard={true}
          furniture_type={
            furniture_type ? String(furniture_type) : "unfurnished"
          }
        />
      </div>
    </>
  );
}
