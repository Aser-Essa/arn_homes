import Image from "next/image";
import React from "react";
import Container from "./Container";
import { formatTimestamptzToReadable } from "@/lib/utils";
import { Article } from "@/types/types";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

type FirstArticleType = {
  article: Article;
};

export default function FirstArticle({ article }: FirstArticleType) {
  const { id, author, image, title, paragraphs, date } = article;

  return (
    <Container>
      <Link href={`article/${id}`} className="group" target="_blank">
        <div className="box-shadow relative mt-1.5 hidden rounded-[20px] md:flex">
          <div className="relative w-full flex-1">
            <div className="absolute inset-0 z-[10] flex items-center justify-center rounded-l-[20px] bg-[#0d0e0f66] opacity-0 transition-all group-hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-shades-white">
                <BsArrowUpRight className="h-6 w-6" />
              </div>
            </div>
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
