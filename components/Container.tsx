import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={cn("px-8 md:px-[50px] lg:px-[100px]", `${className}`)}>
        {children}
      </div>
    </>
  );
}
