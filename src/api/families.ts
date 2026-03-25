import { supabase } from "@/src/lib/supabase";

export type Family = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

export async function getFamily(userId: string) {
  const { data, error } = await supabase
    .from("families")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data as Family;
}

export async function createFamily(userId: string, name: string) {
  const { data, error } = await supabase
    .from("families")
    .insert({ user_id: userId, name })
    .select()
    .single();

  if (error) throw error;
  return data as Family;
}

export async function updateFamily(familyId: string, name: string) {
  const { data, error } = await supabase
    .from("families")
    .update({ name })
    .eq("id", familyId)
    .select()
    .single();

  if (error) throw error;
  return data as Family;
}
