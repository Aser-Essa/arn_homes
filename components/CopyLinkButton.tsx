"use client";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function CopyLinkButton() {
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <>
      <button
        className="flex h-10 items-center justify-center gap-2 rounded-full bg-shades-white px-4 py-[7px] font-medium"
        onClick={copyToClipboard}
      >
        <Image src={"/icons/chain.svg"} width={24} height={24} alt="chain" />
        <p>Copy link</p>
      </button>
    </>
  );
}
