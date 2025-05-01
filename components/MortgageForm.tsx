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
import { formatPrice, parseFormattedPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomSelect from "./CustomSelect";

const MortgageFormSchema = z.object({
  price: z.number().min(1, "Price is required"),
  repayment_term: z.number().min(0, "repayment term sholud be more than 0"),
  interest_rate: z
    .number({ invalid_type_error: "Interest rate is required" })
    .min(0.01, "Interest rate must be greater than 0")
    .nullable()
    .refine((val) => val !== null, "Interest rate is required"),
});

type MortgageFormType = {
  price: number;
};

export default function MortgageForm({ price }: MortgageFormType) {
  const [mortgagePrice, setMortgagePrice] = useState(0);
  const [priceInput, setPriceInput] = useState(formatPrice(price));

  const form = useForm({
    resolver: zodResolver(MortgageFormSchema),
    defaultValues: {
      price,
      repayment_term: 25,
      interest_rate: 5.5,
    },
  });

  const isNanValue = !Number(formatPrice(mortgagePrice).replace(/[^0-9]/g, ""));

  const years = [
    { label: "5 years", value: 5 },
    { label: "10 years", value: 10 },
    { label: "15 years", value: 15 },
    { label: "20 years", value: 20 },
    { label: "25 years", value: 25 },
    { label: "30 years", value: 30 },
  ];

  const calcMortgage = useCallback(
    function calcMortgage() {
      const { price, repayment_term, interest_rate } = form.getValues();
      const principal = price;
      const annualInterestRate = interest_rate;
      const months = repayment_term * 12;
      const monthlyInterestRate = annualInterestRate / 100 / 12;
      const monthlyPayment =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, months)) /
        (Math.pow(1 + monthlyInterestRate, months) - 1);
      setMortgagePrice(Number(monthlyPayment.toFixed(2)));
    },
    [form],
  );

  function onSubmit() {
    calcMortgage();
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseFormattedPrice(
      e.target.value.replace(/[^0-9.]/g, ""),
    );
    if (!isNaN(numericValue)) {
      setPriceInput(formatPrice(numericValue));
      form.setValue("price", numericValue);
    }
  };

  useEffect(() => {
    calcMortgage();
  }, [calcMortgage]);

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
                    disabled
                    className="h-[50px] w-full rounded-xl border-amber-100 !text-lg text-gray-300 shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:outline-none disabled:opacity-100"
                    {...field}
                    value={priceInput}
                    onChange={handlePriceChange}
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
                    defaultValue={25}
                    selectItems={years}
                    onValueChange={(value) => field.onChange(Number(value))}
                    className="!w-full min-w-full max-w-full text-gray-300"
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
                      className="h-[50px] rounded-xl border-amber-100 !text-lg text-gray-300 shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:outline-none"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
              {formatPrice(mortgagePrice)} due per month
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
