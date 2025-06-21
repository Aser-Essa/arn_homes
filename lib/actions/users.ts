"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../supabase";
import { auth, clerkClient } from "@clerk/nextjs/server";

type UserDataType = {
  id: string;
  full_name: string;
  email: string | null;
  avatar: string;
};

export async function createUser(userData: UserDataType) {
  try {
    const { error } = await supabase.from("users").upsert([userData]).single();

    if (error) {
      console.error("Failed to insert user:", error);
    } else {
      console.log("User inserted successfully");
    }
  } catch (err) {
    console.error("Unexpected error in createUser:", err);
  }
}

export async function updateUserAvatarAction(imageUrl: string) {
  let { userId } = await auth();
  userId = userId ? String(userId) : "";

  if (!userId || !imageUrl) return;

  const { error } = await supabase
    .from("users")
    .upsert({ id: userId, avatar: imageUrl })
    .select();

  if (error) {
    throw new Error(error?.message);
  }

  const client = await clerkClient();

  await client.users.updateUser(userId, {
    publicMetadata: {
      imageUrl,
    },
  });

  revalidatePath("/account/profile");
}
