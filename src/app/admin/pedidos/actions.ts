"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function actualizarEstadoPedido(id: string, estado: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("pedidos")
    .update({ estado })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/pedidos");
  return { success: true };
}
