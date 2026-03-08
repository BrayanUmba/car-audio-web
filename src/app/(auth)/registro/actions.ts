"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function registro(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        nombre: formData.get("nombre") as string,
      },
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      return { error: "Este correo ya está registrado. Intenta iniciar sesión." };
    }
    return { error: error.message };
  }

  // Si no hay sesión, Supabase requiere confirmación de email
  if (!data.session) {
    return { info: "Cuenta creada. Revisa tu correo para confirmar tu cuenta antes de iniciar sesión." };
  }

  revalidatePath("/", "layout");
  return { redirect: "/" };
}
