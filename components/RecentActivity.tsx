import { Clock, Eye } from "lucide-react";
import LatestMessageActivity from "./LatestMessageActivity";
import ProfileActivity from "./ProfileActivity";
import ProfileActivitySkeleton from "./ProfileActivitySkeleton";
import { getMyProperties } from "@/lib/queries/properties";
import { auth } from "@clerk/nextjs/server";
import { formatDateLong } from "@/lib/utils";

export default async function RecentActivity() {
  let { userId } = await auth();

  userId = userId ? String(userId) : "";

  const { properties } = await getMyProperties({
    userId,
    category: "",
    status: "",
  });

  const sortedPropertes = properties.sort((a, b) => {
    return new Date(b.listed_in).getTime() - new Date(a.listed_in).getTime();
  });

  const lastListedPropertyTitle = sortedPropertes?.at(0)?.title || "";
  const lastListedPropertyDate = sortedPropertes?.at(0)?.listed_in || "";

  const nextTour = "Tomorrow at 3:00 PM";

  const loading = false;

  return (
    <>
      <div className="box-shadow rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Recent Activity
        </h2>

        {loading ? (
          <ProfileActivitySkeleton />
        ) : (
          <div className="space-y-4">
            <ProfileActivity
              icon={
                <Eye className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              }
              title={"Recently Listed Property "}
              description={lastListedPropertyTitle}
              subtext={formatDateLong(lastListedPropertyDate)}
            />

            <LatestMessageActivity />

            <ProfileActivity
              icon={
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
              }
              title={"Next Tour"}
              description={nextTour}
              subtext={"Luxury Condo Downtown"}
            />
          </div>
        )}
      </div>
    </>
  );
}
