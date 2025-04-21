import React, { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbCustomType = {
  pathArray: { path: string; type?: string; href?: string }[];
};

export default function BreadcrumbCustom({ pathArray }: BreadcrumbCustomType) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="mt-10 h-10 w-fit flex-nowrap rounded-xl border-l-[5px] border-amber-600 bg-gray-900 pl-[17px] pr-[22px] font-exo text-base sm:h-12 sm:max-w-[70%] sm:text-xl">
        {pathArray?.map(({ path, type, href }, index) => (
          <Fragment key={path}>
            <BreadcrumbItem>
              {type === "page" ? (
                <BreadcrumbPage className="line-clamp-1">{path}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{path}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== pathArray.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
