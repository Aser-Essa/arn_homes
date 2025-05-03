import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoTrash } from "react-icons/io5";

export default function FeaturePointsInput({
  name,
  isOpen,
}: {
  name: string;
  isOpen: boolean;
}) {
  const { control, register, getFieldState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  function getError(idx: number) {
    const pointErrorMessage = getFieldState(`${name}.${idx}.Key`).error
      ?.message;
    return pointErrorMessage;
  }

  return (
    <>
      {fields.length <= 0 && (
        <p className="flex h-[100px] items-center justify-center text-2xl font-bold text-gray-400">
          No Points Added
        </p>
      )}

      <div className="space-y-4">
        {fields.length > 0 && (
          <div className="min-h-[100px] space-y-2">
            {fields.map((field, j) => (
              <div key={field.id} className="flex items-start gap-2">
                <div className="space-y-1">
                  <Input {...register(`${name}.${j}.Key`)} placeholder="Key" />
                  <p className="text-[.8rem] font-medium text-red-500">
                    {getError(j)}
                  </p>
                </div>
                <Input
                  {...register(`${name}.${j}.Value`)}
                  placeholder="Value"
                />
                <Button
                  variant="ghost"
                  onClick={() => remove(j)}
                  className="h-9 w-9"
                >
                  <IoTrash className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
        {isOpen && (
          <div className="h-[36px]">
            <Button
              type="button"
              onClick={() => append(" ")}
              className="absolute bottom-4 rounded-lg"
            >
              Add Point
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
