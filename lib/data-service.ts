import { supabase } from "./supabase";

type PropertiesForSaleType = {
  bed_N?: string;
  bath_N?: string;
  min_Price?: string;
  max_Price?: string;
  price_Duration?: string;
  property_Type?: string;
  time_sort?: string | undefined;
};

export async function getHomesForSales(params: PropertiesForSaleType) {
  const { bed_N, bath_N, min_Price, max_Price, property_Type, time_sort } =
    params;

  const query = supabase.from("homes_for_sale").select("*");

  if (bed_N && bed_N !== "Any" && bed_N?.trim() !== "") {
    query.eq("bedNumber", bed_N);
  }

  if (bath_N && bath_N !== "Any" && bath_N?.trim() !== "") {
    query.eq("bathNumber", bath_N);
  }

  if (min_Price && min_Price !== "Any" && bath_N?.trim() !== "") {
    query.gte("price", Number(min_Price));
  }

  if (max_Price && max_Price !== "Any" && bath_N?.trim() !== "") {
    query.lte("price", Number(max_Price));
  }

  if (time_sort && time_sort !== "Any") {
    const days = Number(time_sort);
    if (!isNaN(days)) {
      const time = new Date();
      time.setDate(time.getDate() - days);
      query.gte("listed_in", time.toISOString());
    }
  }

  if (
    property_Type &&
    property_Type !== "Any" &&
    property_Type?.trim() !== ""
  ) {
    query.eq("propertytype", property_Type);
  }

  const { data, error } = await query;

  if (error) throw new Error(error?.message);

  return data;
}
