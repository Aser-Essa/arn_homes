import { params } from "@/types/types";
import StatusBarWithCount from "./StatusBarWithCount";
import UserPropertyCards from "./UserPropertyCards";

type MyPropertiesSectionType = {
  params: params;
};

export default function MyPropertiesSection({
  params,
}: MyPropertiesSectionType) {
  return (
    <div className="mt-5">
      <StatusBarWithCount params={params} />
      <UserPropertyCards />
    </div>
  );
}
