import { Textarea } from "@/components/ui/textarea";
import React from "react";
import AddPropertiesTextInputFields from "./AddPropertiesTextInputFields";
import CategorySelector from "./CategorySelector";
import FormFieldWrapper from "./FormFieldWrapper";
import InvestmentFields from "./InvestmentFields";
import RentFields from "./RentFields";

export default function PropertyInputs() {
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
            className="h-[180px] rounded-lg border-amber-100 !text-base shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
            {...field}
          />
        )}
      </FormFieldWrapper>
    </>
  );
}
