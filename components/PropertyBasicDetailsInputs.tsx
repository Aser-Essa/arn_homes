import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PropertyFormData } from "./AddPropertyFormCard";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useFormContext } from "react-hook-form";

export default function PropertyBasicDetailsInputs() {
  const { control } = useFormContext();

  const formFields: (keyof PropertyFormData)[] = [
    "title",
    "address",
    "price",
    "bed_number",
    "bath_number",
    "property_type",
    "area",
    "state",
  ];

  return (
    <>
      {formFields.map((field) => (
        <div key={field}>
          <FormField
            control={control}
            name={field}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  {field.name.replace("_", " ")}
                </FormLabel>
                <FormControl>
                  <Input
                    type={"text"}
                    className="h-[44px] w-full rounded-lg border-amber-100 px-4 py-3 !text-base shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

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
                className="rounded-lg border-amber-100 !text-base shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
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
