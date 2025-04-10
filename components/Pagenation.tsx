"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

type PagenationType = {
  count: number | null;
};

export default function Pagenation({ count }: PagenationType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const maxNumberOfPages = Math.ceil(Number(count) / 9);

  const initialPage =
    Math.min(Number(searchParams.get("page")), maxNumberOfPages) || 1;

  const [page, setPage] = useState(initialPage);

  function handleClickBack() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleClickForward() {
    setPage((prev) => Math.min(prev + 1, maxNumberOfPages));
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  }, [page, router]);

  return (
    <>
      {Number(count) >= 9 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            disabled={page <= 1}
            className="h-12 w-12 rounded-xl border-[1.5px] border-amber-600 bg-shades-white hover:bg-amber-50 sm:h-14 sm:w-14"
            onClick={handleClickBack}
          >
            <IoIosArrowBack className="h-6 w-6" />
          </Button>
          <Button
            disabled={page >= maxNumberOfPages}
            className="h-12 w-12 rounded-xl border-[1.5px] border-amber-600 bg-shades-white hover:bg-amber-50 sm:h-14 sm:w-14"
            onClick={handleClickForward}
          >
            <IoIosArrowForward className="h-6 w-6" />
          </Button>
        </div>
      )}
    </>
  );
}
