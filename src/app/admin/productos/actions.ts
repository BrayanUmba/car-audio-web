"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function crearProducto(formData: FormData) {
  const supabase = await createClient();

  const nombre = formData.get("nombre") as string;
  const slug = nombre
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { error } = await supabase.from("productos").insert({
    nombre,
    slug,
    descripcion: formData.get("descripcion") as string,
    precio: Number(formData.get("precio")),
    precio_oferta: formData.get("precio_oferta")
      ? Number(formData.get("precio_oferta"))
      : null,
    categoria_id: (formData.get("categoria_id") as string) || null,
    stock: Number(formData.get("stock") || 0),
    destacado: formData.get("destacado") === "on",
    activo: true,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/productos");
  return { success: true };
}

export async function actualizarProducto(id: string, formData: FormData) {
  const supabase = await createClient();

  const nombre = formData.get("nombre") as string;
  const slug = nombre
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { error } = await supabase
    .from("productos")
    .update({
      nombre,
      slug,
      descripcion: formData.get("descripcion") as string,
      precio: Number(formData.get("precio")),
      precio_oferta: formData.get("precio_oferta")
        ? Number(formData.get("precio_oferta"))
        : null,
      categoria_id: (formData.get("categoria_id") as string) || null,
      stock: Number(formData.get("stock") || 0),
      destacado: formData.get("destacado") === "on",
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/productos");
  return { success: true };
}

export async function eliminarProducto(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("productos")
    .update({ activo: false })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/productos");
  return { success: true };
}
