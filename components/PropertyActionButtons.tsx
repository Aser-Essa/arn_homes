import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

export default function PropertyActionButtons() {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <Button variant={"outline"} className="h-[50px] w-full">
          <Image src={"/icons/call.svg"} width={24} height={24} alt="call" />
          Call
        </Button>
        <Button className="h-[50px] w-full">
          <Image
            src={"/icons/Direct messages.svg"}
            width={24}
            height={24}
            alt="Direct messages"
          />
          <p>Message</p>
        </Button>
      </div>
    </>
  );
}
