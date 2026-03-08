"use client";

import { useCarrito } from "@/lib/carrito-context";
import { crearPedidoAction } from "./actions";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}

const estadoInicial: { error?: string; redirectUrl?: string } = {};

export default function CheckoutPage() {
  const { items, totalPrecio } = useCarrito();
  const [state, action, isPending] = useActionState(crearPedidoAction, estadoInicial);

  const envio = totalPrecio >= 200000 ? 0 : 15000;
  const total = totalPrecio + envio;

  // Redirigir a Wompi cuando la action retorna la URL
  useEffect(() => {
    if ("redirectUrl" in state && state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">
          Agrega productos antes de continuar al pago.
        </p>
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl font-bold mb-2">Finalizar compra</h1>
      <p className="text-muted-foreground mb-8">
        Completa tus datos para proceder al pago seguro con Wompi.
      </p>

      <form action={action}>
        {/* Items del carrito serializados para la server action */}
        <input
          type="hidden"
          name="items"
          value={JSON.stringify(
            items.map((i) => ({
              producto_id: i.producto.id,
              cantidad: i.cantidad,
            }))
          )}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Formulario de datos ── */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-white/5 bg-white/[0.03]">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Datos de envío</h2>
                <Separator className="bg-white/5" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      placeholder="Tu nombre"
                      required
                      className="bg-white/5 border-white/10 focus:border-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="300 000 0000"
                      required
                      className="bg-white/5 border-white/10 focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección de entrega *</Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    placeholder="Calle 123 # 45-67, Barrio"
                    required
                    className="bg-white/5 border-white/10 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Input
                    id="ciudad"
                    name="ciudad"
                    placeholder="Bogotá"
                    required
                    className="bg-white/5 border-white/10 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notas">Notas adicionales</Label>
                  <Textarea
                    id="notas"
                    name="notas"
                    placeholder="Instrucciones especiales para la entrega..."
                    rows={3}
                    className="bg-white/5 border-white/10 focus:border-red-500 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Error de la action */}
            {state.error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {state.error}
              </div>
            )}
          </div>

          {/* ── Resumen del pedido ── */}
          <div className="space-y-4">
            <Card className="border-white/5 bg-white/[0.03] sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Resumen</h2>
                <Separator className="bg-white/5" />

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.producto.id} className="flex gap-3 items-center">
                      {item.producto.imagenes[0] && (
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
                          <Image
                            src={item.producto.imagenes[0]}
                            alt={item.producto.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.producto.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          x{item.cantidad}
                        </p>
                      </div>
                      <p className="text-sm font-bold flex-shrink-0">
                        {formatPrecio(
                          (item.producto.precio_oferta ?? item.producto.precio) *
                            item.cantidad
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-white/5" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrecio(totalPrecio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className={envio === 0 ? "text-green-400" : ""}>
                      {envio === 0 ? "Gratis" : formatPrecio(envio)}
                    </span>
                  </div>
                </div>

                <Separator className="bg-white/5" />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gradient">{formatPrecio(total)}</span>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-0 text-white font-semibold shadow-lg shadow-red-500/25"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Pagar con Wompi
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Pago 100% seguro procesado por Wompi · Bancolombia
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
