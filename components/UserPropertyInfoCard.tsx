import { cn, formatPrice } from "@/lib/utils";
import { Property } from "@/types/types";
import IconText from "./IconText";
import PropertyInfoStats from "./PropertyInfoStats";
import UserPropertyCardControl from "./UserPropertyCardControl";
import ToogleFavorite from "./ToogleFavorite";
import { isPropertySaved } from "@/lib/queries/favorites";
import { auth } from "@clerk/nextjs/server";

type UserPropertyInfoCardType = {
  property: Property;
  type?: "my_properties" | "saved_properties";
};

export default async function UserPropertyInfoCard({
  property,
  type,
}: UserPropertyInfoCardType) {
  const {
    id: propertyId,
    category,
    title,
    property_type,
    bed_number,
    bath_number,
    extras,
    status,
  } = property;

  const { price, monthly_rent } = extras || {};

  let { userId } = await auth();
  userId = userId ? String(userId) : "";

  const PriceText =
    category == "rent"
      ? `${monthly_rent ? formatPrice(monthly_rent) : ""} / Month`
      : price
        ? formatPrice(price)
        : "";

  const isSaved = await isPropertySaved({
    user_id: userId,
    property_id: propertyId,
  });

  return (
    <>
      <div
        className={cn("flex-1 space-y-1 text-nowrap p-2 sm:space-y-5 sm:p-5")}
      >
        {type === "my_properties" ? (
          <UserPropertyCardControl propertyId={propertyId} status={status} />
        ) : (
          <ToogleFavorite
            property_id={propertyId}
            category={category}
            isSaved={isSaved}
            className="absolute right-5 top-5 bg-shades-off-white"
          />
        )}
        <p
          className={cn(
            "!mt-0 text-sm font-semibold sm:text-[36px] sm:leading-none",
          )}
        >
          {PriceText}
        </p>
        <div className="space-y-1">
          <p className="text-sm font-semibold leading-none text-scooter-900 sm:text-[28px]">
            {property_type}
          </p>
          <p className="text-sm sm:text-base">{title}</p>
        </div>
        <div className="hidden sm:block">
          <PropertyInfoStats
            bedNumber={bed_number}
            bathNumber={bath_number}
            isCard={false}
          />
        </div>
        <div className="flex items-center justify-between sm:hidden">
          <IconText icon={`/icons/blackbed.svg`} text={`${bed_number}`} />
          <IconText icon={`/icons/blackshower.svg`} text={`${bath_number}`} />
          <IconText
            icon={`/icons/blackfurnished.svg`}
            text={`Semi-furnished`}
          />
        </div>
      </div>
    </>
  );
}
