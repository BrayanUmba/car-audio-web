import { createClient } from "@/lib/supabase/server";
import { ProductoForm } from "@/components/admin/producto-form";
import { crearProducto } from "../actions";

export default async function NuevoProductoPage() {
  const supabase = await createClient();
  const { data: categorias } = await supabase
    .from("categorias")
    .select("id, nombre")
    .eq("activo", true)
    .order("orden");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Nuevo producto</h1>
      <ProductoForm
        categorias={categorias ?? []}
        action={crearProducto}
      />
    </div>
  );
}
