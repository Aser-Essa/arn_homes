"use client";

import DropzoneImageProvider from "@/context/DropzoneImageProvider";
import { type UseSupabaseUploadReturn } from "@/hooks/use-supabase-upload";
import { useUser } from "@clerk/nextjs";
import React, { createContext } from "react";

type AddPropertyPageWrapperType = {
  children: React.ReactNode;
  propertyId: string;
};

type DropzoneContextType = UseSupabaseUploadReturn;

export const DropzonePropertyContext = createContext<
  DropzoneContextType | undefined
>(undefined);

export const DropzoneFloorPlanContext = createContext<
  DropzoneContextType | undefined
>(undefined);

export default function AddPropertyPageWrapper({
  children,
  propertyId,
}: AddPropertyPageWrapperType) {
  const { user } = useUser();

  return (
    <DropzoneImageProvider
      bucketName={"properties-images"}
      path={`/${user?.id}/${propertyId}`}
      maxFiles={10}
      minFiles={5}
      maxFileSize={1000 * 1000 * 10}
      context={DropzonePropertyContext}
    >
      <DropzoneImageProvider
        bucketName={"properties-images"}
        path={`/${user?.id}/${propertyId}`}
        maxFiles={1}
        minFiles={1}
        maxFileSize={1000 * 1000 * 5}
        context={DropzoneFloorPlanContext}
      >
        {children}
      </DropzoneImageProvider>
    </DropzoneImageProvider>
  );
}
