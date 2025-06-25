"use client";
import toast from "react-hot-toast";

type CopyLinkButtonType = {
  className: string;
  children: React.ReactNode;
};

export default function CopyLinkButton({
  className,
  children,
}: CopyLinkButtonType) {
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
      <button className={className} onClick={copyToClipboard}>
        {children}
      </button>
    </>
  );
}
