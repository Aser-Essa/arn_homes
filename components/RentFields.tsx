"use client";
import React from "react";
import CustomSelect from "./CustomSelect";
import { useFormContext } from "react-hook-form";
import FormFieldWrapper from "./FormFieldWrapper";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Checkbox } from "./ui/checkbox";

export default function RentFields() {
  const { watch } = useFormContext();
  const propertyCategory = watch("category");

  const leaseTermOptions = [
    { value: "1", label: "1 month" },
    { value: "3", label: "3 months" },
    { value: "6", label: "6 months" },
    { value: "9", label: "9 months" },
    { value: "12", label: "1 year" },
    { value: "18", label: "1.5 years" },
    { value: "24", label: "2 years" },
    { value: "36", label: "3 years" },
  ];

  return (
    <>
      {propertyCategory === "rent" && (
        <>
          <FormFieldWrapper name="lease_term" label="Lease Term">
            {(field) => (
              <CustomSelect
                placeholder="Lease Term"
                defaultValue={field.value}
                onValueChange={field.onChange}
                selectItems={leaseTermOptions}
                className="h-[44px] w-full max-w-full rounded-lg text-base"
              />
            )}
          </FormFieldWrapper>

          <div>
            <FormFieldWrapper name="is_furnished">
              {(field) => (
                <FormItem className="flex items-center gap-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-5 w-5"
                    />
                  </FormControl>
                  <FormLabel className="!m-0 text-base font-semibold">
                    Is the property furnished?
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            </FormFieldWrapper>

            <p className="text-muted-foreground mt-2.5 text-sm">
              Check if the property includes furniture like beds, sofas, or
              tables.
            </p>
          </div>
        </>
      )}
    </>
  );
}
