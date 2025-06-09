import { updateProperty } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import UploadImages from "./UploadImages";
import { useDropzoneContext } from "./ui/Dropzone";
import { Button } from "./ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "@/types/types";
import { Loader2 } from "lucide-react";
import {
  DropzoneFloorPlanContext,
  DropzonePropertyContext,
} from "./AddPropertyPageWrapper";

type AddPropertyImagesType = {
  propertyId: string;
  handlePrevStep: () => void;
  form: UseFormReturn<PropertyFormData>;
};

export default function AddPropertyImages({
  propertyId,
  handlePrevStep,
}: AddPropertyImagesType) {
  const propertyProps = useDropzoneContext(DropzonePropertyContext);
  const floorPlanProps = useDropzoneContext(DropzoneFloorPlanContext);

  const { user } = useUser();
  const router = useRouter();
  const isLoading = propertyProps?.loading || floorPlanProps?.loading;

  function isDuplicatedImage() {
    const propertyFiles = propertyProps?.files.map((file) => file.name);
    const floorPlanFile = floorPlanProps?.files?.at(0)?.name || " ";
    const isDuplicated = propertyFiles.includes(floorPlanFile);
    return isDuplicated;
  }
  const isDuplicatedExisit = isDuplicatedImage();

  function extractImages() {
    const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/properties-images/${user?.id}/${propertyId}`;
    const images = propertyProps?.files?.map(
      (file) => `${BASE_URL}/${file?.name}`,
    );
    const floorFile = floorPlanProps?.files?.at(0);
    const floor_plan = floorFile ? `${BASE_URL}/${floorFile?.name}` : "";
    return { images, floor_plan };
  }

  function isFileLengthValid(props: typeof propertyProps) {
    const length = props.files?.length;
    return length >= props.minFiles && length <= props.maxFiles;
  }

  async function handleClick() {
    if (!isFileLengthValid(propertyProps)) {
      toast.error("Please upload the correct number of property images.");
      return;
    }
    if (isDuplicatedExisit) {
      toast.error("Please remove duplicate property images before submitting.");
      return;
    }
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
      await updateProperty({ propertyId, updatedData: ImagesData });
      toast.success("Property images uploaded and submitted for review!");
      router.push("/account");
    } catch (error) {
      toast.error("Something went wrong while uploading. Please try again.");
      console.error(error);
    }
  }

  const isDisabled =
    isLoading || isDuplicatedImage() || !isFileLengthValid(propertyProps);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="space-y-6">
          <UploadImages
            DropzoneContext={DropzonePropertyContext}
            title={"Images"}
          />
          <UploadImages
            DropzoneContext={DropzoneFloorPlanContext}
            title={"Floor Image"}
          />
        </div>
        {isDuplicatedExisit && (
          <p className="font-font-medium text-sm text-red-500">
            Please remove duplicate property images before submitting.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Button className="h-[44px] gap-0" onClick={handlePrevStep}>
          <IoIosArrowRoundBack className="min-h-7 min-w-7" />
          Back
        </Button>
        <Button
          className="h-[44px] gap-2"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <p>Loading</p>
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <>
              <FaCircleCheck />
              <p>Complete</p>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
