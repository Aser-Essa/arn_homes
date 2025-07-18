import { changeEmailSchema } from "@/schemas/changeEmailSchema";
import { formSchema, sectionSchema } from "@/schemas/propertySchemas";
import { z } from "zod";

export type Property = {
  id: string;
  title: string;
  images: string[];
  address: string;
  bed_number: number;
  bath_number: number;
  area: number;
  description: string;
  property_type: string;
  category: string;
  listed_in: string;
  state: string;
  status?: string;
  user_id?: string;
  floor_plan?: string;
  extras: {
    price?: number;
    monthly_rent?: number;
    deposit_amount?: number;
    lease_term?: string;
    expected_roi?: number;
    minimum_investment?: number;
    investment_term?: string;
    investment_type?: string;
    furniture_type?: string;
  };
  exterior: Section[];
  interior: Section[];
};

export type Section = {
  title: string;
  points: string[];
};

export interface Paragraph {
  title: string;
  paragraph: string;
}

export type Review = {
  id: string;
  name: string;
  date: string;
  review: string;
  rating: number;
};

export interface Article {
  id: number;
  url: string;
  title: string;
  image: string;
  category: string[];
  date: string; // ISO format date string (can be parsed to Date or timestamptz)
  author: string;
  tags: string[];
  paragraphs: Paragraph[];
}

export type params = { [key: string]: string | string[] | undefined };

export type PropertyFormData = z.infer<typeof formSchema>;

export type features = z.infer<typeof sectionSchema>[];

export type User = {
  id: string;
  full_name: string;
  email: string;
  created_at?: string; // ISO date string
  avatar: string; // URL to avatar image
};

export type chat = {
  id: string;
  property_id: string;
  user_one: string;
  user_two: string;
};

export type message = {
  id: string; // UUID
  chat_id: string; // UUID
  sender_id: string; // user ID (text)
  content: string; // content of the message
  sent_at: string; // ISO timestamp
  status: "sent" | "delivered" | "read"; // message status
};

export interface ScheduledTourData {
  id: string;
  user_id: string;
  owner_id?: string;
  name: string;
  phone: string;
  scheduled_date: string;
  scheduled_time: string;
  created_at: string;
  property_id: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  properties: Property;
}

export interface NotificationData {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  type:
    | "message"
    | "property"
    | "tour"
    | "mortgage"
    | "saved_property"
    | "system";
  related_id: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: {
    message: number;
    property: number;
    tour: number;
    mortgage: number;
    saved_property: number;
    system: number;
  };
}

export type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;
