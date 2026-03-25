import { supabase } from "@/src/lib/supabase";

export type Category = {
  id: string;
  slug: string;
  label: string;
  emoji: string;
  display_order: number;
  is_active: boolean;
};

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as Category[];
}
