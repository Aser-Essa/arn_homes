"use client";
import React, { useState } from "react";
import Container from "@/components/Container";
import SwitchCategory from "./SwitchCategory";
import SearchInput from "./SearchInput";
import { LuSearch } from "react-icons/lu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type SearchBarType = {
  items: string[];
};

export default function SearchBar({ items }: SearchBarType) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("sale");
  const router = useRouter();

  function clickHandler() {
    const params = new URLSearchParams(window.location.search);
    if (search) params.set("state_address", search);
    router.push(`search/${category}?${params.toString()}`);
  }

  return (
    <>
      <Container>
        <div className="box-shadow relative top-[-41px] z-[100000] flex max-w-[976px] flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4">
          <SwitchCategory category={category} setCategory={setCategory} />
          <SearchInput items={items} search={search} setSearch={setSearch} />
          <Button type="submit" className="h-[50px]" onClick={clickHandler}>
            <LuSearch className="!h-5 !w-5" />
            <p className="hidden md:block">Search</p>
          </Button>
        </div>
      </Container>
    </>
  );
}
