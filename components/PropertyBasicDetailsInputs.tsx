"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { PropertyFormData } from "./AddPropertyFormCard";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useFormContext } from "react-hook-form";
import CustomSelect from "./CustomSelect";
import {
  formatPercentage,
  formatPrice,
  parseFormattedPrice,
} from "@/lib/utils";
import ListingTypeSelector from "./ListingTypeSelector";
import { Checkbox } from "./ui/checkbox";

export default function PropertyBasicDetailsInputs() {
  const { control, watch, setValue } = useFormContext();
  const propertyCategory = watch("category");
  const [price, setPrice] = useState("£0");
  const [roi, setRoi] = useState("%0");
  const [minInvestment, setMinInvestment] = useState("£0");

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    setter: (value: string) => void,
    formater: (value: number) => string,
  ): void {
    const numericString = e.target.value.replace(/[^0-9.]/g, "");
    const numericValue = parseFormattedPrice(
      e.target.value.replace(/[^\d.]/g, ""),
    );
    if (!isNaN(numericValue)) {
      setter(formater(numericValue));
      setValue(fieldName, numericString);
    }
  }

  return (
    <>
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel className="font-medium capitalize">
              Listing Type
            </FormLabel>
            <FormControl>
              <ListingTypeSelector
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {formFields.map((field) => (
        <FormField
          control={control}
          name={field}
          key={field}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium capitalize">
                {field.name
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                {field.name == "area" && <> in (sq ft)</>}
              </FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      {propertyCategory !== "rent" && (
        <FormField
          control={control}
          name={"price"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium capitalize">
                {field.name
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                  {...field}
                  onChange={(e) =>
                    handleChange(e, "price", setPrice, formatPrice)
                  }
                  value={price}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {propertyCategory == "rent" && (
        <>
          <FormField
            control={control}
            name={"lease_term"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  {field.name
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    placeholder={"Lease Term"}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    selectItems={leaseTermOptions}
                    className="h-[44px] w-full max-w-full rounded-lg text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={control}
              name={"is_furnished"}
              render={({ field }) => (
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
            />
            <p className="text-muted-foreground mt-2.5 text-sm">
              Check if the property includes furniture like beds, sofas, or
              tables.
            </p>
          </div>
        </>
      )}

      {propertyCategory == "investment" && (
        <>
          <FormField
            control={control}
            name={"expected_roi"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  {field.name
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </FormLabel>
                <FormControl>
                  <Input
                    type={"text"}
                    className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                    {...field}
                    onChange={(e) =>
                      handleChange(e, "expected_roi", setRoi, formatPercentage)
                    }
                    value={roi}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"minimum_investment"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  {field.name
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </FormLabel>
                <FormControl>
                  <Input
                    type={"text"}
                    className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base font-medium shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                    {...field}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "minimum_investment",
                        setMinInvestment,
                        formatPrice,
                      )
                    }
                    value={minInvestment}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"investment_term"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  {field.name
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    placeholder={"Investment Term"}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    selectItems={investmentTermOptions}
                    className="h-[44px] w-full max-w-full rounded-lg text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"investment_type"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  {field.name
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    placeholder={"Investment Type"}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    selectItems={investmentTypeOptions}
                    className="h-[44px] w-full max-w-full rounded-lg text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel className="font-medium capitalize">
              Description
            </FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                className="h-[180px] rounded-lg border-amber-100 !text-base shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
