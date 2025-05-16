"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useUser } from "@clerk/nextjs";
import { scheduleTour } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const scheduleFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  scheduled_date: z.date({ required_error: "Date is required" }),
  scheduled_time: z.string().min(1, "Time is required"),
});

type ScheduleFormDataType = z.infer<typeof scheduleFormSchema>;

export default function ScheduleForm({ property_id }: { property_id: string }) {
  const router = useRouter();
  const { user } = useUser();
  const user_id = user?.id;

  const form = useForm<ScheduleFormDataType>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      scheduled_date: new Date(),
      scheduled_time: "",
    },
  });

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

  async function onSubmit(formData: ScheduleFormDataType) {
    if (!user_id) {
      toast.error("You Should Sign-in First");
      setTimeout(() => {
        router.push("/sign-in");
      }, 800);
      return;
    } else {
      const data = {
        ...formData,
        property_id,
        user_id,
      };
      const result = await scheduleTour(data);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Tour scheduled successfully!");
        form.reset();
      }
    }
  }

  // console.log(form.getValues());

  return (
    <Form {...form}>
      <form
        className="flex h-[calc(100%-78px)] flex-col items-stretch justify-between gap-[30px] font-exo"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="scheduled_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateInput
                    date={form.getValues("scheduled_date")}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scheduled_time"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomSelect
                    selectItems={timeOptions}
                    placeholder="Select time"
                    className="!w-full min-w-full max-w-full !text-gray-300"
                    onValueChange={field.onChange}
                    value={field.value}
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
                    aria-label="Your full name"
                    minLength={3}
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
                    type="tel"
                    inputMode="numeric"
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

        {!user_id && (
          <p className="text-sm font-semibold text-red-500">
            Note: You Should Be Signed In
          </p>
        )}

        <div className="space-y-2.5">
          <Button type="submit" className="h-[50px] w-full" disabled={!user_id}>
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
