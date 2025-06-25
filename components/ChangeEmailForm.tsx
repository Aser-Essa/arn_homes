"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormFieldWrapper from "./FormFieldWrapper";
import { Form } from "./ui/form";
import { Input } from "./ui/input";

import { changeEmailSchema } from "@/schemas/changeEmailSchema";
import { ChangeEmailFormData } from "@/types/types";

export default function ChangeEmailForm() {
  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      current_email: "",
      new_email: "",
      confirm_new_email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="box-shadow w-full space-y-6 rounded-lg bg-white p-6"
      >
        <FormFieldWrapper name="current_email" label="Current Email">
          {(field) => (
            <Input
              type="email"
              {...field}
              className="h-[40px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
            />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper name="new_email" label="New Email">
          {(field) => (
            <Input
              type="email"
              {...field}
              className="h-[40px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
            />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper name="confirm_new_email" label="Confirm New Email">
          {(field) => (
            <Input
              type="email"
              {...field}
              className="h-[40px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
            />
          )}
        </FormFieldWrapper>
        {/* 
        <Button type="submit" className="h-[50px] w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Email"}
        </Button> */}
      </form>
    </Form>
  );
}
