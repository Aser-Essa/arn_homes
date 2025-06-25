"use client";
import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import { useRouter } from "next/navigation";

const statuses = [
  { label: "Active", value: "active" },
  { label: "Reviewing", value: "reviewing" },
  { label: "Declined", value: "declined" },
  { label: "Inactive", value: "inactive" },
];

export default function StatusesSelector({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const [status, setStatus] = useState(defaultValue);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    params?.set("status", status);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, status]);

  return (
    <div className="block sm:hidden">
      <CustomSelect
        placeholder="Statuses"
        selectItems={statuses}
        onValueChange={(value) => setStatus(value)}
        defaultValue={defaultValue}
        className="h-[30px] rounded text-sm font-medium"
      />
    </div>
  );
}
