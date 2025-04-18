import React from "react";
import Container from "./Container";
import { cn } from "@/lib/utils";

type ArticleParagraphsType = {
  paragraphs: {
    title: string;
    paragraph: string;
  }[];
};

export default function ArticleParagraphs({
  paragraphs,
}: ArticleParagraphsType) {
  return (
    <Container className="mt-6 space-y-8 sm:mt-14 sm:space-y-10">
      {paragraphs?.map(({ title, paragraph }, idx: number) => (
        <div key={`${title} ${idx}`} className="space-y-5">
          <h3
            className={cn(
              "font-semibold",
              idx === 0 ? "text-2xl sm:text-4xl" : "text-2xl sm:text-[28px]",
            )}
          >
            {title}
          </h3>
          <p className="text-base sm:text-lg">{paragraph}</p>
        </div>
      ))}
    </Container>
  );
}
