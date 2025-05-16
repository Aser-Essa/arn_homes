"use client";
import {
  commonFields,
  investmentFields,
  rentFields,
  saleFields,
} from "@/components/PropertyInputs";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createOrUpdateProperty } from "@/lib/actions";
import { features, PropertyFormData } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import PropertyFeaturesSection from "./PropertyFeaturesSection";
import PropertyInputs from "./PropertyInputs";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type AddPropertyBasicDataFormType = {
  propertyId: string;
  handleNextStep: () => void;
  form: UseFormReturn<PropertyFormData>;
};

export default function AddPropertyBasicDataForm({
  propertyId,
  handleNextStep,
  form,
}: AddPropertyBasicDataFormType) {
  const { user } = useUser();
  const category = form.watch("category");

  const isLoading = form.formState.isSubmitting;

  function formatFeatures(data: features) {
    return data.map((section) => ({
      title: section.title,
      points: section.points.map((p) => `${p.Key}:${p.Value}`),
    }));
  }

  function filterDataAndFormatExtras(property_data: PropertyFormData) {
    const allFields = {
      common: commonFields,
      sale: saleFields,
      rent: rentFields,
      investment: investmentFields,
    };
    type CategoryKey = keyof typeof allFields;
    const isCategory = (key: string): key is CategoryKey => {
      return key in allFields;
    };
    const selectedFields = isCategory(category) ? allFields[category] : [];

    const extrasObject = property_data.extras ?? {};

    const extras = Object.fromEntries(
      Object.entries(extrasObject).filter(([key]) =>
        selectedFields.includes(key),
      ),
    );
    const result = {
      ...property_data,
      extras: extras,
    };
    return result;
  }

  async function onSubmit(data: PropertyFormData) {
    try {
      if (!user?.id) {
        toast.error("User is not authenticated.");
        return;
      }
      const transformedExterior = formatFeatures(data.exterior);
      const transformedInterior = formatFeatures(data.interior);
      const filteredData = filterDataAndFormatExtras(data);
      await createOrUpdateProperty({
        ...filteredData,
        exterior: transformedExterior,
        interior: transformedInterior,
        user_id: user.id,
        id: propertyId,
        images: [],
        floor_plan: "",
        status: "reviewing",
      });

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
        <p>Add New Property</p>
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
                className="h-[50px] gap-0 px-6"
                disabled={isLoading}
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
