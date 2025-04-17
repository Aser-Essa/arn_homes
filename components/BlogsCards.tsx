import React from "react";
import BlogCard from "./BlogCard";
import Container from "./Container";
import Pagenation from "./Pagenation";

export default function BlogsCards() {
  const ArrayBlogs = Array.from({ length: 9 }, (n: number) => n++);

  return (
    <Container className="mb-[200px] mt-[30px] space-y-10">
      <div className="grid grid-cols-[repeat(auto-fill_,minmax(330px,1fr))] gap-[30px]">
        <div className="block md:hidden">
          <BlogCard />
        </div>
        {ArrayBlogs.map((el, idx) => (
          <BlogCard key={idx} />
        ))}
      </div>
      <Pagenation count={90} />
    </Container>
  );
}
