import { usePropertyImageUpload } from "@/hooks/usePropertyImageUpload";
import { Property, PropertyFormData } from "@/types/types";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  DropzoneFloorPlanContext,
  DropzonePropertyContext,
} from "./CreateEditPropertyPageWrapper";
import UploadImages from "./UploadImages";
import { useDropzoneContext } from "./ui/Dropzone";
import { Button } from "./ui/button";

type AddPropertyImagesType = {
  propertyId: string;
  property: Property;
  handlePrevStep: () => void;
  form: UseFormReturn<PropertyFormData>;
  type: "create" | "edit";
};

export default function AddPropertyImages({
  propertyId,
  property,
  handlePrevStep,
  type,
}: AddPropertyImagesType) {
  const propertyProps = useDropzoneContext(DropzonePropertyContext);
  const floorPlanProps = useDropzoneContext(DropzoneFloorPlanContext);

  const { handleSubmit, isDisabled, isLoading } = usePropertyImageUpload({
    propertyProps,
    floorPlanProps,
    property,
    propertyId,
    type,
  });

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
        {/* {isDuplicatedExisit && (
          <p className="text-sm font-medium text-red-500">
            Please remove duplicate property images before submitting.
          </p>
        )} */}
      </div>
      <div className="flex items-center justify-between">
        <Button className="h-[44px] gap-0" onClick={handlePrevStep}>
          <IoIosArrowRoundBack className="min-h-7 min-w-7" />
          Back
        </Button>
        <Button
          className="h-[44px] gap-2"
          onClick={handleSubmit}
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
