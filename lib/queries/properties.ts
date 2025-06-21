import { supabase } from "../supabase";
import { convertToMonthly } from "../utils";

type getMyPropertiesType = {
  userId: string;
  category?: string;
  status?: string;
};

type ParamsType = {
  bed_N?: string;
  bath_N?: string;
  min_Price?: string;
  max_Price?: string;
  price_Duration?: string;
  property_Type?: string;
  furniture_Type?: string;
  time_sort?: string | undefined;
  page?: string | undefined;
  state_address?: string;
};

type PropertiesType = {
  params?: ParamsType;
  perPage?: number;
  category?: string;
};

export async function getProperties({
  category = "sale",
  perPage = 9,
  params = {},
}: PropertiesType) {
  const {
    bed_N,
    bath_N,
    min_Price,
    max_Price,
    property_Type,
    time_sort,
    page,
    state_address,
    price_Duration,
  } = params;

  let pageNumber = Math.max(1, Number(page) || 1);
  let from = (pageNumber - 1) * perPage;
  let to = from + perPage - 1;

  const isValid = (val?: string) =>
    val && val.toLowerCase() !== "any" && val.trim() !== "";

  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("category", category);
  // .eq("status", "reviewing");

  if (isValid(bed_N)) query = query.eq("bed_number", bed_N);
  if (isValid(bath_N)) query = query.eq("bath_number", bath_N);

  if (isValid(min_Price) && category !== "rent") {
    query = query.gte("extras->>price", Number(min_Price));
  }

  if (isValid(max_Price) && category !== "rent") {
    query = query.lte("extras->>price", Number(max_Price));
  }

  if (category === "rent" && isValid(price_Duration)) {
    if (isValid(min_Price)) {
      query = query.gte(
        "extras->>monthly_rent",
        convertToMonthly(Number(min_Price), price_Duration),
      );
    }
    if (isValid(max_Price)) {
      query = query.lte(
        "extras->>monthly_rent",
        convertToMonthly(Number(max_Price), price_Duration),
      );
    }
  }

  if (isValid(property_Type)) query = query.eq("property_type", property_Type);

  if (isValid(time_sort)) {
    const days = Number(time_sort);
    if (!isNaN(days)) {
      const time = new Date();
      time.setDate(time.getDate() - days);
      query = query.gte("listed_in", time.toISOString());
    }
  }

  if (isValid(state_address)) {
    query = query.ilike("address", `%${state_address}%`);
  }

  const { count: totalCount, error: countError } = await query;
  if (countError) throw new Error(countError.message);

  const maxNumberOfPages = Math.ceil(Number(totalCount) / perPage);
  pageNumber = Math.min(pageNumber, maxNumberOfPages);
  from = (pageNumber - 1) * perPage;
  to = from + perPage - 1;

  const { data, count, error } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
}

export async function getProperty(id: string) {
  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error?.message);

  return { property };
}

export async function getMyProperties({
  userId,
  category = "sale",
  status = "active",
}: getMyPropertiesType) {
  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  if (category) {
    query = query.eq("category", category);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data: properties, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { properties, count };
}
