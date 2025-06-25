import { formatTimestamptzToReadable } from "@/lib/utils";
import { Article } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

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
        target="_blank"
        className="box-shadow group relative overflow-hidden !rounded-xl"
      >
        <div className="space-y-5">
          <div className="relative h-[292px] w-full">
            <div className="absolute inset-0 z-[10] flex items-center justify-center bg-[#0d0e0f66] opacity-0 transition-all group-hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-shades-white">
                <BsArrowUpRight className="h-6 w-6" />
              </div>
            </div>
            <Image src={image} fill alt="image" />
          </div>
          <div className="space-y-2 px-4">
            <p className="line-clamp-2 text-lg font-semibold sm:h-[56px]">
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
