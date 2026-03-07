import { createClient } from "@/lib/supabase/server";
import { ProductoCard } from "@/components/tienda/producto-card";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const supabase = await createClient();

  const { data: categorias } = await supabase
    .from("categorias")
    .select("*")
    .eq("activo", true)
    .order("orden");

  let query = supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("created_at", { ascending: false });

  if (categoria) {
    const cat = categorias?.find((c) => c.slug === categoria);
    if (cat) {
      query = query.eq("categoria_id", cat.id);
    }
  }

  const { data: productos } = await query;

  const categoriaActual = categorias?.find((c) => c.slug === categoria);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {categoriaActual ? categoriaActual.nombre : "Todos los productos"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {productos?.length ?? 0} productos disponibles
        </p>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
        <Link
          href="/productos"
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !categoria
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
              : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
          }`}
        >
          Todos
        </Link>
        {categorias?.map((cat) => (
          <Link
            key={cat.id}
            href={`/productos?categoria=${cat.slug}`}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              categoria === cat.slug
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            }`}
          >
            {cat.nombre}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {productos && productos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            No hay productos en esta categoría.
          </p>
          <Link
            href="/productos"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  );
}
