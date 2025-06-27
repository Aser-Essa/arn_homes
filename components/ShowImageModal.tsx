import Image from "next/image";
import { MdOutlineZoomOutMap } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function ShowImageModal({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="hidden sm:block">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-shades-white">
            <MdOutlineZoomOutMap className="!h-6 !w-6" />
          </div>
        </DialogTrigger>
        <DialogContent className="aspect-video w-[calc(100vw-60px)] !max-w-full overflow-y-scroll lg:w-[80vw]">
          <DialogHeader className="hidden w-full" hidden>
            <DialogTitle className="capitalize" hidden></DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          <div className="relative top-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] overflow-hidden rounded">
            <Image
              src={imageUrl || "/"}
              fill
              alt="Property Image"
              className="bottom-0"
            />
            ;
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
