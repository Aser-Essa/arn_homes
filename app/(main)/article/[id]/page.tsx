import ArticleHeroSection from "@/components/ArticleHeroSection";
import ArticleParagraphs from "@/components/ArticleParagraphs";
import RecentArticles from "@/components/RecentArticles";
import Tags from "@/components/Tags";
import { getArticle } from "@/lib/queries/articles";
import { params } from "@/types/types";

type Params = Promise<params>;

export default async function page({ params }: { params: Params }) {
  const { id } = await params;
  const { article } = await getArticle(String(id));
  const { paragraphs, title, image, tags } = article;

  return (
    <>
      <ArticleHeroSection title={title} image={image} />
      <ArticleParagraphs paragraphs={paragraphs} />
      <Tags tags={tags} />
      <RecentArticles />
    </>
  );
}
