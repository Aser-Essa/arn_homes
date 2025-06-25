import { params, Property } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import toast from "react-hot-toast";
import UserPropertyCard from "./UserPropertyCard";

type SavedProperty = {
  id: string;
  property_id: string;
  properties: Property;
};

type MixedProperty = Property | SavedProperty;

type UserPropertyCardsType = {
  params: params;
  type: "my_properties" | "saved_properties";
  propertyAction: (data: {
    userId: string;
    status: string;
    category: string;
  }) => Promise<{ properties?: MixedProperty[]; count: number | null }>;
};

export default async function UserPropertyCards({
  params,
  propertyAction,
  type,
}: UserPropertyCardsType) {
  const { userId } = await auth();

  if (!userId) {
    toast.error("User not authenticated");
    redirect("/sign-in");
  }

  const { status, category } = params;

  const { properties } = await propertyAction({
    userId,
    status: status ? String(status) : "active",
    category: category ? String(category) : "sale",
  });

  if (!properties || properties.length === 0) {
    return (
      <div className="flex h-[calc(100vh-200px)] w-full items-center justify-center">
        <p className="text-shades-gray-500 text-lg font-semibold">
          No properties found
        </p>
      </div>
    );
  }

  return (
    <div className="mb-32 mt-5 space-y-5">
      {properties?.map((property, idx) => {
        const actualProperty =
          "properties" in property ? property.properties : property;
        return (
          <Fragment key={`${actualProperty.id}${idx}`}>
            {type === "my_properties" ? (
              <UserPropertyCard
                property={actualProperty}
                type={type}
                showCenterButtonIcon={false}
              />
            ) : (
              <Link
                href={`/property/${actualProperty?.id}`}
                target="_blank"
                className="relative inline-block"
              >
                <UserPropertyCard
                  property={actualProperty}
                  type={type}
                  showCenterButtonIcon={true}
                />
              </Link>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
