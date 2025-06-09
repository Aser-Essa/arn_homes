import type { User } from "@clerk/nextjs/server";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import EditProfileImage from "./EditProfileImage";
type ProfileHeaderType = { user: User };

export default async function ProfileHeader({ user }: ProfileHeaderType) {
  const firstName = user.firstName || user.fullName?.split(" ")[0] || "User";
  const userType = "Buyer";

  const userAvatar =
    user?.publicMetadata?.imageUrl || user.imageUrl || "/default-avatar.png";

  return (
    <>
      <div className="box-shadow mb-8 rounded-xl bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={String(userAvatar)}
                alt={`${firstName}'s profile`}
                width={80}
                height={80}
                className="aspect-square rounded-full border-4 border-white shadow-lg"
              />
              <EditProfileImage />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {firstName}!
              </h1>
              <div className="mt-2 flex items-center space-x-4">
                <p className="text-gray-600">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {userType}
                </span>
                <div className="flex items-center text-green-600">
                  <CheckCircle size={16} className="mr-1" />
                  <span className="text-sm">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
