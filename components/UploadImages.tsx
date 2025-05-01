import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/Dropzone";

type UploadImagesType = {
  contextType: "property" | "floorPlan";
  title: string;
};

export default function UploadImages({ contextType, title }: UploadImagesType) {
  return (
    <>
      <div className="space-y-2 md:col-span-2">
        <p className="text-base font-medium capitalize">{title}</p>
        <div className="w-full">
          <Dropzone contextType={contextType}>
            <DropzoneEmptyState contextType={contextType} />
            <DropzoneContent contextType={contextType} />
          </Dropzone>
        </div>
      </div>
    </>
  );
}
