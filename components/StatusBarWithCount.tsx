"use client";
import { params } from "@/types/types";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

type StatusBarWithCountType = {
  params: params;
};

export default function StatusBarWithCount({ params }: StatusBarWithCountType) {
  const router = useRouter();

  const { status } = params;
  const statusParam = `${status?.at(0)?.toUpperCase()}${status?.slice(1)}`;

  function handleClickBack() {
    router.push("/account");
  }

  return (
    <>
      <div className="hidden items-center justify-between text-lg font-semibold sm:flex">
        <div
          className="flex cursor-pointer items-center gap-1 transition-all hover:text-scooter-700"
          onClick={handleClickBack}
        >
          <IoIosArrowBack className="h-5 w-5" />
          <p>{status ? statusParam : "Active"}</p>
        </div>
        <p className="text-scooter-700">3 Properties</p>
      </div>
    </>
  );
}
