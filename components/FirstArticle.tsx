import Image from "next/image";
import React from "react";
import Container from "./Container";
import { formatTimestamptzToReadable } from "@/lib/utils";
import { Article } from "@/types/types";
import Link from "next/link";

type FirstArticleType = {
  article: Article;
};

export default function FirstArticle({ article }: FirstArticleType) {
  const { id, author, image, title, paragraphs, date } = article;

  return (
    <Container>
      <Link href={`article/${id}`}>
        <div className="box-shadow relative mt-1.5 hidden rounded-[20px] md:flex">
          <div className="relative w-full flex-1">
            <Image src={image} fill alt="image" className="rounded-l-[20px]" />
          </div>
          <div className={"flex-1 space-y-5 p-6"}>
            <p className="text-[36px] font-semibold leading-none">{title}</p>
            <p className="line-clamp-[9]">{paragraphs?.at(0)?.paragraph}</p>
            <div className="flex max-h-20 min-h-20 items-center gap-2.5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-scooter-900 text-2xl font-bold text-shades-off-white">
                {author.slice(0, 2)}
              </div>
              <div className="text-xl">
                <p className="font-semibold">{author}</p>
                <p className="text-shades-grey">
                  {formatTimestamptzToReadable(date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Container>
  );
}
