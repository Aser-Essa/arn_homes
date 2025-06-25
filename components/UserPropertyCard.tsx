import { Property } from "@/types/types";
import ImagesSlider from "./ImagesSlider";
import UserPropertyInfoCard from "./UserPropertyInfoCard";
import { BsArrowUpRight } from "react-icons/bs";

type UserPropertyCardType = {
  property: Property;
  type: "my_properties" | "saved_properties";
  showCenterButtonIcon: boolean;
};

export default function UserPropertyCard({
  property,
  type,
  showCenterButtonIcon,
}: UserPropertyCardType) {
  const { images } = property;

  return (
    <div className="box-shadow relative flex aspect-[1010/246] h-[110px] w-full overflow-hidden rounded-xl sm:h-[246px] sm:rounded-[20px]">
      <ImagesSlider
        images={images}
        centerButtonIcon={
          showCenterButtonIcon && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-shades-white">
              <BsArrowUpRight className="h-6 w-6" />
            </div>
          )
        }
      />
      <UserPropertyInfoCard property={property} type={type} />
    </div>
  );
}
