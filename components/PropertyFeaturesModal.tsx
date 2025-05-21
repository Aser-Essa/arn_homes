"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import FeatureSectionsForm from "./FeatureSectionsForm";

type PropertyFeaturesModalType = {
  type: string;
};

export function PropertyFeaturesModal({ type }: PropertyFeaturesModalType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-[44px] w-full rounded-lg border-amber-100 bg-amber-50 !text-base capitalize !shadow-none transition-all hover:bg-amber-100"
        >
          Add {type}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-100px)] overflow-y-scroll">
        <DialogHeader className="w-full">
          <DialogTitle className="capitalize">Add {type}</DialogTitle>
          <DialogDescription>
            Add detailed information to enhance your property listing. Click
            save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <FeatureSectionsForm name={type} />

        <DialogFooter>
          <DialogClose className="w-full" asChild>
            <Button type="button" className="h-[40px] w-full rounded-lg">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
