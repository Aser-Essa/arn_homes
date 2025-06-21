import React from "react";
import Container from "./Container";
import RecentArticleCard from "./RecentArticleCard";
import { getArticles } from "@/lib/queries/articles";

export default async function RecentArticles() {
  const { articles } = await getArticles({ params: { page: "1" }, perPage: 4 });

  return (
    <Container className="mb-[200px] mt-8 space-y-5 sm:mt-10 sm:space-y-10">
      <p className="text-[24px] font-semibold sm:text-[36px]">
        Recent articles
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill_,minmax(450px,1fr))] sm:gap-[30px]">
        {articles.map(({ id, image, title, paragraphs }, idx) => (
          <RecentArticleCard
            key={`${id}-${idx}`}
            id={id}
            image={image}
            title={title}
            paragraphs={paragraphs}
          />
        ))}
      </div>
    </Container>
  );
}
