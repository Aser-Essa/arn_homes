"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { Button } from "./ui/button";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";

type FeatureSectionCardHeaderType = {
  name: string;
  isOpen: boolean;
  idx: number;
  remove: UseFieldArrayRemove;
};

export default function FeatureSectionCardHeader({
  isOpen,
  idx,
  name,
  remove,
}: FeatureSectionCardHeaderType) {
  const { register, setValue } = useFormContext();
  const [isEditing, setIsEditing] = useState(false);

  function handleToggleEditing() {
    setIsEditing((prev) => !prev);
  }

  function handleArrowClick() {
    setValue(`${name}.${idx}.isOpen`, !isOpen);
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <Input
          {...register(`${name}.${idx}.title`)}
          onBlur={handleToggleEditing}
          disabled={!isEditing}
          defaultValue={"Exterior Title"}
          className={cn(
            "w-full !min-w-[0] border-none p-0 text-base font-semibold capitalize !opacity-100 shadow-none !ring-0 placeholder:text-base placeholder:text-shades-black",
            !isEditing && "!cursor-default",
          )}
        />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onMouseDown={handleToggleEditing}
            className={cn(
              "h-9 w-9",
              isEditing && "bg-neutral-100 text-neutral-900",
            )}
          >
            <TbEdit className="!h-5 !w-5" />
          </Button>
          <Button
            variant="ghost"
            className={"h-9 w-9 hover:text-red-500"}
            onClick={() => remove(idx)}
          >
            <TiDeleteOutline className="!h-5 !w-5" />
          </Button>
          <Button
            variant="ghost"
            className={"h-9 w-9"}
            onClick={handleArrowClick}
          >
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </div>
      </div>
    </>
  );
}
