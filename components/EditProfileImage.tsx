"use client";
import DropzoneImageProvider from "@/context/DropzoneImageProvider";
import { UseSupabaseUploadReturn } from "@/hooks/use-supabase-upload";
import { useUser } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import { createContext } from "react";
import ProfileAvatarDropzone from "./ProfileAvatarDropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type DropzoneContextType = UseSupabaseUploadReturn;

export const DropzoneProfileAvatarContext = createContext<
  DropzoneContextType | undefined
>(undefined);

export default function EditProfileImage() {
  const { user } = useUser();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="absolute -bottom-1 -right-1 rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
            <Edit size={14} />
          </button>
        </DialogTrigger>

        <DialogContent className="max-h-[calc(100vh-100px)] overflow-y-scroll sm:max-w-max">
          <DialogHeader className="w-full">
            <DialogTitle className="capitalize">Change your avatar</DialogTitle>
            <DialogDescription>
              Upload a clear photo to personalize your profile. Click save to
              update your avatar.
            </DialogDescription>
          </DialogHeader>
          <DropzoneImageProvider
            bucketName={"users-avatars"}
            path={`/${user?.id}`}
            maxFiles={1}
            minFiles={1}
            maxFileSize={1000 * 1000 * 5}
            context={DropzoneProfileAvatarContext}
          >
            <ProfileAvatarDropzone />
          </DropzoneImageProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
