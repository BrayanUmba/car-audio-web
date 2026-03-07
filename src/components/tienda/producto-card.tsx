"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito-context";
import type { Producto } from "@/types";

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}

export function ProductoCard({ producto }: { producto: Producto }) {
  const { agregarProducto } = useCarrito();

  const descuento = producto.precio_oferta
    ? Math.round(((producto.precio - producto.precio_oferta) / producto.precio) * 100)
    : 0;

  return (
    <Card className="group relative overflow-hidden border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
      <Link href={`/productos/${producto.slug}`}>
        <div className="aspect-square relative bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden">
          {producto.imagenes?.[0] ? (
            <img
              src={producto.imagenes[0]}
              alt={producto.nombre}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Sin imagen
            </div>
          )}

          {descuento > 0 && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 border-0 text-white font-bold shadow-lg">
              -{descuento}%
            </Badge>
          )}

          {producto.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="secondary" className="text-sm">
                Agotado
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4 space-y-3">
        <Link href={`/productos/${producto.slug}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
            {producto.nombre}
          </h3>
        </Link>

        <div className="flex items-end justify-between">
          <div>
            {producto.precio_oferta ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gradient">
                  {formatPrecio(producto.precio_oferta)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrecio(producto.precio)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold">
                {formatPrecio(producto.precio)}
              </span>
            )}
          </div>

          {producto.stock > 0 && (
            <Button
              size="icon-sm"
              className="bg-gradient-to-r from-red-500 to-orange-500 border-0 text-white hover:from-red-600 hover:to-orange-600 shadow-md"
              onClick={(e) => {
                e.preventDefault();
                agregarProducto(producto);
              }}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
