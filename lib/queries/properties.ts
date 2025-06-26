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
  furniture_type?: string;
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
    furniture_type,
  } = params;

  let pageNumber = Math.max(1, Number(page) || 1);
  let from = (pageNumber - 1) * perPage;
  let to = from + perPage - 1;

  const isValid = (val?: string | number) =>
    val !== undefined &&
    val !== null &&
    val !== "" &&
    String(val).toLowerCase() !== "any" &&
    String(val).trim() !== "";

  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("category", category);

  if (isValid(bed_N)) {
    query = query.eq("bed_number", Number(bed_N));
  }

  if (isValid(bath_N)) {
    query = query.eq("bath_number", Number(bath_N));
  }

  if (property_Type && isValid(property_Type)) {
    const types = property_Type.split(",").map((t) => t.trim()); // ["Condo", "Single-family"]
    query = query.in("property_type", types);
  }

  if (isValid(time_sort)) {
    const days = Number(time_sort);
    if (!isNaN(days) && days > 0) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      query = query.gte("listed_in", cutoffDate.toISOString());
    }
  }

  if (isValid(state_address)) {
    query = query.ilike("address", `%${state_address}%`);
  }

  if (isValid(furniture_type)) {
    query = query.eq("extras->>furniture_type", furniture_type);
  }

  try {
    const { data: allData, error } = await query;

    if (error) {
      console.error("Database query error:", error);
      throw new Error(`Database query failed: ${error.message}`);
    }

    let filteredData = allData || [];

    if (category !== "rent") {
      if (isValid(min_Price)) {
        const minPriceNum = Number(min_Price);
        filteredData = filteredData.filter((property) => {
          const price = Number(property.extras?.price);
          return !isNaN(price) && price >= minPriceNum;
        });
      }

      if (isValid(max_Price)) {
        const maxPriceNum = Number(max_Price);
        filteredData = filteredData.filter((property) => {
          const price = Number(property.extras?.price);
          return !isNaN(price) && price <= maxPriceNum;
        });
      }
    }

    if (category === "rent" && isValid(price_Duration)) {
      if (isValid(min_Price)) {
        const monthlyMin = convertToMonthly(Number(min_Price), price_Duration);
        filteredData = filteredData.filter((property) => {
          const monthlyRent = Number(property.extras?.monthly_rent);
          return !isNaN(monthlyRent) && monthlyRent >= monthlyMin;
        });
      }

      if (isValid(max_Price)) {
        const monthlyMax = convertToMonthly(Number(max_Price), price_Duration);
        filteredData = filteredData.filter((property) => {
          const monthlyRent = Number(property.extras?.monthly_rent);
          return !isNaN(monthlyRent) && monthlyRent <= monthlyMax;
        });
      }
    }

    const filteredCount = filteredData.length;
    const maxNumberOfPages = Math.ceil(filteredCount / perPage);
    pageNumber = Math.min(pageNumber, maxNumberOfPages || 1);
    from = (pageNumber - 1) * perPage;
    to = from + perPage;
    const paginatedData = filteredData.slice(from, to);

    return {
      data: paginatedData,
      count: filteredCount,
      totalPages: maxNumberOfPages,
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
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
