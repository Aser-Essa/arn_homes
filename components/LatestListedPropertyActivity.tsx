import { getMyProperties } from "@/lib/queries/properties";
import React from "react";
import ProfileActivity from "./ProfileActivity";
import { Eye } from "lucide-react";
import { formatDateLong } from "@/lib/utils";

export default async function LatestListedPropertyActivity({
  userId,
}: {
  userId: string;
}) {
  let lastListedPropertyTitle = "";
  let lastListedPropertyDate = "";

  const { properties } = await getMyProperties({
    userId,
    category: "",
    status: "",
  });

  const sortedPropertes = properties.sort((a, b) => {
    return new Date(b.listed_in).getTime() - new Date(a.listed_in).getTime();
  });

  const lastListedProperty = sortedPropertes?.at(0);

  if (lastListedProperty) {
    lastListedPropertyTitle = lastListedProperty?.title || "";
    lastListedPropertyDate = lastListedProperty?.listed_in || "";
  }

  return (
    <>
      <ProfileActivity
        icon={<Eye className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />}
        title={"Recently Listed Property "}
        description={lastListedPropertyTitle || "No properties listed yet"}
        subtext={
          lastListedPropertyDate
            ? formatDateLong(lastListedPropertyDate)
            : "No date available"
        }
      />
    </>
  );
}
