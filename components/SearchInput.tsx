"use client";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type SearchInputType = {
  items: string[];
  placeHolder: string;
  search: string | string[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchInput({
  items,
  search,
  setSearch,
  placeHolder,
}: SearchInputType) {
  const [isFocused, setIsFocused] = useState(false);
  const [listPosition, setListPosition] = useState<"top" | "bottom">("bottom");
  const InputRef = useRef<HTMLInputElement>(null);
  const searchResultLimit = 6;

  const filteredItems: string[] = items
    ?.filter((item: string) =>
      item.toLowerCase().includes(String(search).toLowerCase()),
    )
    .slice(0, searchResultLimit);

  function handleClickListItem(item: string) {
    setSearch(item);
    setTimeout(() => {
      InputRef.current?.focus();
    }, 0);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function updatePosition() {
    if (!InputRef.current) return;
    const rect = InputRef.current?.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 220 && spaceBelow < spaceAbove) {
      setListPosition("top");
    } else {
      setListPosition("bottom");
    }
  }

  return (
    <div className="relative min-w-[150px] flex-1 font-exo">
      <Input
        type="text"
        placeholder={placeHolder}
        value={search}
        ref={InputRef}
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
          updatePosition();
        }}
        onBlur={() => setIsFocused(false)}
        className="h-[50px] w-full rounded-xl border-amber-100 px-4 py-3 !text-lg shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
      />

      {isFocused && String(search).length > 0 && (
        <ul
          className={cn(
            "box-shadow absolute left-0 w-full overflow-hidden rounded-xl bg-shades-white",
            listPosition == "bottom"
              ? "bottom-[-12px] translate-y-full"
              : "top-[-12px] -translate-y-full",
          )}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <li
                key={`${item} ${idx}`}
                className="flex h-[46px] cursor-pointer select-none items-center py-1.5 pl-2 pr-8 hover:bg-shades-off-white"
                onMouseDownCapture={() => handleClickListItem(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <p className="flex h-[46px] cursor-pointer select-none items-center py-1.5 pl-2 pr-8 hover:bg-shades-off-white">
              No Property Found
            </p>
          )}
        </ul>
      )}
    </div>
  );
}
