"use server";
import { supabase } from "../supabase";
import { isPropertySaved } from "../queries/favorites";

export async function saveProperty(data: {
  user_id: string;
  property_id: string;
  category?: string;
}) {
  const { error } = await supabase
    .from("saved_properties")
    .insert(data)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteSavedProperty({
  user_id,
  property_id,
}: {
  user_id: string;
  property_id: string;
}) {
  const { error } = await supabase
    .from("saved_properties")
    .delete()
    .eq("user_id", user_id)
    .eq("property_id", property_id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function toogleFavorite({
  user_id,
  property_id,
  category,
}: {
  user_id: string;
  property_id: string;
  category?: string;
}) {
  const isSaved = await isPropertySaved({ user_id, property_id });

  if (isSaved) {
    await deleteSavedProperty({ user_id, property_id });
  } else {
    await saveProperty({ user_id, property_id, category });
  }
  return !isSaved;
}
