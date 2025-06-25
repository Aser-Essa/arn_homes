import React from "react";
import ArticleCard from "./ArticleCard";
import Container from "./Container";
import Pagenation from "./Pagenation";
import { Article } from "@/types/types";

type ArticlesCardsType = {
  articles: Article[];
  count: number | null;
};

export default function ArticlesCards({ articles, count }: ArticlesCardsType) {
  return (
    <Container className="mb-[200px] mt-[30px] space-y-10">
      <div className="grid grid-cols-[repeat(auto-fill_,minmax(330px,1fr))] gap-[30px]">
        <div className="box-shadow block overflow-hidden rounded-xl md:hidden">
          <ArticleCard article={articles?.at(0)} />
        </div>
        {articles.slice(1).map((article, idx) => (
          <ArticleCard key={idx} article={article} />
        ))}
      </div>
      <Pagenation count={count} perPage={10} />
    </Container>
  );
}
