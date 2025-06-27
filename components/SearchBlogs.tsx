"use client";
import React, { useState } from "react";
import Container from "@/components/Container";
import SearchInput from "./SearchInput";
import { LuSearch } from "react-icons/lu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SearchBlogs({ items }: { items: string[] }) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function clickHandler() {
    const params = new URLSearchParams(window.location.search);
    if (search) params.set("search", search);
    router.push(`?${params.toString()}`);
  }

  return (
    <>
      <Container>
        <div className="box-shadow relative top-[-41px] z-[100000] flex w-full flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 sm:w-[505px]">
          <SearchInput
            items={items}
            search={search}
            setSearch={setSearch}
            placeHolder="Search keywords"
          />
          <Button type="submit" className="h-[50px]" onClick={clickHandler}>
            <LuSearch className="!h-5 !w-5" />
            <p className="hidden md:block">Search</p>
          </Button>
        </div>
      </Container>
    </>
  );
}
