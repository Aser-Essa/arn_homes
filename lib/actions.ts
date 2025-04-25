"use server";
import { supabase } from "./supabase";

type ScheduleFormDataType = {
  user_id: string | undefined;
  name: string;
  phone: string;
  property_id: string;
  scheduled_date: Date;
  scheduled_time: string;
};

export async function scheduleTour(tour_data: ScheduleFormDataType) {
  const { data, error } = await supabase
    .from("scheduled_tours")
    .insert([tour_data])
    .select();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
