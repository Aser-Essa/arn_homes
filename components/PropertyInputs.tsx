"use client";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import AddPropertiesTextInputFields from "./AddPropertiesTextInputFields";
import CategorySelector from "./CategorySelector";
import FormFieldWrapper from "./FormFieldWrapper";
import InvestmentFields from "./InvestmentFields";
import RentFields from "./RentFields";
import { useFormContext } from "react-hook-form";

export const commonFields = [
  "title",
  "address",
  "bed_number",
  "bath_number",
  "area",
  "description",
  "property_type",
  "category",
  "listed_in",
  "floor_plan",
  "images",
  "state",
  "exterior",
  "interior",
];

export const saleFields = ["price"];

export const rentFields = [
  "monthly_rent",
  "deposit_amount",
  "lease_term",
  "is_furnished",
];

export const investmentFields = [
  "price",
  "expected_roi",
  "minimum_investment",
  "investment_term",
  "investment_type",
];

export default function PropertyInputs() {
  const { resetField, watch } = useFormContext();
  const category = watch("category");

  useEffect(() => {
    const allFields = [...saleFields, ...rentFields, ...investmentFields];

    allFields.forEach((field) => resetField(`extras.${field}`));
  }, [category, resetField]);

  return (
    <>
      <FormFieldWrapper
        name="category"
        className="md:col-span-2"
        label="Listing Type"
      >
        {(field) => (
          <CategorySelector value={field.value} onChange={field.onChange} />
        )}
      </FormFieldWrapper>
      <AddPropertiesTextInputFields />
      <RentFields />
      <InvestmentFields />
      <FormFieldWrapper
        name={"description"}
        label="Description"
        className="md:col-span-2"
      >
        {(field) => (
          <Textarea
            rows={4}
            className="h-[180px] !resize-y rounded-lg border-amber-100 !text-base shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
            {...field}
          />
        )}
      </FormFieldWrapper>
    </>
  );
}
