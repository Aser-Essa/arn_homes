"use client";
import React from "react";
import FormFieldWrapper from "./FormFieldWrapper";
import { Input } from "./ui/input";
import { useFormContext } from "react-hook-form";
import { formatPrice } from "@/lib/utils";
import { useChangeCustomValue } from "@/hooks/useChangeCustomValue";

export default function AddPropertiesTextInputFields() {
  const { watch } = useFormContext();
  const [price, priceChangeHandler] = useChangeCustomValue({
    fieldName: "price",
    formatter: formatPrice,
  });

  const propertyCategory = watch("category");

  const basicFormFields = [
    "title",
    "address",
    "bed_number",
    "bath_number",
    "property_type",
    "area",
    "state",
  ];

  const categoryFieldMap: Record<string, string[]> = {
    sale: [],
    rent: ["monthly_rent", "deposit_amount"],
    investment: [],
  };

  const CategoryBasedFields = categoryFieldMap[propertyCategory] || [];

  const formFields = [...basicFormFields, ...CategoryBasedFields];

  return (
    <>
      {formFields.map((field) => (
        <FormFieldWrapper name={field} key={field}>
          {(field) => (
            <Input
              type={"text"}
              className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
              {...field}
            />
          )}
        </FormFieldWrapper>
      ))}

      {propertyCategory !== "rent" && (
        <FormFieldWrapper name={"price"}>
          {(field) => (
            <Input
              type={"text"}
              className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
              {...field}
              onChange={(e) => priceChangeHandler(e)}
              value={price}
            />
          )}
        </FormFieldWrapper>
      )}
    </>
  );
}
