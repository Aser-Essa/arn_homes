"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type CategorySwitchType = {
  category_val: string;
  category_name: string;
  categories: { key: string; label: string }[];
};
export default function CategorySwitch({
  categories,
  category_val,
  category_name,
}: CategorySwitchType) {
  const path = usePathname();
  const router = useRouter();

  function handleClick(category_val: string) {
    const params = new URLSearchParams(window.location.search);
    if (category_val) params.set(category_name, category_val);
    router.push(`${path}?${params.toString()}`);
  }

  return (
    <ul className="flex items-center gap-6 max-lg:right-0 sm:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-lg">
      {categories?.map(({ key, label }) => (
        <li
          key={key}
          className={cn(
            "cursor-pointer pb-1 transition-all hover:text-scooter-700",
            category_val === key &&
              "border-b border-scooter-700 text-scooter-700",
          )}
        >
          <div onClick={() => handleClick(key)}>{label}</div>
        </li>
      ))}
    </ul>
  );
}
