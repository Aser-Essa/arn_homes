import { supabase } from "../supabase";

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

export async function getArticles({
  perPage = 9,
  params = {},
}: PropertiesType) {
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
