import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import toast from "react-hot-toast";
import { getProperty } from "@/lib/queries/properties";
import { createChat } from "@/lib/actions/chats";

type PropertyActionButtonsType = { property_id: string };

export default async function PropertyActionButtons({
  property_id,
}: PropertyActionButtonsType) {
  const { userId } = await auth();
  const { property } = await getProperty(property_id);

  async function handleClick() {
    "use server";
    if (!userId) {
      redirect("/sign-in");
    }
    const data = await createChat({
      senderId: userId,
      receiverId: property?.user_id,
      propertyId: property_id,
    });
    if (!data) {
      toast.error("Chat creation failed");
      return;
    }
    const { chat } = data;

    redirect(`/account/messages/chats/${chat?.id}`);
  }

  return (
    <>
      <div className="flex items-center gap-2.5">
        <Button variant={"outline"} className="h-[50px] w-full">
          <Image src={"/icons/call.svg"} width={24} height={24} alt="call" />
          Call
        </Button>
        <form action={handleClick} className="w-full">
          <Button className="h-[50px] w-full">
            <Image
              src={"/icons/Direct messages.svg"}
              width={24}
              height={24}
              alt="Direct messages"
            />
            <p>Message</p>
          </Button>
        </form>
      </div>
    </>
  );
}
