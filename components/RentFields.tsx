"use client";
import React from "react";
import CustomSelect from "./CustomSelect";
import { useFormContext } from "react-hook-form";
import FormFieldWrapper from "./FormFieldWrapper";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

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
          <FormFieldWrapper name={"extras.monthly_rent"} label="Monthly Rent">
            {(field) => (
              <Input
                type={"text"}
                className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            name={"extras.deposit_amount"}
            label="Deposit Amount"
          >
            {(field) => (
              <Input
                type={"text"}
                className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper name="extras.lease_term" label="Lease Term">
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
            <FormFieldWrapper name="extras.is_furnished" label=" ">
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
