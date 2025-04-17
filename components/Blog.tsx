import React from "react";
import Container from "./Container";
import Title from "./Title";
import ArticleCard from "./ArticleCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getArticles } from "@/lib/data-service";

export default async function Blog() {
  const { articles } = await getArticles({
    params: { page: "1" },
    perPage: 15,
  });

  return (
    <>
      <Container className="mt-14 space-y-5 font-exo sm:space-y-10">
        <Title>Blog</Title>
        <Carousel>
          <CarouselContent>
            {articles.map((article) => (
              <CarouselItem
                key={article.id}
                className="sm:basis-[47%] lg:basis-[32%]"
              >
                <ArticleCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </>
  );
}
