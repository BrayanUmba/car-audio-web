"use client";

import { useCarrito } from "@/lib/carrito-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Explora nuestro catálogo y encuentra el sonido perfecto para tu
          vehículo.
        </p>
        <Link
          href="/productos"
          className={`${buttonVariants({ size: "lg" })} bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-0 text-white px-8 h-12 font-semibold shadow-lg shadow-blue-600/25`}
        >
          Ver productos
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold mb-2">Mi carrito</h1>
      <p className="text-muted-foreground mb-8">
        {totalItems} {totalItems === 1 ? "producto" : "productos"}
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <Card
              key={item.producto.id}
              className="border-white/5 bg-white/[0.03]"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden shrink-0">
                  {item.producto.imagenes?.[0] ? (
                    <Image
                      src={item.producto.imagenes[0]}
                      alt={item.producto.nombre}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      Sin img
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/productos/${item.producto.slug}`}
                    className="font-semibold truncate block hover:text-primary transition-colors"
                  >
                    {item.producto.nombre}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatPrecio(
                      item.producto.precio_oferta ?? item.producto.precio
                    )}{" "}
                    c/u
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white/5 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() =>
                      actualizarCantidad(
                        item.producto.id,
                        item.cantidad - 1
                      )
                    }
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-bold">
                    {item.cantidad}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-xs"
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

                <p className="font-bold w-28 text-right text-gradient">
                  {formatPrecio(
                    (item.producto.precio_oferta ?? item.producto.precio) *
                      item.cantidad
                  )}
                </p>

                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-red-400"
                  onClick={() => eliminarProducto(item.producto.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit border-white/5 bg-white/[0.03] sticky top-24">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Resumen del pedido</h2>
            <Separator className="bg-white/5" />
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrecio(totalPrecio)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-green-400 font-medium">
                  {totalPrecio >= 200000 ? "Gratis" : "Por calcular"}
                </span>
              </div>
            </div>
            <Separator className="bg-white/5" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-gradient">{formatPrecio(totalPrecio)}</span>
            </div>
            <Link
              href="/checkout"
              className={`${buttonVariants({ size: "lg" })} w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-0 text-white font-semibold shadow-lg shadow-blue-600/25`}
            >
              Proceder al pago
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="text-xs text-center text-muted-foreground">
              Envío gratis en compras mayores a $200.000
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
