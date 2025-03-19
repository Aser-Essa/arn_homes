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
      <div className={cn("px-4 md:px-8 lg:px-[100px]", `${className}`)}>
        {children}
      </div>
    </>
  );
}
