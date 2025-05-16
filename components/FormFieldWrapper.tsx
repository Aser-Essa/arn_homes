"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type FormFieldWrapperType<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  className?: string;
  children: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
};

export default function FormFieldWrapper<T extends FieldValues>({
  name,
  label,
  className,
  children,
}: FormFieldWrapperType<T>) {
  const { control, formState } = useFormContext<T>();
  const isLoading = formState.isLoading;

  return (
    <>
      <FormField
        control={control}
        name={name}
        disabled={isLoading}
        render={({ field }) => (
          <FormItem className={cn(className)}>
            <FormLabel className={"font-medium capitalize"}>
              {label ||
                field.name
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
            </FormLabel>
            <FormControl>{children(field)}</FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
