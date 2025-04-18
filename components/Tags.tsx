import React from "react";
import Container from "./Container";

type TagsType = {
  tags: string[];
};

export default function Tags({ tags }: TagsType) {
  return (
    <Container className="mt-10 flex flex-wrap items-center gap-2.5">
      <p className="text-2xl font-semibold">Tags:</p>
      {tags?.map((tag, idx) => (
        <p
          key={`${tag} ${idx}`}
          className="flex h-8 cursor-pointer items-center rounded-xl bg-shades-off-white px-3 py-1 text-sm sm:px-4 sm:text-base"
        >
          {tag}
        </p>
      ))}
    </Container>
  );
}
