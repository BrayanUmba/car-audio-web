import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProductoForm } from "@/components/admin/producto-form";
import { actualizarProducto } from "../../actions";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: producto }, { data: categorias }] = await Promise.all([
    supabase.from("productos").select("*").eq("id", id).single(),
    supabase
      .from("categorias")
      .select("id, nombre")
      .eq("activo", true)
      .order("orden"),
  ]);

  if (!producto) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    return actualizarProducto(id, formData);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Editar producto</h1>
      <ProductoForm
        producto={producto}
        categorias={categorias ?? []}
        action={handleUpdate}
      />
    </div>
  );
}
