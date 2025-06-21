import { params } from "@/types/types";
import PropertyStatusCardList from "./PropertyStatusCardList";
import MyPropertiesHeader from "./MyPropertiesHeader";
import { getMyProperties } from "@/lib/queries/properties";

type MyPropertiesSelectionType = {
  params: params;
};

export default function MyPropertiesSelection({
  params,
}: MyPropertiesSelectionType) {
  const { category } = params;

  return (
    <div className="mt-10 space-y-4">
      <MyPropertiesHeader
        params={params}
        propertyAction={getMyProperties}
        title={"My properties"}
      />
      <PropertyStatusCardList category={category ? String(category) : "sale"} />
    </div>
  );
}
