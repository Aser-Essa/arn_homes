import { supabase } from "../supabase";

export async function getScheduledTours(user_id: string) {
  const { data: scheduledTours, error } = await supabase
    .from("scheduled_tours")
    .select("*,properties(*)")
    .or(`user_id.eq.${user_id},owner_id.eq.${user_id}`);

  if (error) {
    throw new Error(error.message);
  }

  return { scheduledTours };
}

export async function getScheduledTour(id: string) {
  const { data: scheduledTour, error } = await supabase
    .from("scheduled_tours")
    .select("*,properties(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { scheduledTour };
}
