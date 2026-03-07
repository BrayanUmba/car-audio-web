"use client";

import { useCarrito } from "@/lib/carrito-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}

export default function CarritoPage() {
  const {
    items,
    eliminarProducto,
    actualizarCantidad,
    totalPrecio,
    totalItems,
  } = useCarrito();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">
          Agrega productos para comenzar.
        </p>
        <Link href="/productos" className={buttonVariants()}>
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Carrito ({totalItems} {totalItems === 1 ? "producto" : "productos"})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.producto.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-20 w-20 bg-muted rounded-md overflow-hidden shrink-0">
                  {item.producto.imagenes?.[0] ? (
                    <img
                      src={item.producto.imagenes[0]}
                      alt={item.producto.nombre}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      Sin img
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">
                    {item.producto.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatPrecio(
                      item.producto.precio_oferta ?? item.producto.precio
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() =>
                      actualizarCantidad(
                        item.producto.id,
                        item.cantidad - 1
                      )
                    }
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {item.cantidad}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() =>
                      actualizarCantidad(
                        item.producto.id,
                        item.cantidad + 1
                      )
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <p className="font-semibold w-28 text-right">
                  {formatPrecio(
                    (item.producto.precio_oferta ?? item.producto.precio) *
                      item.cantidad
                  )}
                </p>

                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => eliminarProducto(item.producto.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Resumen</h2>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrecio(totalPrecio)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Envío</span>
              <span className="text-sm text-muted-foreground">
                Por calcular
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrecio(totalPrecio)}</span>
            </div>
            <Link
              href="/checkout"
              className={buttonVariants({ className: "w-full", size: "lg" })}
            >
              Proceder al pago
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
