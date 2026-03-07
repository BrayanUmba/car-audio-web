import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Producto } from "@/types";

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}

export function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <Link href={`/productos/${producto.slug}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
        <div className="aspect-square relative bg-muted">
          {producto.imagenes?.[0] ? (
            <img
              src={producto.imagenes[0]}
              alt={producto.nombre}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Sin imagen
            </div>
          )}
          {producto.precio_oferta && (
            <Badge className="absolute top-2 right-2" variant="destructive">
              Oferta
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2">{producto.nombre}</h3>
          <div className="mt-2 flex items-center gap-2">
            {producto.precio_oferta ? (
              <>
                <span className="text-lg font-bold">
                  {formatPrecio(producto.precio_oferta)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrecio(producto.precio)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {formatPrecio(producto.precio)}
              </span>
            )}
          </div>
          {producto.stock === 0 && (
            <p className="mt-1 text-sm text-destructive">Agotado</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
