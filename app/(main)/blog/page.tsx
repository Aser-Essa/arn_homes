import ArticlesCards from "@/components/ArticlesCards";
import FirstArticle from "@/components/FirstArticle";
import HeroSection from "@/components/HeroSection";
import SearchBlogs from "@/components/SearchBlogs";
import { getArticles, getArticlesTitles } from "@/lib/queries/articles";
import { params } from "@/types/types";

type SearchParams = Promise<params>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParamsValues = await props.searchParams;

  const { articles, count } = await getArticles({
    params: searchParamsValues,
    perPage: 10,
  });

  const { articlesTitles } = await getArticlesTitles();
  const titlesArray = articlesTitles?.map(({ title }) => title);

  const pathArray = [
    {
      path: "Home",
      href: "/",
    },
    {
      path: "Blog",
      type: "page",
    },
  ];

  return (
    <>
      <HeroSection
        pathArray={pathArray}
        title={"Blog"}
        slogan={"Explore the latest trends and insights in real estate."}
      />
      <SearchBlogs items={titlesArray} />
      {(count ? Number(count) : 0) > 0 ? (
        <>
          <FirstArticle article={articles.at(0)} />
          <ArticlesCards articles={articles} count={count} />
        </>
      ) : (
        <div className="flex h-[calc(100vh-200px)] w-full items-center justify-center">
          <p className="text-shades-gray-500 text-lg font-semibold">
            No Articles found
          </p>
        </div>
      )}
    </>
  );
}
