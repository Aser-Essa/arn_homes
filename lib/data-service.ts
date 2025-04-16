import { supabase } from "./supabase";

type PropertiesForSaleType = {
  bed_N?: string;
  bath_N?: string;
  min_Price?: string;
  max_Price?: string;
  price_Duration?: string;
  property_Type?: string;
  furniture_Type?: string;
  time_sort?: string | undefined;
  page?: string | undefined;
};

export async function getPropertiesForSales(params: PropertiesForSaleType) {
  const {
    bed_N,
    bath_N,
    min_Price,
    max_Price,
    property_Type,
    time_sort,
    page,
  } = params;

  const perPage = 9;
  const pageNumber = page ? Number(page) : 1;
  const from = (pageNumber - 1) * perPage;
  const to = from + perPage - 1;

  const query = supabase.from("homes_for_sale").select("*", { count: "exact" });

  if (bed_N && bed_N.toLocaleLowerCase() !== "any" && bed_N?.trim() !== "") {
    query.eq("bedNumber", bed_N);
  }

  if (bath_N && bath_N.toLocaleLowerCase() !== "any" && bath_N?.trim() !== "") {
    query.eq("bathNumber", bath_N);
  }

  if (
    min_Price &&
    min_Price.toLocaleLowerCase() !== "any" &&
    bath_N?.trim() !== ""
  ) {
    query.gte("price", Number(min_Price));
  }

  if (
    max_Price &&
    max_Price.toLocaleLowerCase() !== "any" &&
    bath_N?.trim() !== ""
  ) {
    query.lte("price", Number(max_Price));
  }

  if (time_sort && time_sort.toLocaleLowerCase() !== "any") {
    const days = Number(time_sort);
    if (!isNaN(days)) {
      const time = new Date();
      time.setDate(time.getDate() - days);
      query.gte("listed_in", time.toISOString());
    }
  }

  if (
    property_Type &&
    property_Type.toLocaleLowerCase() !== "any" &&
    property_Type?.trim() !== ""
  ) {
    query.eq("propertytype", property_Type);
  }

  const { count: countRows, error: errorCountRows } = await query;

  if (errorCountRows) throw new Error(errorCountRows?.message);

  if (from >= 0 && to <= Number(countRows)) {
    query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) throw new Error(error?.message);

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

export type Coordinates = {
  lat: number;
  lng: number;
};

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
