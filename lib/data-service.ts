import { supabase } from "./supabase";

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

type PropertiesForSaleType = {
  params?: ParamsType;
  perPage?: number;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

type UserDataType = {
  id: string;
  full_name: string;
  email: string | null;
  avatar: string;
};

export async function getPropertiesForSales({
  perPage = 9,
  params = {},
}: PropertiesForSaleType) {
  const {
    bed_N,
    bath_N,
    min_Price,
    max_Price,
    property_Type,
    time_sort,
    page,
    state_address,
  } = params;

  let pageNumber = Math.max(1, Number(page) || 1);
  let from = (pageNumber - 1) * perPage;
  let to = from + perPage - 1;

  const isValid = (val?: string) =>
    val && val.toLowerCase() !== "any" && val.trim() !== "";

  let query = supabase.from("homes_for_sale").select("*", { count: "exact" });

  if (isValid(bed_N)) query = query.eq("bedNumber", bed_N);
  if (isValid(bath_N)) query = query.eq("bathNumber", bath_N);
  if (isValid(min_Price)) query = query.gte("price", Number(min_Price));
  if (isValid(max_Price)) query = query.lte("price", Number(max_Price));
  if (isValid(property_Type)) query = query.eq("propertytype", property_Type);

  if (isValid(time_sort)) {
    const days = Number(time_sort);
    console.log(days);
    if (!isNaN(days)) {
      const time = new Date();
      time.setDate(time.getDate() - days);
      query = query.gte("listed_in", time.toISOString());
    }
  }

  if (isValid(state_address)) {
    query = query.ilike("state_address", `%${state_address}%`);
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
    .from("homes_for_sale")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error?.message);

  return { property };
}

export async function getCoordinates(
  locationInput: string,
): Promise<Coordinates | null> {
  if (!locationInput) return null;

  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY; // Make sure to define this in your .env file
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationInput)}&key=${apiKey}&limit=1`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("OpenCage API returned error:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn("No results from OpenCage for:", locationInput);
      return null;
    }

    const { lat, lng } = data.results[0].geometry;

    return { lat, lng };
  } catch (error) {
    console.error("Error during OpenCage geocoding:", error);
    return null;
  }
}

export async function getArticles({
  perPage = 9,
  params = {},
}: PropertiesForSaleType) {
  const { page } = params;

  let pageNumber = Math.max(1, Number(page) || 1);
  let from = (pageNumber - 1) * perPage;
  let to = from + perPage - 1;

  const query = supabase.from("blogs").select("*", { count: "exact" });

  const { count: totalCount, error: countError } = await query;
  if (countError) throw new Error(countError.message);

  const maxNumberOfPages = Math.ceil(Number(totalCount) / perPage);

  pageNumber = Math.min(pageNumber, maxNumberOfPages);
  from = (pageNumber - 1) * perPage;
  to = from + perPage - 1;

  const { data: articles, count, error } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return { articles, count };
}

export async function getArticle(id: string) {
  const { data: article, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error?.message);

  return { article };
}

export async function createUser(userData: UserDataType) {
  console.log(userData);

  const { id, full_name, email, avatar } = userData;

  const { data: user, error } = await supabase
    .from("users")
    .upsert([{ id, full_name, email, avatar }], { onConflict: "email" });

  if (error) throw new Error(error?.message);

  return { user };
}
