import { Separator } from "@radix-ui/react-separator";
import PropertyImagePreview from "./PropertyImagePreview";
import PropertyInfoBlock from "./PropertyInfoBlock";

type Property = {
  images: string[];
  state_address: string;
  price: number;
  property_type: string;
  listed_in: string;
  bedNumber: number;
  bathNumber: number;
};

type PropertyDetailsProps = {
  property: Property;
};

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const { images } = property;

  return (
    <>
      <div className="box-shadow mt-6 flex min-h-[403px] space-x-5 rounded-[20px] p-5 font-exo">
        <PropertyImagePreview images={images} />
        <Separator
          orientation="vertical"
          className="min-h-full w-[1px] bg-gray-50"
        />
        <PropertyInfoBlock property={property} />
      </div>
    </>
  );
}
