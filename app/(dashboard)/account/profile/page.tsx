import Container from "@/components/Container";
import ProfileActivityAndActions from "@/components/ProfileActivityAndActions";
import ProfileHeader from "@/components/ProfileHeader";
import StatsCards from "@/components/StatsCards";
import { currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const user = await currentUser();

  const userId = user?.id ? String(user?.id) : "";

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Please sign in
          </h2>
          <p className="mt-2 text-gray-600">
            You need to be signed in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Container className="w-full !px-4 !py-6 md:h-[946px] md:w-[76vw] md:overflow-y-scroll md:!p-10">
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl">
          <ProfileHeader user={user} />
          <StatsCards userId={userId} />
          <ProfileActivityAndActions />
        </div>
      </div>
    </Container>
  );
}
