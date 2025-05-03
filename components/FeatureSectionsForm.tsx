"use client";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import FeatureSectionCard from "./FeatureSectionCard";

type FeatureSectionsFormType = {
  name: string;
};

export default function FeatureSectionsForm({ name }: FeatureSectionsFormType) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-4">
      {fields.map((field, idx) => (
        <FeatureSectionCard
          key={field.id}
          name={name}
          idx={idx}
          remove={remove}
        />
      ))}
      {fields.length <= 0 && (
        <p className="flex h-[100px] items-center justify-center text-2xl font-bold text-gray-400">
          No Features Added
        </p>
      )}
      <Button
        type="button"
        className="rounded-lg"
        onClick={() =>
          append({
            title: `${name} Title`,
            points: [{ Key: "", Value: "" }],
            isOpen: true,
          })
        }
      >
        Add Feature
      </Button>
    </div>
  );
}
