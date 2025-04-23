import { params } from "@/types/types";
import PropertyStatusCardList from "./PropertyStatusCardList";
import MyPropertiesHeader from "./MyPropertiesHeader";

type MyPropertiesSelectionType = {
  params: params;
};

export default function MyPropertiesSelection({
  params,
}: MyPropertiesSelectionType) {
  const { property_category } = params;

  return (
    <div className="mt-10 space-y-4">
      <MyPropertiesHeader params={params} />
      <PropertyStatusCardList
        category={property_category ? String(property_category) : "sale"}
      />
    </div>
  );
}
