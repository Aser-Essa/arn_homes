import { parseFormattedPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
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

  const value = getValues(fieldName);

  const [state, setState] = useState(formatter(value));

  useEffect(() => {
    if (value != state) {
      setState(formatter(value));
    }
  }, [formatter, state, value]);
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
