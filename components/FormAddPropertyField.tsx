"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormAddPropertyFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
  isTextArea?: boolean;
  className?: string;
} & InputProps &
  TextareaProps;

export default function FormAddPropertyField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  isTextArea = false,
  ...rest
}: FormAddPropertyFieldProps) {
  return (
    <>
      <div className={cn("space-y-1")}>
        <Label className="text-base font-medium">{label}</Label>
        {isTextArea ? (
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            {...rest}
          />
        ) : (
          <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="h-[42px] w-full rounded-xl border-amber-100 px-4 py-3 !text-lg shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
            {...rest}
          />
        )}
      </div>
    </>
  );
}
