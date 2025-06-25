import { Property } from "@/types/types";
import ImagesSlider from "./ImagesSlider";
import PropertyInfoCard from "./PropertyInfoCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BsArrowUpRight } from "react-icons/bs";

type HorizontalHomeCardType = {
  property: Property;
  className?: string;
};

export default function HorizontalHomeCard({
  property,
  className,
}: HorizontalHomeCardType) {
  const { images, id } = property;
  return (
    <Link href={`/property/${id}`} target="_blank">
      <div className="box-shadow relative flex rounded-[20px]">
        <div className={cn("relative aspect-video w-full flex-1", className)}>
          <ImagesSlider
            images={images}
            centerButtonIcon={
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-shades-white">
                <BsArrowUpRight className="h-6 w-6" />
              </div>
            }
          />
        </div>

        <PropertyInfoCard property={property} />
      </div>
    </Link>
  );
}
