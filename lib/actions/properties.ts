"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";
import { Property } from "@/types/types";

export async function createOrUpdateProperty(property_data: Property) {
  const { data, error } = await supabase
    .from("properties")
    .upsert([property_data])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProperty(formData: FormData): Promise<void> {
  const propertyId = formData.get("propertyId") as string;
  const updatedData = JSON.parse(formData.get("updatedData") as string);

  if (!propertyId || !updatedData) return;

  const { error } = await supabase
    .from("properties")
    .update(updatedData)
    .eq("id", propertyId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/account/properties");
}

export async function deleteMyProperty(formData: FormData) {
  const { userId } = await auth();
  const propertyId = formData.get("propertyId");

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", propertyId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/account/properties");
}
