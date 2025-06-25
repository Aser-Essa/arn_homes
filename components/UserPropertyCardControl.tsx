import { deleteMyProperty, updateProperty } from "@/lib/actions/properties";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaPowerOff } from "react-icons/fa6";
import { IoTrash } from "react-icons/io5";
import DotsActionsButton from "./DotsActionsButton";
import FormActionButton from "./FormActionButton";

type UserPropertyCardControlType = {
  propertyId: string;
  status: string | undefined;
};

export default function UserPropertyCardControl({
  propertyId,
  status,
}: UserPropertyCardControlType) {
  const canDeactivate = status === "active";
  const canReactivate = status === "inactive";

  const updatedData = {
    status: canDeactivate ? "inactive" : "active",
  };

  return (
    <>
      <div className="absolute right-5 top-5 flex items-center gap-4">
        <Link
          href={`/account/edit_property/${propertyId}`}
          className={cn(
            "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white xl:flex",
          )}
        >
          <Image src={"/icons/edit.svg"} width={24} height={24} alt="edit" />
        </Link>
        {/* <div
          className={cn(
            "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white xl:flex",
          )}
        >
          <Image
            src={"/icons/insight.svg"}
            width={24}
            height={24}
            alt="insight"
          />
        </div> */}
        {(canReactivate || canDeactivate) && (
          <form action={updateProperty}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <input
              type="hidden"
              name="updatedData"
              value={JSON.stringify(updatedData)}
            />
            <FormActionButton type="icon">
              <div
                className={cn(
                  "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white xl:flex",
                )}
              >
                <FaPowerOff
                  className={cn(
                    "h-4 w-4",
                    canDeactivate ? "text-green-600" : "",
                    canReactivate ? "text-shades-black" : "",
                  )}
                />
              </div>
            </FormActionButton>
          </form>
        )}
        <form action={deleteMyProperty}>
          <input type="hidden" name="propertyId" value={propertyId} />
          <FormActionButton type="icon">
            <div
              className={cn(
                "hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white xl:flex",
              )}
            >
              <IoTrash className="h-5 w-5 text-red-500" />
            </div>
          </FormActionButton>
        </form>
        <DotsActionsButton propertyId={propertyId} />
      </div>
    </>
  );
}
