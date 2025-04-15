"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import CustomSelect from "./CustomSelect";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

type onSubmitDataType = {
  price: number;
  repayment_term: number;
  interest_rate: number;
};

export default function MortageForm() {
  const [mortagePrice, setMortagePrice] = useState(45);

  const isNanValue = !Number(formatPrice(mortagePrice).replace(/[^0-9]/g, ""));

  const years = [
    { label: "5 years", value: 5 },
    { label: "10 years", value: 10 },
    { label: "15 years", value: 15 },
    { label: "20 years", value: 20 },
    { label: "25 years", value: 25 },
    { label: "30 years", value: 30 },
  ];

  const form = useForm({
    defaultValues: {
      price: 7250,
      repayment_term: 25,
      interest_rate: 5.5,
    },
  });

  function onSubmit(data: onSubmitDataType) {
    const { price, repayment_term, interest_rate } = data;

    const principal = price;
    const annualInterestRate = interest_rate;
    const months = repayment_term * 12;
    const monthlyInterestRate = annualInterestRate / 100 / 12;

    const monthlyPayment =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, months)) /
      (Math.pow(1 + monthlyInterestRate, months) - 1);
    setMortagePrice(Number(monthlyPayment.toFixed(2)));
    console.log(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 font-exo"
        >
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">Price</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="£7,250"
                    className="h-[50px] w-full rounded-xl border-amber-100 !text-lg text-gray-300 shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repayment_term"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Repayment term
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    placeholder="Repayment term"
                    defaultValue={"25"}
                    selectItems={years}
                    onValueChange={field.onChange}
                    className="w-full text-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interest_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Interest rate
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="5.5"
                      className="h-[50px] rounded-xl border-amber-100 !text-lg text-gray-300 shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:outline-none"
                      {...field}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 pr-0 text-lg text-gray-300">
                      %
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isNanValue ? (
            <p className="text-lg font-semibold text-red-500">Invalid Input</p>
          ) : (
            <p className="text-2xl font-semibold">
              {formatPrice(mortagePrice)} due per month
            </p>
          )}

          <Button type="submit" className="!mt-10 h-[50px] w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
