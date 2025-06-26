"use client";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createOrUpdateProperty } from "@/lib/actions/properties";
import { transformPropertyDataForSubmit } from "@/lib/utils";
import { Property, PropertyFormData } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import PropertyFeaturesSection from "./PropertyFeaturesSection";
import PropertyInputs from "./PropertyInputs";
import { Button } from "./ui/button";

type CreateEditPropertyBasicDataFormType = {
  form: UseFormReturn<PropertyFormData>;
  propertyId: string;
  property: Property;
  handleNextStep: () => void;
  type: "create" | "edit";
};

export default function CreateEditPropertyBasicDataForm({
  propertyId,
  property,
  handleNextStep,
  type,
  form,
}: CreateEditPropertyBasicDataFormType) {
  const { user } = useUser();
  const category = form.watch("category");

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: PropertyFormData) {
    try {
      if (!user?.id) {
        toast.error("User is not authenticated.");
        return;
      }

      const transformedData = {
        ...transformPropertyDataForSubmit({
          data,
          category,
          userId: user.id,
          propertyId,
        }),
        images: property?.images || [],
      };
      await createOrUpdateProperty(transformedData);

      toast.success("Property details saved. Proceed to upload images.");
      handleNextStep();
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to save property. Please try again.");
    }
  }

  return (
    <>
      <CardHeader className="p-0 pb-5 text-[28px] font-semibold text-shades-black">
        <p>{type === "edit" ? "Edit Property" : "Add New Property"}</p>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
              <PropertyInputs />
              <PropertyFeaturesSection />
            </div>
            <div className="flex items-center justify-end gap-2 text-right">
              <Button
                type="submit"
                className="h-[50px] gap-0 px-6 text-base"
                // disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <p>Loading</p>
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : (
                  <>
                    <p>Next</p>
                    <IoIosArrowRoundForward className="min-h-7 min-w-7" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
