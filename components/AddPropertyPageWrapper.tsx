"use client";

import {
  useSupabaseUpload,
  type UseSupabaseUploadReturn,
} from "@/hooks/use-supabase-upload";
import { useUser } from "@clerk/nextjs";
import React, { createContext } from "react";

type DropzoneContextType = UseSupabaseUploadReturn;

type AddPropertyPageWrapperType = {
  children: React.ReactNode;
  propertyId: string;
};

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

  const propertyImagesProps = useSupabaseUpload({
    bucketName: "properties-images",
    path: `/${user?.id}/${propertyId}`,
    allowedMimeTypes: ["image/*"],
    maxFiles: 10,
    minFiles: 5,
    maxFileSize: 1000 * 1000 * 10, // 10MB
  });

  const floorPlanProps = useSupabaseUpload({
    bucketName: "properties-images",
    path: `/${user?.id}/${propertyId}`,
    allowedMimeTypes: ["image/*"],
    maxFiles: 1,
    minFiles: 1,
    maxFileSize: 1000 * 1000 * 5, // 5MB
  });

  return (
    <DropzonePropertyContext.Provider value={propertyImagesProps}>
      <DropzoneFloorPlanContext.Provider value={floorPlanProps}>
        {children}
      </DropzoneFloorPlanContext.Provider>
    </DropzonePropertyContext.Provider>
  );
}
