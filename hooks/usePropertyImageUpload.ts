import { updateProperty } from "@/lib/actions/properties";
import { fileToDropzoneFormat, urlToFile } from "@/lib/utils";
import { Property } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { UseSupabaseUploadReturn } from "./use-supabase-upload";
import { useRouter } from "next/navigation";

export type FileWithPreview = File & {
  preview: string;
  errors?: { message: string }[];
};

type usePropertyImageUploadType = {
  propertyId: string;
  property: Property;
  type: "create" | "edit";
  propertyProps: UseSupabaseUploadReturn;
  floorPlanProps: UseSupabaseUploadReturn;
};

export function usePropertyImageUpload({
  propertyProps,
  floorPlanProps,
  property,
  propertyId,
  type,
}: usePropertyImageUploadType) {
  const { user } = useUser();
  const router = useRouter();
  const isLoading = propertyProps?.loading || floorPlanProps?.loading;

  function isDuplicatedImage() {
    const propertyFiles = propertyProps?.files.map((file) => file.name);
    const floorPlanFile = floorPlanProps?.files?.[0]?.name || " ";
    return propertyFiles.includes(floorPlanFile);
  }
  const isDuplicatedExisit = isDuplicatedImage();

  function extractImages() {
    const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/properties-images/${user?.id}/${propertyId}`;
    const images = propertyProps?.files?.map(
      (file) => `${BASE_URL}/${file?.name}`,
    );
    const floorFile = floorPlanProps?.files?.[0];
    const floor_plan = floorFile ? `${BASE_URL}/${floorFile?.name}` : "";
    return { images, floor_plan };
  }

  function isFileLengthValid(props: typeof propertyProps) {
    const length = props.files?.length;
    return length >= props.minFiles && length <= props.maxFiles;
  }
  const isDisabled = isLoading || !isFileLengthValid(propertyProps);

  async function handleSubmit() {
    if (!isFileLengthValid(propertyProps)) {
      toast.error("Please upload the correct number of property images.");
      return;
    }
    // if (isDuplicatedExisit) {
    //   toast.error("Please remove duplicate property images before submitting.");
    //   return;
    // }
    try {
      await Promise.all([
        propertyProps?.onUpload(),
        floorPlanProps?.onUpload(),
      ]);

      const { images, floor_plan } = extractImages();
      const ImagesData = {
        images,
        floor_plan,
        status: "reviewing",
      };

      const formData = new FormData();
      formData.append("propertyId", propertyId);
      formData.append("updatedData", JSON.stringify(ImagesData));

      await updateProperty(formData);
      toast.success("Property images uploaded and submitted for review!");
      router.push("/account");
    } catch (error) {
      toast.error("Something went wrong while uploading. Please try again.");
      console.error(error);
    }
  }

  useEffect(() => {
    if (type === "edit") {
      const preloadFiles = async () => {
        try {
          if (property.floor_plan) {
            const floorFile = await urlToFile(
              property.floor_plan,
              property.floor_plan.split("/").pop() || "floor_plan.jpg",
            );
            floorPlanProps.setFiles([fileToDropzoneFormat(floorFile)]);
          }
          if (property.images?.length) {
            const imageFiles = await Promise.all(
              property.images.map(async (imgUrl) => {
                const file = await urlToFile(
                  imgUrl,
                  imgUrl.split("/").pop() || "property.jpg",
                );
                return fileToDropzoneFormat(file);
              }),
            );
            propertyProps.setFiles(imageFiles);
          }
        } catch (error) {
          console.error("Failed to preload files:", error);
          toast.error("Failed to preload property images.");
        }
      };
      preloadFiles();
    }
  }, [type, property]);

  return {
    handleSubmit,
    isDisabled,
    isLoading,
    isDuplicatedExisit,
  };
}
