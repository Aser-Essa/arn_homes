import UserPropertyCard from "./UserPropertyCard";
import { getPropertiesForSales } from "@/lib/data-service";

export default async function UserPropertyCards() {
  const { data: MyProperties } = await getPropertiesForSales({});

  return (
    <div className="mb-32 mt-5 space-y-5">
      {MyProperties?.map((property, idx) => (
        <UserPropertyCard key={`${property.id}${idx}`} property={property} />
      ))}
    </div>
  );
}
