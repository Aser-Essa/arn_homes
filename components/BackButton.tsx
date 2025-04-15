"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function BackButton() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <>
      <button
        className="!mt-10 flex h-12 w-fit cursor-pointer items-center justify-center rounded-xl border-l-[5px] border-amber-600 bg-gray-900 pl-[17px] pr-[22px] font-exo text-xl text-shades-white transition-all hover:text-scooter-600"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <IoIosArrowBack className="h-6 w-6" />
          <p>Back to search results</p>
        </div>
      </button>
    </>
  );
}
