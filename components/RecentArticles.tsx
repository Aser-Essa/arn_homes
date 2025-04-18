import { getArticles } from "@/lib/data-service";
import React from "react";
import Container from "./Container";
import RecentArticleCard from "./RecentArticleCard";

export default async function RecentArticles() {
  const { articles } = await getArticles({ params: { page: "1" }, perPage: 4 });

  return (
    <Container className="mb-[200px] mt-10 space-y-10">
      <p className="text-[36px] font-semibold">Recent articles</p>
      <div className="grid grid-cols-2 gap-[30px]">
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

{
  /* <div className="grid grid-cols-2 gap-[30px]">
{articles.map(({ id, image, title, paragraphs }, idx) => (
  <RecentArticleCard
    key={`${id}-${idx}`}
    id={id}
    image={image}
    title={title}
    paragraphs={paragraphs}
  />
))}
</div> */
}
