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
    .insert([tour_data])
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
  console.log(updatedData, propertyId);

  const { data, error } = await supabase
    .from("properties")
    .update(updatedData)
    .eq("id", propertyId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
