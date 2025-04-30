"use server";
import { PropertyFormData } from "@/components/AddPropertyFormCard";
import { supabase } from "./supabase";

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
  isOpen: boolean;
};

type PropertyData = Omit<PropertyFormData, "exterior" | "interior"> & {
  images: string[];
  propertyId?: string;
  exterior: sectionSchema[];
  interior: sectionSchema[];
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

export async function insertProperty(property_data: PropertyData) {
  console.log(property_data);

  const { data, error } = await supabase
    .from("properties")
    .insert([property_data])
    .select();

  console.log(error);
  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
