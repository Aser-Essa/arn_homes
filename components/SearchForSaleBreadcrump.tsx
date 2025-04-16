import React from "react";
import BreadcrumpCustom from "./BreadcrumpCustom";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SearchForSaleBreadcrump() {
  return (
    <>
      <BreadcrumpCustom>
        <BreadcrumbItem>
          <BreadcrumbLink href="">Search</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>For Sale</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumpCustom>
    </>
  );
}
