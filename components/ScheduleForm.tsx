"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomSelect from "./CustomSelect";
import DateInput from "./DateInput";
import { useForm } from "react-hook-form";
import { useState } from "react";

type ScheduleFormDataType = {
  date: string;
  name: string;
  phone: string;
  select_time: string;
};

export default function ScheduleForm() {
  const timeOptions = [
    { label: "12:00pm", value: "12:00pm" },
    { label: "12:30pm", value: "12:30pm" },
    { label: "1:00pm", value: "1:00pm" },
    { label: "1:30pm", value: "1:30pm" },
    { label: "2:00pm", value: "2:00pm" },
    { label: "2:30pm", value: "2:30pm" },
    { label: "3:00pm", value: "3:00pm" },
    { label: "3:30pm", value: "3:30pm" },
    { label: "4:00pm", value: "4:00pm" },
    { label: "4:30pm", value: "4:30pm" },
  ];

  const [date, setDate] = useState<Date | undefined>(new Date());

  const form = useForm<ScheduleFormDataType>({
    defaultValues: {
      date: "",
      name: "",
      phone: "",
      select_time: "",
    },
  });

  function onSubmit(data: ScheduleFormDataType) {
    console.log({ ...data, date });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[calc(100%-78px)] flex-col items-stretch justify-between font-exo"
      >
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="date"
            render={() => (
              <FormItem>
                <FormControl>
                  <DateInput date={date} setDate={setDate} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="select_time"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomSelect
                    selectItems={timeOptions}
                    placeholder="Select time"
                    className="w-full !text-gray-300"
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="h-[50px] rounded-xl border-amber-100 !text-lg text-gray-300 shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Phone"
                    className="h-[50px] rounded-xl border-amber-100 !text-lg text-gray-300 shadow-none !ring-0 placeholder:text-lg placeholder:text-gray-300 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2.5">
          <Button type="submit" className="h-[50px] w-full">
            Schedule a tour
          </Button>
          <p className="text-sm">
            You agree that Linked Bricks may contact you via phone/text about
            inquiry, which may involve the use of automated means. You also
            agree to our{" "}
            <span className="cursor-pointer font-semibold text-scooter-700">
              Terms of Use.
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
}
