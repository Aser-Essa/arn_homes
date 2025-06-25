"use client";
import { useFormContext } from "react-hook-form";
import CustomSelect from "./CustomSelect";
import FormFieldWrapper from "./FormFieldWrapper";
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
        </>
      )}
    </>
  );
}
