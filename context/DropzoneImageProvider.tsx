"use client";
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import React from "react";

type DropzonePropertyImageProviderType = {
  children: React.ReactNode;
  bucketName: string;
  path: string;
  maxFiles: number;
  minFiles: number;
  maxFileSize: number;
  context: React.Context<ReturnType<typeof useSupabaseUpload> | undefined>;
};

export default function DropzoneImageProvider({
  children,
  bucketName,
  path,
  maxFiles,
  minFiles,
  maxFileSize,
  context,
}: DropzonePropertyImageProviderType) {
  const ImagesProps = useSupabaseUpload({
    bucketName,
    path,
    allowedMimeTypes: ["image/*"],
    maxFiles,
    minFiles,
    maxFileSize,
  });

  return (
    <>
      <context.Provider value={ImagesProps}>{children}</context.Provider>
    </>
  );
}
