import { auth } from "@clerk/nextjs/server";
import LatestListedPropertyActivity from "./LatestListedPropertyActivity";
import LatestMessageActivity from "./LatestMessageActivity";
import LatestTourActivity from "./LatestTourActivity";
import ProfileActivitySkeleton from "./ProfileActivitySkeleton";

export default async function RecentActivity() {
  let { userId } = await auth();

  userId = userId ? String(userId) : "";

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
            <LatestListedPropertyActivity userId={userId} />
            <LatestMessageActivity userId={userId} />
            <LatestTourActivity userId={userId} />
          </div>
        )}
      </div>
    </>
  );
}
