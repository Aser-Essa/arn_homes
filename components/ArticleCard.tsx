import { formatTimestamptzToReadable } from "@/lib/utils";
import { Article } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ArticleCardType = {
  article: Article | undefined;
};

export default function ArticleCard({ article }: ArticleCardType) {
  if (!article) return;
  const { id, author, image, title, paragraphs, date } = article;
  return (
    <>
      <Link
        href={`/article/${id}`}
        className="box-shadow relative overflow-hidden rounded-xl"
      >
        <div className="space-y-5">
          <div className="relative h-[292px] w-full">
            <Image src={image} fill alt="image" />
          </div>
          <div className="space-y-2 px-4">
            <p className="line-clamp-2 h-[56px] text-lg font-semibold">
              {title}
            </p>
            <p className="line-clamp-2">{paragraphs?.at(0)?.paragraph}</p>
          </div>
          <div className="flex items-center gap-2.5 px-4 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-scooter-900 text-sm font-bold text-shades-off-white">
              {author.slice(0, 2)}
            </div>
            <div className="text-sm">
              <p className="font-semibold">{author}</p>
              <p>{formatTimestamptzToReadable(date)}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
