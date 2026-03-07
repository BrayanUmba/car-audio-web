import { createClient } from "./server";

export async function obtenerUsuario() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function obtenerPerfil() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return perfil;
}

export async function esAdmin() {
  const perfil = await obtenerPerfil();
  return perfil?.rol === "admin";
}
