import { supabase } from "../supabase";

export async function getUser(userId: string) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error?.message);

  return { user };
}
