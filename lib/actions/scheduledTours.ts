"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createTourConfirmationNotification,
  createTourRequestNotification,
} from "../notification-helpers";
import { supabase } from "../supabase";

type ScheduleFormDataType = {
  user_id: string | undefined;
  name: string;
  phone: string;
  property_id: string;
  scheduled_date: Date;
  scheduled_time: string;
  propertyTitle: string;
  visitorName: string;
  owner_id: string;
};

export async function scheduleTour(tour_data: ScheduleFormDataType) {
  const { propertyTitle, visitorName, ...insertData } = tour_data;

  const { data, error } = await supabase
    .from("scheduled_tours")
    .insert(insertData)
    .select();

  if (error) {
    return { data: null, error: error.message };
  }

  const { scheduled_date, owner_id } = insertData;

  const tourId = data?.at(0)?.id;

  await createTourRequestNotification({
    owner_id,
    visitorName,
    propertyTitle,
    tourDate: scheduled_date.toISOString(),
    tourId: tourId || "",
  });

  return { data, error: null };
}

export async function updateSceduleTourStauts(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as "confirmed" | "cancelled";
  const visitorUserId = formData.get("visitorUserId") as string;
  const propertyTitle = formData.get("propertyTitle") as string;
  const scheduledDate = formData.get("scheduledDate") as string;

  const { error } = await supabase
    .from("scheduled_tours")
    .upsert({ id, status })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  await createTourConfirmationNotification({
    visitorUserId,
    propertyTitle,
    tourDate: scheduledDate,
    status,
    tourId: id,
  });

  revalidatePath("/messages/scheduled_tour");
  redirect("/account/messages?message_category=scheduled_tours");
}

// export async function updateSceduleTourStauts({
//   scheduledTour,
//   status,
// }: {
//   scheduledTour: ScheduledTourData;
//   status: "confirmed" | "cancelled";
// }) {
//   const {
//     id,
//     user_id: visitorUserId,
//     properties,
//     scheduled_date,
//   } = scheduledTour;
//   const { title: propertyTitle } = properties || {};

//   const { error } = await supabase
//     .from("scheduled_tours")
//     .upsert({ id, status })
//     .select();

//   if (error) {
//     throw new Error(error?.message);
//   }

//   createTourConfirmationNotification({
//     visitorUserId,
//     propertyTitle,
//     tourDate: scheduled_date,
//     status,
//     tourId: id,
//   });

//   revalidatePath("/messages/scheduled_tour");
//   redirect("/account/messages?message_category=scheduled_tours");
// }
