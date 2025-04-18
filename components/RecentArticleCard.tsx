import Image from "next/image";
import Link from "next/link";
import React from "react";

type RecentArticleCardType = {
  id: string;
  image: string;
  title: string;
  paragraphs: {
    paragraph: string;
  }[];
};

export default function RecentArticleCard({
  id,
  image,
  title,
  paragraphs,
}: RecentArticleCardType) {
  const preview = paragraphs?.[0]?.paragraph || "No content available";

  return (
    <>
      <Link
        href={`/article/${id}`}
        target="_blank"
        className="box-shadow flex items-center gap-4 rounded-xl p-4"
      >
        <div className="relative min-h-12 min-w-12 overflow-hidden rounded-xl sm:min-h-[108px] sm:min-w-[139px]">
          <Image src={image} fill alt={title} />
        </div>
        <div className="space-y-1">
          <p className="line-clamp-2 text-base font-semibold sm:line-clamp-1 sm:text-lg">
            {title}
          </p>
          <p className="line-clamp-2 max-sm:hidden">{preview}</p>
        </div>
      </Link>
    </>
  );
}
