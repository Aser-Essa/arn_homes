import { Property } from "@/types/types";
import { Separator } from "@radix-ui/react-separator";
import PropertyImagePreview from "./PropertyImagePreview";
import PropertyInfoDetail from "./PropertyInfoDetail";

type PropertyDetailsProps = {
  property: Property;
};

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const { images } = property;

  return (
    <>
      <div className="box-shadow hidden-box-shadow-on-mobile !mt-6 flex min-h-[403px] flex-wrap gap-5 rounded-[20px] font-exo sm:p-5">
        <PropertyImagePreview images={images} />
        <Separator
          orientation="vertical"
          className="hidden min-h-full w-[1px] bg-gray-50 2xl:block"
        />

        <PropertyInfoDetail property={property} />
      </div>
    </>
  );
}
