import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AgregarCarritoBtn } from "@/components/tienda/agregar-carrito-btn";

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
    .select("*, categorias(nombre)")
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (!producto) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
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
        </div>

        <div className="space-y-4">
          {producto.categorias && (
            <Badge variant="secondary">{producto.categorias.nombre}</Badge>
          )}
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>

          <div className="flex items-center gap-3">
            {producto.precio_oferta ? (
              <>
                <span className="text-3xl font-bold">
                  {formatPrecio(producto.precio_oferta)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrecio(producto.precio)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">
                {formatPrecio(producto.precio)}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {producto.stock > 0
              ? `${producto.stock} disponibles`
              : "Agotado"}
          </p>

          <Separator />

          <p className="text-muted-foreground leading-relaxed">
            {producto.descripcion || "Sin descripción."}
          </p>

          <AgregarCarritoBtn
            producto={producto}
            disabled={producto.stock === 0}
          />
        </div>
      </div>
    </div>
  );
}
