import { z } from "zod";

export const changeEmailSchema = z
  .object({
    current_email: z.string().email("Invalid current email"),
    new_email: z.string().email("Invalid new email"),
    confirm_new_email: z.string().email("Invalid confirmation email"),
  })
  .refine((data) => data.new_email === data.confirm_new_email, {
    path: ["confirm_new_email"],
    message: "Emails do not match",
  })
  .refine((data) => data.current_email !== data.new_email, {
    path: ["new_email"],
    message: "New email must be different from current email",
  });
