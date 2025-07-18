import { isPropertySaved } from "@/lib/queries/favorites";
import { cn, formatPrice, formatTimeAgo } from "@/lib/utils";
import { Property } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { IoCalendar } from "react-icons/io5";
import CopyLinkButton from "./CopyLinkButton";
import PropertyActionButtons from "./PropertyActionButtons";
import PropertyInfoStats from "./PropertyInfoStats";
import ToogleFavorite from "./ToogleFavorite";

type PropertyInfoDetailType = {
  property: Property;
  card?: boolean;
};

type colorsBasedCategoryType = {
  sale: string;
  rent: string;
  investment: string;
};

const colorsBasedCategory: colorsBasedCategoryType = {
  sale: "scooter-600",
  rent: "amber-600",
  investment: "blue-600",
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

  const { price, monthly_rent, furniture_type } = extras || {};

  const { userId } = await auth();

  const isSaved = await isPropertySaved({
    user_id: userId ? String(userId) : "",
    property_id: id,
  });

  return (
    <>
      <div className={cn("flex-1 space-y-5 text-nowrap", card && "p-5")}>
        <div className="flex h-[70px] items-center justify-between">
          <div className="p flex h-[26px] items-center justify-center gap-1 rounded-full bg-shades-off-white p-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                `bg-${colorsBasedCategory[category as keyof colorsBasedCategoryType]}`,
              )}
            ></div>
            <p className="text-xs">For {category}</p>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <CopyLinkButton className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white">
                <Image
                  src={"/icons/chain.svg"}
                  width={24}
                  height={24}
                  alt="chain"
                />
                {/* <BsShareFill /> */}
              </CopyLinkButton>
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

        <PropertyInfoStats
          bedNumber={bed_number}
          bathNumber={bath_number}
          furniture_type={
            furniture_type ? String(furniture_type) : "unfurnished"
          }
        />
        <PropertyActionButtons property_id={id} />
      </div>
    </>
  );
}
