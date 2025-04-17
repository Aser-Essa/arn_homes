"use client";
import React, { useState } from "react";
import Container from "@/components/Container";
import SearchInput from "./SearchInput";
import { LuSearch } from "react-icons/lu";
import { Button } from "./ui/button";

export default function SearchBlogs() {
  const [search, setSearch] = useState("");

  function clickHandler() {}

  return (
    <>
      <Container>
        <div className="box-shadow relative top-[-41px] z-[100000] flex w-[505px] flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4">
          <SearchInput
            items={[]}
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
