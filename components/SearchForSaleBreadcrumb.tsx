import React from "react";
import BreadcrumbCustom from "./BreadcrumbCustom";

export default function SearchForSaleBreadcrumb({
  category,
}: {
  category?: string | string[] | undefined;
}) {
  const pathArray = [
    {
      path: "Home",
      href: "/",
    },
    {
      path: "Search",
      href: "",
    },
    {
      path: `For ${category}`,
      type: "page",
    },
  ];
  return (
    <>
      <BreadcrumbCustom pathArray={pathArray} />
    </>
  );
}
