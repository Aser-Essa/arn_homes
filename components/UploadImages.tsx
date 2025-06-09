import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/Dropzone";
import { UseSupabaseUploadReturn } from "@/hooks/use-supabase-upload";
import { cn } from "@/lib/utils";

type DropzoneContextType = React.Context<UseSupabaseUploadReturn | undefined>;

type UploadImagesType = {
  title: string;
  className?: string;
  DropzoneContext: DropzoneContextType;
};

export default function UploadImages({
  DropzoneContext,
  title,
  className,
}: UploadImagesType) {
  return (
    <>
      <div className={cn("space-y-2 md:col-span-2", className)}>
        <p className="text-base font-medium capitalize">{title}</p>
        <div className="w-full">
          <Dropzone DropzoneContext={DropzoneContext}>
            <DropzoneEmptyState DropzoneContext={DropzoneContext} />
            <DropzoneContent DropzoneContext={DropzoneContext} />
          </Dropzone>
        </div>
      </div>
    </>
  );
}
