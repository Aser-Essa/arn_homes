import UserPropertyCard from "./UserPropertyCard";
import { getMyProperties } from "@/lib/data-service";
import { params } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type UserPropertyCardsType = {
  params: params;
};

export default async function UserPropertyCards({
  params,
}: UserPropertyCardsType) {
  const { userId } = await auth();

  if (!userId) {
    toast.error("User not authenticated");
    redirect("/sign-in");
  }

  const { status, category } = params;

  const { properties } = await getMyProperties({
    userId,
    status: status ? String(status) : "active",
    category: category ? String(category) : "sale",
  });

  return (
    <div className="mb-32 mt-5 space-y-5">
      {properties?.map((property, idx) => (
        <UserPropertyCard key={`${property.id}${idx}`} property={property} />
      ))}
    </div>
  );
}
