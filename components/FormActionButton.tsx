"use client";
import React, { cloneElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type FormActionButtonType = {
  children?: React.ReactNode;
  icon?: React.ReactElement<{ className?: string }>;
  iconAnimation?: string;
  className?: string;
  type?: string;
};

export default function FormActionButton({
  children,
  icon,
  className,
  type,
  iconAnimation = "",
}: FormActionButtonType) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={pending}
        className={cn(
          className,
          type === "icon" && "border-none !bg-transparent p-0 !shadow-none",
        )}
      >
        {icon &&
          cloneElement(icon, { className: pending ? iconAnimation : "" })}
        {children}
      </Button>
    </>
  );
}
