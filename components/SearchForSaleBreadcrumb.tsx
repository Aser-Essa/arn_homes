import React from "react";
import BreadcrumbCustom from "./BreadcrumbCustom";

export default function SearchForSaleBreadcrumb() {
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
      path: "For sale",
      type: "page",
    },
  ];
  return (
    <>
      <BreadcrumbCustom pathArray={pathArray} />
    </>
  );
}
