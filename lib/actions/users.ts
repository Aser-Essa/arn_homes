"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "../supabase";

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

// export async function updateUserEmailAction(emailAddress: string) {
//   try {
//     let { userId } = await auth();
//     userId = userId ? String(userId) : "";

//     if (!userId) {
//       throw new Error("User not authenticated");
//     }

//     const client = await clerkClient();
//     const user = await client?.users.getUser(userId);

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const userEmailAddresses =
//       user?.emailAddresses?.map((email) => email.emailAddress) || [];

//     if (userEmailAddresses?.includes(emailAddress)) {
//       throw new Error("Email address already exists");
//     }

//     // Store current primary email for cleanup
//     const currentPrimaryEmail = user.emailAddresses?.find(
//       (email) => email.primary,
//     );

//     const emailData = {
//       emailAddress,
//       userId: userId,
//     };

//     // Create new email address
//     const newEmail =
//       await client?.emailAddresses?.createEmailAddress(emailData);

//     if (!newEmail) {
//       throw new Error("Failed to create email address");
//     }

//     // Set new email as primary and verified
//     await client.emailAddresses.updateEmailAddress(newEmail.id, {
//       primary: true,
//       verified: true,
//     });

//     // Clean up old emails - wait for all deletions to complete
//     if (currentPrimaryEmail) {
//       try {
//         await client.emailAddresses.deleteEmailAddress(currentPrimaryEmail.id);
//       } catch (deleteError) {
//         console.error("Failed to delete old primary email:", deleteError);
//         // Don't throw here as the main operation succeeded
//       }
//     }

//     // Delete any unverified emails (using Promise.all to wait for completion)
//     const unverifiedEmails =
//       user.emailAddresses?.filter(
//         (email) => !email.verification?.status && email.id !== newEmail.id,
//       ) || [];

//     if (unverifiedEmails.length > 0) {
//       await Promise.allSettled(
//         unverifiedEmails.map((email) =>
//           client.emailAddresses.deleteEmailAddress(email.id),
//         ),
//       );
//     }
//   } catch (error) {
//     if (error?.message?.includes("Unprocessable Entity")) {
//       throw new Error("This email is already in use");
//     } else {
//       throw new Error(error?.message || "Failed to update email");
//     }
//   }

//   // Uncomment when ready to use
//   // revalidatePath("/account/profile");
// }

export async function deleteUser() {
  let { userId } = await auth();
  userId = userId ? String(userId) : "";
  const client = await clerkClient();
  await client?.users?.deleteUser(userId);

  const { error } = await supabase.from("users").delete().eq("id", userId);

  if (error) {
    throw new Error(error?.message);
  }

  revalidatePath("/");
  redirect("/");
}
