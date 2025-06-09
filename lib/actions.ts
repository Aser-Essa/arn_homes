"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { supabase } from "./supabase";
import { updateUserAvatar } from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ScheduleFormDataType = {
  user_id: string | undefined;
  name: string;
  phone: string;
  property_id: string;
  scheduled_date: Date;
  scheduled_time: string;
};

type sectionSchema = {
  title: string;
  points: string[];
};

type PropertyData = {
  user_id: string;
  id: string;
  title: string;
  address: string;
  bed_number: number;
  bath_number: number;
  area: number;
  description: string;
  property_type: string;
  category: string;
  listed_in: string;
  state: string;
  exterior: sectionSchema[];
  interior: sectionSchema[];
  images: string[];
  floor_plan: string;
  status: string;
  extras?: {
    is_furnished?: boolean;
    price?: number;
    deposit_amount?: number;
    expected_roi?: number;
    minimum_investment?: number;
    monthly_rent?: number;
    lease_term?: string;
    investment_term?: string;
    investment_type?: string;
  };
};

type updatePropertyType = {
  propertyId: string;
  updatedData: Partial<PropertyData>;
};

export async function scheduleTour(tour_data: ScheduleFormDataType) {
  const { data, error } = await supabase
    .from("scheduled_tours")
    .insert(tour_data)
    .select();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createOrUpdateProperty(property_data: PropertyData) {
  const { data, error } = await supabase
    .from("properties")
    .upsert([property_data])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProperty({
  updatedData,
  propertyId,
}: updatePropertyType) {
  const { data, error } = await supabase
    .from("properties")
    .update(updatedData)
    .eq("id", propertyId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateUserAvatarAction(imageUrl: string) {
  let { userId } = await auth();
  userId = userId ? String(userId) : "";

  if (!userId || !imageUrl) return;

  await updateUserAvatar({
    userId,
    avatar: imageUrl,
  });

  const client = await clerkClient();

  await client.users.updateUser(userId, {
    publicMetadata: {
      imageUrl,
    },
  });

  revalidatePath("/account/profile");
}

export async function updateSceduleTourStauts({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const { error } = await supabase
    .from("scheduled_tours")
    .upsert({ id, status })
    .select();

  if (error) {
    throw new Error(error?.message);
  }
  revalidatePath("/messages/scheduled_tour");
  redirect("/account/messages?message_category=scheduled_tours");
}
