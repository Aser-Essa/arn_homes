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
          <DialogHeader className="w-full">
            <DialogTitle className="capitalize" hidden></DialogTitle>
            <DialogDescription hidden>
              Add detailed information to enhance your property listing. Click
              save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="relative h-full w-full">
            <Image src={imageUrl || "/"} fill alt="Property Image" />;
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
