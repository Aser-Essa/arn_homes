"use client";
import { Card } from "@/components/ui/card";
import { formSchema } from "@/schemas/propertySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddPropertyBasicDataForm from "./AddPropertyBasicDataForm";
import AddPropertyImages from "./AddPropertyImages";
import { PropertyFormData } from "@/types/types";

interface AddPropertyFormCardProps {
  propertyId: string;
}

export default function AddPropertyFormCard({
  propertyId,
}: AddPropertyFormCardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });

  function handleNextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrevStep() {
    setCurrentStep((prev) => prev - 1);
  }

  const renderSteps = () => {
    switch (currentStep) {
      case 0:
        return (
          <AddPropertyBasicDataForm
            form={form}
            propertyId={propertyId}
            handleNextStep={handleNextStep}
          />
        );
      case 1:
        return (
          <AddPropertyImages
            form={form}
            propertyId={propertyId}
            handlePrevStep={handlePrevStep}
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
