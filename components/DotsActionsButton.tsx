"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import FormActionButton from "./FormActionButton";
import { deleteMyProperty } from "@/lib/actions/properties";
import Image from "next/image";
import { IoTrash } from "react-icons/io5";

export default function DotsActionsButton({
  propertyId,
}: {
  propertyId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClickDots(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  function handleClickOutside(e: MouseEvent) {
    if (isOpen && !(e.target as HTMLElement).closest(".toggleButton")) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <>
      <div
        className={cn(
          "toggleButton hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-shades-off-white sm:flex xl:hidden",
        )}
        onClick={handleClickDots}
      >
        <HiOutlineDotsVertical className="h-5 w-5" />
      </div>
      {isOpen && (
        <>
          <div className="box-shadow absolute right-10 top-0 z-10 mt-2 w-32 rounded-md bg-white">
            <ul className="py-1">
              <li>
                <Link
                  href={`/account/edit_property/${propertyId}`}
                  className="flex items-center gap-1 border-b border-gray-100 p-2 !text-base font-medium hover:bg-gray-100"
                >
                  <Image
                    src={"/icons/edit.svg"}
                    width={20}
                    height={20}
                    alt="edit"
                  />
                  <p className="leading-none">Edit</p>
                </Link>
              </li>
              <li>
                <form action={deleteMyProperty}>
                  <input type="hidden" name="propertyId" value={propertyId} />
                  <FormActionButton
                    icon={<IoTrash className="h-5 w-5 !text-red-500" />}
                    className="h-[36px] w-full justify-start !rounded-none border-none p-2 text-start !text-base leading-none !shadow-none hover:bg-gray-100"
                  >
                    Delete
                  </FormActionButton>
                </form>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
