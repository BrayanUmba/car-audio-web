import { createClient } from "@/lib/supabase/server";
import { ProductoCard } from "@/components/tienda/producto-card";
import Link from "next/link";
import { Package } from "lucide-react";

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
    if (cat) query = query.eq("categoria_id", cat.id);
  }

  const { data: productos } = await query;
  const categoriaActual = categorias?.find((c) => c.slug === categoria);

  return (
    <div>
      {/* Header con gradiente */}
      <div className="relative overflow-hidden py-12 sm:py-16"
        style={{ background: "oklch(0.11 0.018 295 / 0.8)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.52 0.20 295 / 0.3), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.52 0.20 295 / 0.15), transparent)" }} />
          <div style={{ background: "radial-gradient(ellipse 60% 80% at 10% 50%, oklch(0.52 0.20 295 / 0.07) 0%, transparent 70%)" }}
            className="absolute inset-0" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <span>/</span>
            {categoriaActual ? (
              <>
                <Link href="/productos" className="hover:text-foreground transition-colors">Productos</Link>
                <span>/</span>
                <span className="text-foreground">{categoriaActual.nombre}</span>
              </>
            ) : (
              <span className="text-foreground">Productos</span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            {categoriaActual ? categoriaActual.nombre : "Todos los productos"}
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            <span className="font-semibold text-foreground">{productos?.length ?? 0}</span> productos disponibles
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Filtros */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/productos"
            className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              !categoria
                ? "text-white shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={!categoria ? {
              background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.60 0.18 295))",
              boxShadow: "0 4px 12px oklch(0.52 0.20 295 / 0.35)",
            } : {
              background: "oklch(0.52 0.20 295 / 0.08)",
              border: "1px solid oklch(0.52 0.20 295 / 0.15)",
            }}
          >
            Todos
          </Link>
          {categorias?.map((cat) => (
            <Link
              key={cat.id}
              href={`/productos?categoria=${cat.slug}`}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                categoria === cat.slug
                  ? "text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={categoria === cat.slug ? {
                background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.60 0.18 295))",
                boxShadow: "0 4px 12px oklch(0.52 0.20 295 / 0.35)",
              } : {
                background: "oklch(0.52 0.20 295 / 0.08)",
                border: "1px solid oklch(0.52 0.20 295 / 0.15)",
              }}
            >
              {cat.nombre}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {productos && productos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {productos.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl mb-6"
              style={{ background: "oklch(0.52 0.20 295 / 0.10)", border: "1px solid oklch(0.52 0.20 295 / 0.15)" }}>
              <Package className="h-9 w-9" style={{ color: "oklch(0.64 0.17 295)" }} />
            </div>
            <p className="text-xl font-semibold mb-2">Sin productos aquí aún</p>
            <p className="text-muted-foreground mb-6">No hay productos en esta categoría.</p>
            <Link href="/productos"
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, oklch(0.48 0.20 295), oklch(0.60 0.18 295))" }}>
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
