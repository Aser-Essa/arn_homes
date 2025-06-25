import { params } from "@/types/types";
import { supabase } from "../supabase";

type ReviewsType = {
  params?: params;
  perPage?: number;
  category?: string;
};

export async function getReviews({ perPage = 9, params = {} }: ReviewsType) {
  const page = Math.max(1, Number(params?.page) || 1);

  const { count, error: countError } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true });

  if (countError) {
    throw new Error(countError.message);
  }

  const totalPages = Math.ceil((count || 0) / perPage);
  const isValidPage = page <= totalPages || totalPages === 0;

  if (!isValidPage && count !== 0) {
    return {
      reviews: [],
      count: count || 0,
      totalPages,
      currentPage: page,
      isValidPage: false,
    };
  }

  const pageNumber = Math.min(page, totalPages);
  const from = (pageNumber - 1) * perPage;
  const to = from + perPage - 1;

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return {
    reviews: reviews || [],
    count: count || 0,
    totalPages,
    currentPage: page,
    isValidPage: true,
  };
}
