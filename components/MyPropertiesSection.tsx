import { params } from "@/types/types";
import StatusBarWithCount from "./StatusBarWithCount";
import UserPropertyCards from "./UserPropertyCards";
import { auth } from "@clerk/nextjs/server";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type MyPropertiesSectionType = {
  params: params;
  propertyAction: (data: {
    userId: string;
    status?: string;
    category: string;
  }) => Promise<{ count: number | null }>;
  type: "my_properties" | "saved_properties";
};

export default async function MyPropertiesSection({
  params,
  propertyAction,
  type,
}: MyPropertiesSectionType) {
  const statuses = ["active", "reviewing", "declined", "inactive"];

  const { userId } = await auth();

  const { category, status } = params;

  if (!userId) {
    toast.error("User not authenticated");
    redirect("/sign-in");
  }

  const counts = Object.fromEntries(
    await Promise.all(
      statuses.map(async (status) => {
        const { count } = await propertyAction({
          userId,
          status: status,
          category: category ? String(category) : "sale",
        });
        return [[status], count];
      }),
    ),
  );

  const count = counts[status ? String(status) : "active"];

  return (
    <div className="mt-5">
      {type === "my_properties" && (
        <StatusBarWithCount params={params} count={count} />
      )}
      <UserPropertyCards
        params={params}
        propertyAction={propertyAction}
        type={type}
      />
    </div>
  );
}
