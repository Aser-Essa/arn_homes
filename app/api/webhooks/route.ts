import { createUser } from "@/lib/data-service";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server"; // Import NextRequest
import type { UserJSON } from "@clerk/backend"; // Import UserJSON type explicitly

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    if (eventType === "user.created") {
      const user = evt.data as UserJSON; // 👈 safely cast to UserJSON

      const { id, first_name, last_name, email_addresses, image_url } = user;

      const userData = {
        id,
        full_name: `${first_name} ${last_name}`.trim(),
        email: email_addresses?.[0]?.email_address || null,
        avatar: image_url,
      };

      createUser(userData);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
