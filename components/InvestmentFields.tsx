"use client";
import { useChangeCustomValue } from "@/hooks/useChangeCustomValue";
import { formatPercentage, formatPrice } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import CustomSelect from "./CustomSelect";
import FormFieldWrapper from "./FormFieldWrapper";
import { Input } from "./ui/input";

export default function InvestmentFields() {
  const { watch } = useFormContext();
  const propertyCategory = watch("category");

  const investmentTermOptions = [
    { value: "6", label: "6 months" },
    { value: "12", label: "1 year" },
    { value: "24", label: "2 years" },
    { value: "36", label: "3 years" },
    { value: "60", label: "5 years" },
    { value: "84", label: "7 years" },
    { value: "120", label: "10 years" },
    { value: "180", label: "15 years" },
    { value: "240", label: "20+ years" },
  ];

  const investmentTypeOptions = [
    { value: "rental_income", label: "Rental Income" },
    { value: "capital_appreciation", label: "Capital Appreciation" },
    { value: "fix_and_flip", label: "Fix and Flip" },
    { value: "commercial_property", label: "Commercial Property" },
    { value: "vacation_rental", label: "Vacation Rental" },
    { value: "raw_land", label: "Raw Land" },
    { value: "reit", label: "REIT (Real Estate Investment Trust)" },
    { value: "crowdfunding", label: "Crowdfunding" },
  ];

  const [roi, roiChangeHandler] = useChangeCustomValue({
    fieldName: "expected_roi",
    formatter: formatPercentage,
  });

  const [minInvestment, minInvestmentChangeHandler] = useChangeCustomValue({
    fieldName: "minimum_investment",
    formatter: formatPrice,
  });

  return (
    <>
      {propertyCategory === "investment" && (
        <>
          <FormFieldWrapper name="expected_roi" label="Expected ROI">
            {(field) => (
              <Input
                type="text"
                className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                {...field}
                onChange={(e) => roiChangeHandler(e)}
                value={roi}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            name="minimum_investment"
            label="Minimum Investment"
          >
            {(field) => (
              <Input
                type="text"
                className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                {...field}
                onChange={(e) => minInvestmentChangeHandler(e)}
                value={minInvestment}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper name="investment_term" label="Investment Term">
            {(field) => (
              <CustomSelect
                placeholder="Investment Term"
                defaultValue={field.value}
                onValueChange={field.onChange}
                selectItems={investmentTermOptions}
                className="h-[44px] w-full max-w-full rounded-lg text-base"
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper name="investment_type" label="Investment Type">
            {(field) => (
              <CustomSelect
                placeholder="Investment Type"
                defaultValue={field.value}
                onValueChange={field.onChange}
                selectItems={investmentTypeOptions}
                className="h-[44px] w-full max-w-full rounded-lg text-base"
              />
            )}
          </FormFieldWrapper>
        </>
      )}
    </>
  );
}
