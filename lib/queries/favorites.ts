import { supabase } from "../supabase";

export async function getSavedProperties({
  userId,
  category,
}: {
  category?: string;
  userId: string;
}) {
  let query = supabase
    .from("saved_properties")
    .select("*, properties(*)", { count: "exact" })
    .eq("user_id", userId);

  if (category) {
    query = query.eq("category", category);
  }

  const { data: properties, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { properties, count };
}

export async function isPropertySaved({
  user_id,
  property_id,
}: {
  user_id: string;
  property_id: string;
}) {
  const { data: savedProperty, error } = await supabase
    .from("saved_properties")
    .select("*")
    .eq("user_id", user_id)
    .eq("property_id", property_id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return !!savedProperty;
}
