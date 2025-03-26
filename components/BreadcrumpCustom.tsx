import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadCrump({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="h-12 w-fit rounded-xl border-l-[5px] border-amber-600 bg-gray-900 pl-[17px] pr-[22px] font-exo text-xl">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
