import { supabase } from "@/src/lib/supabase";

export type Child = {
  id: string;
  user_id: string;
  family_id: string;
  name: string;
  status: "expecting" | "born";
  date_of_birth: string | null;
  expected_due_date: string | null;
  avatar_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type CreateChildInput = {
  user_id: string;
  family_id: string;
  name: string;
  status: "expecting" | "born";
  date_of_birth?: string | null;
  expected_due_date?: string | null;
  avatar_url?: string | null;
};

export async function getChildren(userId: string) {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .eq("user_id", userId)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as Child[];
}

export async function getChild(childId: string) {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .eq("id", childId)
    .single();

  if (error) throw error;
  return data as Child;
}

export async function createChild(input: CreateChildInput) {
  const { data, error } = await supabase
    .from("children")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as Child;
}

export async function updateChild(
  childId: string,
  updates: Partial<Omit<Child, "id" | "user_id" | "created_at" | "updated_at">>
) {
  const { data, error } = await supabase
    .from("children")
    .update(updates)
    .eq("id", childId)
    .select()
    .single();

  if (error) throw error;
  return data as Child;
}

export async function deleteChild(childId: string) {
  const { error } = await supabase
    .from("children")
    .delete()
    .eq("id", childId);

  if (error) throw error;
}
