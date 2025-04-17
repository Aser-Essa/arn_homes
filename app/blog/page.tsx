import ArticlesCards from "@/components/ArticlesCards";
import FirstArticle from "@/components/FirstArticle";
import HeroSection from "@/components/HeroSection";
import SearchBlogs from "@/components/SearchBlogs";
import { getArticles } from "@/lib/data-service";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  const { articles, count } = await getArticles({
    params: searchParamsValues,
    perPage: 10,
  });

  return (
    <>
      <HeroSection
        breadCrumpTitle={"Blog"}
        title={"Blog"}
        slogan={"Explore the latest trends and insights in real estate."}
      />
      <SearchBlogs />
      <FirstArticle article={articles.at(0)} />
      <ArticlesCards articles={articles} count={count} />
    </>
  );
}
