import { supabase } from "../supabase";

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
  search?: string;
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
  const { page, search } = params;

  let pageNumber = Math.max(1, Number(page) || 1);
  let from = (pageNumber - 1) * perPage;
  let to = from + perPage - 1;

  let query = supabase.from("blogs").select("*", { count: "exact" });

  if (search) {
    query = query?.ilike("title", `%${search}%`);
  }

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

export async function getArticlesTitles() {
  const { data: articlesTitles, error } = await supabase
    .from("blogs")
    .select("title");

  if (error) throw new Error(error?.message);

  return { articlesTitles };
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
