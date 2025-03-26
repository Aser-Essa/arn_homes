import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";

type CustomCheckBoxType = {
  label: string;
  id: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  state: string[];
};

export default function CustomCheckBox({
  label,
  id,
  value,
  setState,
  state,
}: CustomCheckBoxType) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck(isChecked: boolean, value: string) {
    setState((prev) =>
      isChecked ? prev.filter((el) => el != value) : [...prev, value],
    );
    setIsChecked((check) => !check);
  }

  return (
    <div
      className={`flex h-[46px] items-center gap-2.5 border-b border-shades-off-white p-2.5 transition-colors [&:has([data-state="checked"])]:bg-shades-off-white`}
    >
      <Checkbox
        className="child"
        id={id}
        value={value}
        checked={isChecked || state?.includes(value)}
        onCheckedChange={() => handleCheck(isChecked, value)}
      />
      <label htmlFor={id} className="cursor-pointer text-lg">
        {label}
      </label>
    </div>
  );
}
