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
    <Container className="mt-14 space-y-10">
      {paragraphs?.map(({ title, paragraph }, idx: number) => (
        <div key={`${title} ${idx}`} className="space-y-5">
          <h3
            className={cn(
              "font-semibold",
              idx === 0 ? "text-4xl" : "text-[28px]",
            )}
          >
            {title}
          </h3>
          <p className="text-lg">{paragraph}</p>
        </div>
      ))}
    </Container>
  );
}
