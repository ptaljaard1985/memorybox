import { supabase } from "@/src/lib/supabase";

export type Person = {
  id: string;
  user_id: string;
  name: string;
  relationship: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type CreatePersonInput = {
  user_id: string;
  name: string;
  relationship?: string | null;
  avatar_url?: string | null;
};

export async function getPeople(userId: string) {
  const { data, error } = await supabase
    .from("people")
    .select("*")
    .eq("user_id", userId)
    .order("name", { ascending: true });

  if (error) throw error;
  return data as Person[];
}

export async function createPerson(input: CreatePersonInput) {
  const { data, error } = await supabase
    .from("people")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as Person;
}

export async function updatePerson(
  personId: string,
  updates: Partial<Omit<Person, "id" | "user_id" | "created_at">>
) {
  const { data, error } = await supabase
    .from("people")
    .update(updates)
    .eq("id", personId)
    .select()
    .single();

  if (error) throw error;
  return data as Person;
}

export async function deletePerson(personId: string) {
  const { error } = await supabase.from("people").delete().eq("id", personId);

  if (error) throw error;
}
