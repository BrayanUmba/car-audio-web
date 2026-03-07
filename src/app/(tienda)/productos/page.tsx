import { createClient } from "@/lib/supabase/server";
import { ProductoCard } from "@/components/tienda/producto-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Productos</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/productos">
          <Button variant={!categoria ? "default" : "outline"} size="sm">
            Todos
          </Button>
        </Link>
        {categorias?.map((cat) => (
          <Link key={cat.id} href={`/productos?categoria=${cat.slug}`}>
            <Button
              variant={categoria === cat.slug ? "default" : "outline"}
              size="sm"
            >
              {cat.nombre}
            </Button>
          </Link>
        ))}
      </div>

      {productos && productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          No hay productos disponibles.
        </p>
      )}
    </div>
  );
}
