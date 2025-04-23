import { Input } from "@clerk/elements/common";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function LabeledInput() {
  return (
    <>
      <div>
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="h-[46px] w-full rounded-xl border-amber-100 px-4 py-3 !text-lg shadow-none !ring-0 placeholder:text-gray-300 hover:border-amber-200 focus:!ring-[2px] focus:!ring-[#FCEEC2]"
        />
      </div>
    </>
  );
}
