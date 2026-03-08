import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AgregarCarritoBtn } from "@/components/tienda/agregar-carrito-btn";
import { Truck, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: producto } = await supabase
    .from("productos")
    .select("*, categorias(nombre, slug)")
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (!producto) notFound();

  const descuento = producto.precio_oferta
    ? Math.round(
        ((producto.precio - producto.precio_oferta) / producto.precio) * 100
      )
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <Link
        href="/productos"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Imagen */}
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden relative">
          {producto.imagenes?.[0] ? (
            <img
              src={producto.imagenes[0]}
              alt={producto.nombre}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Sin imagen
            </div>
          )}
          {descuento > 0 && (
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white font-bold text-sm px-3 py-1 shadow-lg">
              -{descuento}% OFF
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          {producto.categorias && (
            <Link href={`/productos?categoria=${producto.categorias.slug}`}>
              <Badge
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 transition-colors"
              >
                {producto.categorias.nombre}
              </Badge>
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {producto.nombre}
          </h1>

          <div className="flex items-end gap-4">
            {producto.precio_oferta ? (
              <>
                <span className="text-4xl font-black text-gradient">
                  {formatPrecio(producto.precio_oferta)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrecio(producto.precio)}
                </span>
              </>
            ) : (
              <span className="text-4xl font-black">
                {formatPrecio(producto.precio)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                producto.stock > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-muted-foreground">
              {producto.stock > 0
                ? `${producto.stock} unidades disponibles`
                : "Agotado"}
            </span>
          </div>

          <Separator className="bg-white/5" />

          <p className="text-muted-foreground leading-relaxed text-base">
            {producto.descripcion || "Sin descripción."}
          </p>

          <AgregarCarritoBtn
            producto={producto}
            disabled={producto.stock === 0}
          />

          {/* Beneficios */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
              <Truck className="h-5 w-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-sm font-medium">Envío rápido</p>
                <p className="text-xs text-muted-foreground">2-5 días hábiles</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
              <Shield className="h-5 w-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-sm font-medium">Garantía</p>
                <p className="text-xs text-muted-foreground">1 año de garantía</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
