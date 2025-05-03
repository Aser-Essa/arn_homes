import { parseFormattedPrice } from "@/lib/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Formatter = (value: number) => string;

type useChangeCustomValueType = {
  fieldName: string;
  formatter: Formatter;
};

type useChangeCustomValueReturn = [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
];

export function useChangeCustomValue({
  fieldName,
  formatter,
}: useChangeCustomValueType): useChangeCustomValueReturn {
  const { setValue, getValues } = useFormContext();

  const initial = getValues()[fieldName];

  const [state, setState] = useState(formatter(initial));
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = e.target.value.replace(/[^0-9.]/g, "");
    const numeric = parseFormattedPrice(cleaned);
    if (!isNaN(numeric)) {
      setState(formatter(numeric));
      setValue(fieldName, cleaned);
    }
  }

  return [state, handleChange];
}
