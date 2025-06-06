import { cn, formatPrice, formatTimeAgo } from "@/lib/utils";
import { Property } from "@/types/types";
import { BsShareFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import ToogleFavorite from "./ToogleFavorite";
import PropertyInfoStats from "./PropertyInfoStats";
import PropertyActionButtons from "./PropertyActionButtons";
import { isPropertySaved } from "@/lib/data-service";
import { auth } from "@clerk/nextjs/server";

type PropertyInfoDetailType = {
  property: Property;
  card?: boolean;
};

export default async function PropertyInfoDetail({
  property,
  card,
}: PropertyInfoDetailType) {
  const {
    id,
    address,
    property_type,
    listed_in,
    extras,
    bed_number,
    bath_number,
    category,
  } = property;

  const { price, monthly_rent } = extras || {};

  const { userId } = await auth();

  const isSaved = await isPropertySaved({
    user_id: userId ? String(userId) : "",
    property_id: id,
  });

  return (
    <>
      <div className={cn("flex-1 space-y-5 text-nowrap", card && "p-5")}>
        <div className="flex h-[70px] items-center justify-between">
          <div className="flex h-[26px] w-[77px] items-center justify-center gap-1 rounded-full bg-shades-off-white p-1 pr-2">
            <div className="h-2 w-2 rounded-full bg-scooter-600"></div>
            <p className="text-xs">For {category}</p>
          </div>
          <div className="flex items-center gap-5">
            <div
              className={
                "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white"
              }
            >
              <BsShareFill />
            </div>
            <ToogleFavorite
              className="bg-shades-off-white"
              isSaved={isSaved}
              property_id={id}
              category={category}
            />
          </div>
        </div>
        <p className={cn("text-[36px] font-semibold", card && "!mt-0")}>
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
        <div className="flex items-center gap-1">
          <IoCalendar className="h-4 w-4" />
          <p className="text-sm leading-5">Listed {formatTimeAgo(listed_in)}</p>
        </div>

        <PropertyInfoStats bedNumber={bed_number} bathNumber={bath_number} />
        <PropertyActionButtons property_id={id} />
      </div>
    </>
  );
}
