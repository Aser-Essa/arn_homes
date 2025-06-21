"use client";
import { Card } from "@/components/ui/card";
import { formSchema } from "@/schemas/propertySchemas";
import { Property, PropertyFormData } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddPropertyImages from "./AddPropertyImages";
import CreateEditPropertyBasicDataForm from "./CreateEditPropertyBasicDataForm";

interface CreateEditPropertyFormCardProps {
  propertyId: string;
  property?: Property;
  defaultValues?: PropertyFormData;
  type?: "create" | "edit";
}

const initialValues = {
  title: "",
  address: "",
  description: "",
  area: 100,
  bed_number: 1,
  bath_number: 1,
  property_type: "",
  category: "sale",
  listed_in: new Date().toISOString(),
  state: "",
  exterior: [],
  interior: [],
  extras: {
    is_furnished: false,
    price: 1500_000,
    deposit_amount: 250,
    expected_roi: 1,
    minimum_investment: 10_000,
    monthly_rent: 120,
    lease_term: "6",
    investment_term: "12",
    investment_type: "rental_income",
  },
};

export default function CreateEditPropertyFormCard({
  propertyId,
  property = {} as Property,
  defaultValues,
  type,
}: CreateEditPropertyFormCardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const values = type === "edit" ? defaultValues : initialValues;

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  function handleNextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrevStep() {
    setCurrentStep((prev) => prev - 1);
  }

  if (type === "edit" && !property) {
    return <p>Error: Property not found.</p>;
  }

  const renderSteps = () => {
    switch (currentStep) {
      case 0:
        return (
          <CreateEditPropertyBasicDataForm
            form={form}
            propertyId={propertyId}
            property={property}
            handleNextStep={handleNextStep}
            type={type ?? "create"}
          />
        );
      case 1:
        return (
          <AddPropertyImages
            form={form}
            propertyId={propertyId}
            property={property}
            handlePrevStep={handlePrevStep}
            type={type ?? "create"}
          />
        );
    }
  };

  return (
    <>
      <Card className="mb-[150px] h-full w-full rounded-none p-0 !px-4 !py-6 shadow-none md:!p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderSteps()}
          </motion.div>
        </AnimatePresence>
      </Card>
    </>
  );
}
