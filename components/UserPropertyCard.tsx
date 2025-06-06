import { Property } from "@/types/types";
import Image from "next/image";
import { BsCardImage } from "react-icons/bs";
import UserPropertyInfoCard from "./UserPropertyInfoCard";

type UserPropertyCardType = {
  property: Property;
  type: "my_properties" | "saved_properties";
};

export default function UserPropertyCard({
  property,
  type,
}: UserPropertyCardType) {
  const { images } = property;

  return (
    <div className="box-shadow relative flex aspect-[1010/246] h-[110px] w-full overflow-hidden rounded-xl sm:h-[246px] sm:rounded-[20px]">
      <div className="relative w-full max-sm:min-w-[29%] max-sm:max-w-[29%] sm:flex-1">
        <Image
          src={images?.at(0) ?? "/HerosectionBG2.jpg"}
          fill
          alt="image"
          className="rounded-l-xl sm:rounded-l-[20px]"
        />
        <div className="absolute bottom-4 right-4 z-[1000] hidden h-[32px] items-center justify-center gap-1 rounded-xl bg-shades-white px-2 py-1 text-sm sm:flex">
          <BsCardImage />
          {1}/{images?.length}
        </div>
      </div>

      <UserPropertyInfoCard property={property} type={type} />
    </div>
  );
}
