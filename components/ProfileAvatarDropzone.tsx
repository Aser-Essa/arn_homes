"use client";
import { useUser } from "@clerk/nextjs";
import { DropzoneProfileAvatarContext } from "./EditProfileImage";
import { Button } from "./ui/button";
import { useDropzoneContext } from "./ui/Dropzone";
import UploadImages from "./UploadImages";
import { updateUserAvatarAction } from "@/lib/actions";
import { DialogClose } from "./ui/dialog";
import toast from "react-hot-toast";

export default function ProfileAvatarDropzone() {
  const ProfileAvatarProps = useDropzoneContext(DropzoneProfileAvatarContext);

  const { user } = useUser();

  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users-avatars/${user?.id}`;

  async function handleClick() {
    try {
      const image = ProfileAvatarProps.acceptedFiles[0];
      if (!user || !image) return;
      const imageUrl = `${BASE_URL}/${image.name}`;
      await ProfileAvatarProps?.onUpload();
      await updateUserAvatarAction(imageUrl);
      toast.success("User avatar successfully changed");
    } catch {
      toast.error("Failed to update avatar. Please try again.");
    }
  }
  return (
    <div className="space-y-4">
      <UploadImages
        DropzoneContext={DropzoneProfileAvatarContext}
        title={""}
        className="!col-span-1"
      />
      <DialogClose className="w-full" asChild>
        <Button
          type="button"
          className="h-[40px] w-full rounded-lg"
          onClick={handleClick}
        >
          Save changes
        </Button>
      </DialogClose>
    </div>
  );
}
