import React from "react";
import { PropertyFeaturesModal } from "./PropertyFeaturesModal";
import { useFormContext } from "react-hook-form";

export default function PropertyFeaturesSection() {
  const { getFieldState, formState } = useFormContext();

  const exteriorError = getFieldState(`exterior`)?.error?.message;
  const interiorError = getFieldState(`interior`)?.error?.message;

  function extractMessages(error: unknown): string[] {
    const messages: string[] = [];
    const visited = new Set<unknown>();

    function traverse(node: unknown): void {
      if (!node || typeof node !== "object") return;
      if (visited.has(node)) return;
      visited.add(node);

      if (Array.isArray(node)) {
        for (const item of node) {
          traverse(item);
        }
      } else {
        const maybeWithMessage = node as { message?: unknown };

        if (typeof maybeWithMessage.message === "string") {
          messages.push(maybeWithMessage.message);
        }

        for (const key in node) {
          if (Object.prototype.hasOwnProperty.call(node, key)) {
            traverse((node as Record<string, unknown>)[key]);
          }
        }
      }
    }

    traverse(error);
    return messages;
  }

  function isErrored(error: unknown) {
    const isContainError = extractMessages(error).length > 0;
    if (isContainError) return "This Section Contain Invalid Value Error";
  }

  return (
    <>
      <div className="w-full space-y-2 md:col-span-2">
        <p className="text-base font-medium capitalize">Add Features</p>
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          <div className="w-full space-y-2">
            <PropertyFeaturesModal type={"exterior"} />
            <p className="text-[.8rem] font-medium text-red-500">
              {exteriorError || isErrored(formState.errors.exterior)}
            </p>
          </div>
          <div className="w-full space-y-2">
            <PropertyFeaturesModal type={"interior"} />
            <p className="text-[.8rem] font-medium text-red-500">
              {interiorError || isErrored(formState.errors.interior)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
