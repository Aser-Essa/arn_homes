"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type PropertiesCategorySwitchType = {
  category: string;
};

export default function PropertiesCategorySwitch({
  category,
}: PropertiesCategorySwitchType) {
  const path = usePathname();
  const router = useRouter();

  function handleClick(category: string) {
    const params = new URLSearchParams(window.location.search);
    if (category) params.set("category", category);
    router.push(`${path}?${params.toString()}`);
  }

  return (
    <ul className="flex items-center gap-6 max-lg:right-0 sm:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-lg">
      <li
        className={cn(
          "cursor-pointer pb-1 transition-all hover:text-scooter-700",
          category === "sale" && "border-b border-scooter-700 text-scooter-700",
        )}
      >
        <div onClick={() => handleClick("sale")}>For sale</div>
      </li>

      <li
        className={cn(
          "cursor-pointer pb-1 transition-all hover:text-scooter-700",
          category === "rent" && "border-b border-scooter-700 text-scooter-700",
        )}
      >
        <div onClick={() => handleClick("rent")}>For rent</div>
      </li>

      <li
        className={cn(
          "cursor-pointer pb-1 transition-all hover:text-scooter-700",
          category === "investment" &&
            "border-b border-scooter-700 text-scooter-700",
        )}
      >
        <div onClick={() => handleClick("investment")}>For investment</div>
      </li>
    </ul>
  );
}
