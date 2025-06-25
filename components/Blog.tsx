import React from "react";
import Container from "./Container";
import Title from "./Title";
import ArticleCard from "./ArticleCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getArticles } from "@/lib/queries/articles";

export default async function Blog() {
  const { articles } = await getArticles({
    params: { page: "1" },
    perPage: 15,
  });

  const hasArticles = Array.isArray(articles) && articles.length > 0;

  return (
    <>
      <Container className="mt-14 space-y-5 font-exo sm:space-y-10">
        <Title>Blog</Title>
        {hasArticles ? (
          <Carousel opts={{ dragFree: true }}>
            <CarouselContent>
              {articles.map((article) => (
                <CarouselItem
                  key={article.id}
                  className="pb-2 sm:basis-[47%] lg:basis-[32%]"
                >
                  <div className="box-shadow overflow-hidden rounded-xl">
                    <ArticleCard article={article} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-10 flex items-center justify-end gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        ) : (
          <div className="flex h-[200px] w-full items-center justify-center">
            <p className="text-shades-gray-500 text-lg font-semibold">
              No Articles found
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
