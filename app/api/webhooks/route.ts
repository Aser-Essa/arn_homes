import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server"; // Import NextRequest
import type { UserJSON } from "@clerk/backend"; // Import UserJSON type explicitly
import { createUser } from "@/lib/actions/users";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    console.log(eventType);

    if (eventType === "user.created") {
      const user = evt.data as UserJSON;

      const { id, first_name, last_name, email_addresses, image_url } = user;

      const userData = {
        id,
        full_name: `${first_name} ${last_name}`.trim(),
        email: email_addresses?.[0]?.email_address || null,
        avatar: image_url,
      };

      await createUser(userData);
    }

    if (eventType === "user.deleted") {
      const user = evt.data;

      const { id: userId } = user;

      const { error } = await supabase.from("users").delete().eq("id", userId);

      if (error) {
        throw new Error(error?.message);
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
