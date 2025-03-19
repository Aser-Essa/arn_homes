import React from "react";
import Container from "@/components/Container";
import SwitchCategory from "./SwitchCategory";
import { InputSearch } from "./InputSearch";

export default function SearchBar() {
  return (
    <>
      <Container>
        <div
          className="relative top-[-41px] z-[100000] flex max-w-[976px] flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4"
          style={{
            boxShadow: "0 20px 24px -4px #ffecb30a, 0 8px 11px -4px #2d36430a",
          }}
        >
          <SwitchCategory />
          <InputSearch />
        </div>
      </Container>
    </>
  );
}
